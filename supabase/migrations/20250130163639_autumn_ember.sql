/*
  # Add profile insert policy and views increment function
  
  1. Security Changes
    - Add INSERT policy for profiles table to allow users to create their own profile
  
  2. New Functions
    - Add increment_timer_views function for tracking timer popularity
*/

-- Add the missing INSERT policy for profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
      ON profiles FOR INSERT
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Create or replace the increment_timer_views function
CREATE OR REPLACE FUNCTION increment_timer_views(timer_id uuid)
RETURNS timers
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  timer timers;
BEGIN
  UPDATE timers
  SET views = views + 1
  WHERE id = timer_id
  RETURNING * INTO timer;
  
  RETURN timer;
END;
$$;