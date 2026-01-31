import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { AdminData } from '../types/admin';
import { defaultAdminData } from '../types/admin';

const STORAGE_KEY = 'admin_data';

// Get data from localStorage (fallback)
function getFromStorage(): AdminData {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return { ...defaultAdminData, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.error('Error reading localStorage:', e);
    }
    return defaultAdminData;
}

// Fetch data from Supabase
async function fetchFromSupabase(): Promise<AdminData | null> {
    try {
        const { data, error } = await supabase
            .from('admin_data')
            .select('data')
            .eq('key', 'main')
            .maybeSingle();

        if (error) {
            console.log('Supabase fetch error:', error.message);
            return null;
        }

        if (data?.data) {
            return { ...defaultAdminData, ...data.data };
        }
    } catch (error) {
        console.log('Supabase not available, using localStorage');
    }
    return null;
}

// Save data to Supabase
async function saveToSupabase(adminData: AdminData): Promise<boolean> {
    try {
        console.log('Saving to Supabase...');

        // Check if data exists
        const { data: existing, error: selectError } = await supabase
            .from('admin_data')
            .select('key')
            .eq('key', 'main')
            .maybeSingle();

        if (selectError) {
            console.error('Select error:', selectError);
        }

        if (existing) {
            console.log('Updating existing record...');
            const { error } = await supabase
                .from('admin_data')
                .update({ data: adminData, updated_at: new Date().toISOString() })
                .eq('key', 'main');

            if (error) {
                console.error('Update error:', error);
                throw error;
            }
            console.log('Update successful!');
        } else {
            console.log('Inserting new record...');
            const { error } = await supabase
                .from('admin_data')
                .insert({ key: 'main', data: adminData, updated_at: new Date().toISOString() });

            if (error) {
                console.error('Insert error:', error);
                throw error;
            }
            console.log('Insert successful!');
        }

        return true;
    } catch (error) {
        console.error('Supabase save error:', error);
        return false;
    }
}

// Hook to read admin data
export function useAdminData<K extends keyof AdminData>(key: K): AdminData[K] {
    const [data, setData] = useState<AdminData[K]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Partial<AdminData>;
                return parsed[key] ?? defaultAdminData[key];
            }
        } catch (e) {
            console.error('Error reading admin data:', e);
        }
        return defaultAdminData[key];
    });

    useEffect(() => {
        // Try to fetch from Supabase on mount
        fetchFromSupabase().then(supabaseData => {
            if (supabaseData) {
                setData(supabaseData[key]);
                // Also update localStorage for offline access
                localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseData));
            }
        });

        const handleStorageChange = () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored) as Partial<AdminData>;
                    setData(parsed[key] ?? defaultAdminData[key]);
                }
            } catch (e) {
                console.error('Error reading admin data:', e);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('adminDataUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('adminDataUpdated', handleStorageChange);
        };
    }, [key]);

    return data;
}

// Hook to get all admin data
export function useAllAdminData(): AdminData {
    const [data, setData] = useState<AdminData>(getFromStorage);

    useEffect(() => {
        // Try to fetch from Supabase on mount
        fetchFromSupabase().then(supabaseData => {
            if (supabaseData) {
                setData(supabaseData);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseData));
            }
        });

        const handleStorageChange = () => {
            setData(getFromStorage());
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('adminDataUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('adminDataUpdated', handleStorageChange);
        };
    }, []);

    return data;
}

// Hook for admin dashboard to manage data
export function useAdminDataManager() {
    const [data, setData] = useState<AdminData>(getFromStorage);
    const [saveMessage, setSaveMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        async function init() {
            const supabaseData = await fetchFromSupabase();
            if (supabaseData) {
                setData(supabaseData);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseData));
            }
            setIsLoading(false);
        }
        init();
    }, []);

    const updateData = useCallback(<K extends keyof AdminData>(key: K, value: AdminData[K]) => {
        setData(prev => ({ ...prev, [key]: value }));
    }, []);

    const saveData = useCallback(async () => {
        try {
            // Always save to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            window.dispatchEvent(new Event('adminDataUpdated'));

            // Save to Supabase
            const saved = await saveToSupabase(data);
            if (saved) {
                setSaveMessage('✓ Saved to database');
            } else {
                setSaveMessage('⚠ Saved locally only');
            }

            setTimeout(() => setSaveMessage(''), 3000);
        } catch (e) {
            console.error('Error saving admin data:', e);
            setSaveMessage('✗ Error saving changes');
        }
    }, [data]);

    const saveAllData = useCallback(async () => {
        await saveData();
    }, [saveData]);

    return { data, updateData, saveData, saveAllData, saveMessage, isLoading };
}

// Helper to generate unique IDs
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
