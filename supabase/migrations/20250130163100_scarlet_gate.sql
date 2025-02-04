/*
  # Create timers and profiles tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users id
      - `username` (text, unique)
      - `created_at` (timestamp)
    - `timers`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `end_time` (timestamp)
      - `created_by` (uuid, references profiles)
      - `views` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for CRUD operations
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create timers table
CREATE TABLE timers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  end_time timestamptz NOT NULL,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE timers ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Timers policies
CREATE POLICY "Timers are viewable by everyone"
  ON timers FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own timers"
  ON timers FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own timers"
  ON timers FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own timers"
  ON timers FOR DELETE
  USING (auth.uid() = created_by);