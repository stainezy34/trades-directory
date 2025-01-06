/*
  # Projects and Bids Tables

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `trade_type` (text)
      - `location` (text)
      - `budget` (numeric)
      - `deadline` (date)
      - `estimated_duration` (text)
      - `status` (text)
      - `client_id` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `bids`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references projects)
      - `tradesperson_id` (uuid, references profiles)
      - `amount` (numeric)
      - `estimated_duration` (text)
      - `proposal` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for project creation and viewing
    - Add policies for bid creation and viewing
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  trade_type text NOT NULL,
  location text NOT NULL,
  budget numeric NOT NULL CHECK (budget >= 0),
  deadline date NOT NULL,
  estimated_duration text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  client_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled'))
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tradesperson_id uuid NOT NULL REFERENCES profiles(id),
  amount numeric NOT NULL CHECK (amount >= 0),
  estimated_duration text NOT NULL,
  proposal text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'accepted', 'rejected')),
  UNIQUE(project_id, tradesperson_id)
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Anyone can view open projects"
  ON projects FOR SELECT
  USING (status = 'open');

CREATE POLICY "Clients can view their own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Authenticated users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid());

-- Bids policies
CREATE POLICY "Project owners can view bids"
  ON bids FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = bids.project_id
    AND projects.client_id = auth.uid()
  ));

CREATE POLICY "Tradespeople can view their own bids"
  ON bids FOR SELECT
  TO authenticated
  USING (tradesperson_id IN (
    SELECT id FROM profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Tradespeople can create bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (
    tradesperson_id IN (
      SELECT id FROM profiles WHERE id = auth.uid()
    ) AND
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_id
      AND projects.status = 'open'
    )
  );

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bids_updated_at
  BEFORE UPDATE ON bids
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();