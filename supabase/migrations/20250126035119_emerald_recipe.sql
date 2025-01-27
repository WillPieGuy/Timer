/*
  # Fix shared countdown access

  1. Changes
    - Safely add policies for shared countdown access
    - Use DO blocks to check for existing policies
    - Add policy for authenticated users if needed

  2. Security
    - Maintains existing public read access
    - Adds authenticated user read access if missing
*/

DO $$ 
BEGIN
  -- Check if the authenticated users policy exists before creating it
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'countdowns' 
      AND policyname = 'Authenticated users can read shared countdowns'
  ) THEN
    CREATE POLICY "Authenticated users can read shared countdowns"
      ON countdowns
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;