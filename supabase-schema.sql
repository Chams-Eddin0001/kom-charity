-- Supabase Schema for Kommunity Foundation Admin Dashboard
-- Run this in your Supabase SQL Editor (supabase.com/dashboard > SQL Editor)

-- Admin Data Table (stores all CMS content)
CREATE TABLE IF NOT EXISTS admin_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions Table (for admin login sessions)
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Login Attempts Table (for rate limiting - optional)
CREATE TABLE IF NOT EXISTS login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip TEXT UNIQUE NOT NULL,
    count INTEGER DEFAULT 0,
    last_attempt TIMESTAMPTZ DEFAULT NOW(),
    locked_until TIMESTAMPTZ
);

-- Contact Messages Table (for contact form submissions)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_data_key ON admin_data(key);

-- Enable Row Level Security
ALTER TABLE admin_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anon key access (for frontend direct access)
-- Drop existing policies first (run this if you get "policy already exists" errors)
-- DROP POLICY IF EXISTS "Allow all access to admin_data" ON admin_data;

-- Admin Data policies
CREATE POLICY "admin_data_select" ON admin_data FOR SELECT USING (true);
CREATE POLICY "admin_data_insert" ON admin_data FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_data_update" ON admin_data FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "admin_data_delete" ON admin_data FOR DELETE USING (true);

-- Sessions policies
CREATE POLICY "sessions_select" ON sessions FOR SELECT USING (true);
CREATE POLICY "sessions_insert" ON sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "sessions_update" ON sessions FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "sessions_delete" ON sessions FOR DELETE USING (true);

-- Login attempts policies
CREATE POLICY "login_attempts_select" ON login_attempts FOR SELECT USING (true);
CREATE POLICY "login_attempts_insert" ON login_attempts FOR INSERT WITH CHECK (true);
CREATE POLICY "login_attempts_update" ON login_attempts FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "login_attempts_delete" ON login_attempts FOR DELETE USING (true);

-- Contact messages policies
CREATE POLICY "contact_messages_select" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "contact_messages_insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_messages_delete" ON contact_messages FOR DELETE USING (true);

-- ====================================
-- STORAGE BUCKET FOR IMAGES
-- ====================================
-- Go to Storage in Supabase Dashboard and:
-- 1. Create a new bucket called "images"
-- 2. Make it PUBLIC
-- 3. Allow uploads for authenticated OR anonymous users
