import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export const ImageUpload = ({ value, onChange, label = "Image", className = "" }: ImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            setError("Only images (JPEG, PNG, GIF, WebP, SVG) are allowed");
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be less than 5MB");
            return;
        }

        setError("");
        setIsUploading(true);

        try {
            // Generate unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Upload error:', uploadError);
                setError(uploadError.message || "Upload failed");
                setIsUploading(false);
                return;
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            onChange(urlData.publicUrl);
        } catch (err) {
            console.error('Upload error:', err);
            setError("Upload failed. Check Supabase Storage configuration.");
        }

        setIsUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemove = async () => {
        if (value && value.includes('/images/')) {
            // Extract file path from URL
            try {
                const url = new URL(value);
                const pathParts = url.pathname.split('/images/');
                if (pathParts.length > 1) {
                    const filePath = decodeURIComponent(pathParts[1]);
                    await supabase.storage.from('images').remove([filePath]);
                }
            } catch {
                // Ignore delete errors
            }
        }
        onChange('');
    };

    return (
        <div className={className}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors relative">
                {value ? (
                    <div className="relative">
                        <img
                            src={value}
                            alt="Uploaded"
                            className="max-h-40 mx-auto rounded-lg object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            title="Remove image"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {isUploading ? (
                            <div className="flex flex-col items-center gap-2 py-4">
                                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                <span className="text-sm text-gray-500">Uploading...</span>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                                <p className="text-sm text-gray-500">Click or drag to upload</p>
                                <p className="text-xs text-gray-400">Max 5MB · JPEG, PNG, GIF, WebP, SVG</p>
                            </>
                        )}
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                />
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default ImageUpload;
