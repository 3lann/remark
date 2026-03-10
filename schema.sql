-- =============================================
-- Careers App - PostgreSQL Schema
-- Run this once to set up the database
-- =============================================

-- 1. Applications table (job applications)
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    role TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    years_experience INTEGER DEFAULT 0 NOT NULL,
    expected_salary TEXT,
    strongest_skill TEXT,
    portfolio_url TEXT,
    why_join TEXT NOT NULL,
    cv_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL
);

-- 2. Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'viewer', -- super_admin, manager, viewer
    display_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 3. Job listings table
CREATE TABLE IF NOT EXISTS job_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL, -- full-time, part-time, etc.
    description TEXT DEFAULT '',
    requirements TEXT DEFAULT '',
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 4. Insert default admin user (password: 15281153)
INSERT INTO admin_users (username, password_hash, role, display_name)
VALUES (
    'admin',
    encode(hmac('15281153', 'remark-careers-salt-2024', 'sha256'), 'hex'),
    'super_admin',
    'Admin'
) ON CONFLICT (username) DO NOTHING;
