/*
  # Create AI Tools Schema

  1. New Tables
    - `ai_tools`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `ai_tools` table
    - Add policies for authenticated users to:
      - Read their own tools
      - Create new tools
      - Delete their own tools
*/

CREATE TABLE IF NOT EXISTS ai_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text,
  category text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own tools
CREATE POLICY "Users can read own tools"
  ON ai_tools
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to create tools
CREATE POLICY "Users can create tools"
  ON ai_tools
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own tools
CREATE POLICY "Users can delete own tools"
  ON ai_tools
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);