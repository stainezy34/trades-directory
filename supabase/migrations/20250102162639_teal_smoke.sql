/*
  # Add Portfolio and Milestones Support

  1. New Tables
    - `portfolio_items`: Stores portfolio entries for tradespeople
    - `project_milestones`: Tracks project progress milestones
    - `availability_slots`: Manages tradesperson availability
    - `recommendation_logs`: Tracks AI recommendations for analytics

  2. Changes
    - Add portfolio_items array to profiles table
    - Add milestones array to projects table
    
  3. Security
    - Enable RLS on new tables
    - Add policies for data access and modification
*/

-- Add portfolio items array to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS portfolio_items jsonb[] DEFAULT '{}';

-- Add milestones array to projects
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS milestones jsonb[] DEFAULT '{}';

-- Create availability slots table
CREATE TABLE IF NOT EXISTS availability_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tradesperson_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'available' 
    CHECK (status IN ('available', 'booked', 'unavailable')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

-- Create recommendation logs table
CREATE TABLE IF NOT EXISTS recommendation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  tradesperson_id uuid REFERENCES profiles(id),
  score numeric NOT NULL,
  factors jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_logs ENABLE ROW LEVEL SECURITY;

-- Availability slots policies
CREATE POLICY "Public can view available slots"
  ON availability_slots FOR SELECT
  USING (status = 'available');

CREATE POLICY "Tradespeople can manage their slots"
  ON availability_slots FOR ALL
  USING (tradesperson_id = auth.uid());

-- Recommendation logs policies
CREATE POLICY "Project owners can view recommendations"
  ON recommendation_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_id
    AND projects.client_id = auth.uid()
  ));

-- Add updated_at trigger
CREATE TRIGGER availability_slots_updated_at
  BEFORE UPDATE ON availability_slots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();