/*
  # Add missing policies and fixes

  This migration adds any missing policies and fixes without recreating existing ones.
  
  1. New Policies
    - Additional message policies
    - Additional project policies
    - Additional bid policies
  
  2. Changes
    - Adds missing indexes
    - Adds missing constraints
*/

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_trade_type ON projects(trade_type);
CREATE INDEX IF NOT EXISTS idx_profiles_trade_type ON profiles USING GIN(trade_type);
CREATE INDEX IF NOT EXISTS idx_messages_participants ON messages(sender_id, recipient_id);
CREATE INDEX IF NOT EXISTS idx_reviews_tradesperson ON reviews(tradesperson_id);

-- Add missing constraints
ALTER TABLE profiles 
  ADD CONSTRAINT valid_rating 
  CHECK (rating >= 0 AND rating <= 5);

ALTER TABLE reviews 
  ADD CONSTRAINT valid_review_rating 
  CHECK (rating >= 1 AND rating <= 5);

-- Add missing policies (only if they don't exist)
DO $$ 
BEGIN
  -- Messages policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' AND policyname = 'Users can mark messages as read'
  ) THEN
    CREATE POLICY "Users can mark messages as read"
      ON messages FOR UPDATE
      USING (auth.uid() IN (sender_id, recipient_id))
      WITH CHECK (auth.uid() = recipient_id AND NEW.read = true);
  END IF;

  -- Project policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'projects' AND policyname = 'Tradespeople can view assigned projects'
  ) THEN
    CREATE POLICY "Tradespeople can view assigned projects"
      ON projects FOR SELECT
      USING (EXISTS (
        SELECT 1 FROM bids
        WHERE bids.project_id = id
        AND bids.tradesperson_id = auth.uid()
        AND bids.status = 'accepted'
      ));
  END IF;

  -- Bid policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'bids' AND policyname = 'Tradespeople can update their bids'
  ) THEN
    CREATE POLICY "Tradespeople can update their bids"
      ON bids FOR UPDATE
      USING (tradesperson_id = auth.uid())
      WITH CHECK (status = 'pending');
  END IF;

END $$;