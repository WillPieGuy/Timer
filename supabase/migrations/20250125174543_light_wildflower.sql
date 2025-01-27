/*
  # Create countdowns table and setup security

  1. New Tables
    - `countdowns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `target_time` (timestamptz)
      - `timezone` (text)
      - `share_id` (uuid, unique)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `countdowns` table
    - Add policies for:
      - Users can read/write their own countdowns
      - Anyone can read shared countdowns
*/

CREATE TABLE IF NOT EXISTS countdowns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  target_time timestamptz NOT NULL,
  timezone text NOT NULL,
  share_id uuid UNIQUE DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE countdowns ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own countdowns
CREATE POLICY "Users can read own countdowns"
  ON countdowns
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own countdowns
CREATE POLICY "Users can insert own countdowns"
  ON countdowns
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own countdowns
CREATE POLICY "Users can update own countdowns"
  ON countdowns
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own countdowns
CREATE POLICY "Users can delete own countdowns"
  ON countdowns
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anyone to read shared countdowns
CREATE POLICY "Anyone can read shared countdowns"
  ON countdowns
  FOR SELECT
  TO anon
  USING (true);