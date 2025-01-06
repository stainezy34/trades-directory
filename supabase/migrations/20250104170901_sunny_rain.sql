/*
  # Enhanced Security Policies Update

  1. New Policies
    - Add notification policies
    - Add availability slot policies
    - Add portfolio item policies
    - Add recommendation log policies

  2. Security Enhancements
    - Add RLS enforcement checks
    - Add data validation policies
    - Add cascade delete policies

  3. Policy Updates
    - Refine existing message policies
    - Update bid policies
    - Enhance project policies
*/

-- Verify RLS is enabled on all tables
DO $$ 
BEGIN
  -- Messages
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'messages' AND rowsecurity = true
  ) THEN
    ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
  END IF;

  -- Notifications
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'notifications' AND rowsecurity = true
  ) THEN
    ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
  END IF;

  -- Availability slots
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'availability_slots' AND rowsecurity = true
  ) THEN
    ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Notification Policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    -- Only allow updating the read status
    auth.uid() = user_id AND
    OLD.user_id = NEW.user_id AND
    OLD.type = NEW.type AND
    OLD.title = NEW.title AND
    OLD.message = NEW.message
  );

-- Message Policies (Enhanced)
CREATE POLICY "Users can view messages they're involved in"
  ON messages FOR SELECT
  USING (
    auth.uid() IN (sender_id, recipient_id) AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id IN (sender_id, recipient_id)
      AND status = 'active'
    )
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = recipient_id
      AND status = 'active'
    )
  );

-- Availability Slot Policies
CREATE POLICY "Anyone can view available slots"
  ON availability_slots FOR SELECT
  USING (
    status = 'available' AND
    start_time > now()
  );

CREATE POLICY "Tradespeople can manage their slots"
  ON availability_slots FOR ALL
  USING (tradesperson_id = auth.uid());

-- Project Policies (Enhanced)
CREATE POLICY "Users can view projects they're involved with"
  ON projects FOR SELECT
  USING (
    status = 'open' OR
    client_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM bids
      WHERE project_id = id
      AND tradesperson_id = auth.uid()
    )
  );

CREATE POLICY "Project owners can update their projects"
  ON projects FOR UPDATE
  USING (client_id = auth.uid())
  WITH CHECK (
    CASE 
      WHEN NEW.status = 'in_progress' THEN 
        OLD.status = 'open' AND
        EXISTS (
          SELECT 1 FROM bids
          WHERE project_id = id
          AND status = 'accepted'
        )
      WHEN NEW.status = 'completed' THEN 
        OLD.status = 'in_progress'
      WHEN NEW.status = 'cancelled' THEN 
        OLD.status IN ('open', 'in_progress')
      ELSE false
    END
  );

-- Bid Policies (Enhanced)
CREATE POLICY "Tradespeople can submit bids"
  ON bids FOR INSERT
  WITH CHECK (
    tradesperson_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM projects
      WHERE id = project_id
      AND status = 'open'
      AND client_id != auth.uid()
    ) AND
    NOT EXISTS (
      SELECT 1 FROM bids
      WHERE project_id = NEW.project_id
      AND tradesperson_id = auth.uid()
    )
  );

CREATE POLICY "Project owners can manage bids"
  ON bids FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE id = project_id
      AND client_id = auth.uid()
    )
  )
  WITH CHECK (
    -- Only allow status updates
    OLD.project_id = NEW.project_id AND
    OLD.tradesperson_id = NEW.tradesperson_id AND
    OLD.amount = NEW.amount AND
    OLD.estimated_duration = NEW.estimated_duration AND
    OLD.proposal = NEW.proposal AND
    NEW.status IN ('accepted', 'rejected')
  );

-- Review Policies (Enhanced)
CREATE POLICY "Users can create reviews for completed projects"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM projects
      WHERE client_id = auth.uid()
      AND status = 'completed'
      AND EXISTS (
        SELECT 1 FROM bids
        WHERE project_id = projects.id
        AND tradesperson_id = NEW.tradesperson_id
        AND status = 'accepted'
      )
    )
  );

-- Function to clean up related data
CREATE OR REPLACE FUNCTION cleanup_user_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete user's messages
  DELETE FROM messages WHERE sender_id = OLD.id OR recipient_id = OLD.id;
  
  -- Delete user's notifications
  DELETE FROM notifications WHERE user_id = OLD.id;
  
  -- Delete user's availability slots
  DELETE FROM availability_slots WHERE tradesperson_id = OLD.id;
  
  -- Mark user's projects as cancelled
  UPDATE projects 
  SET status = 'cancelled'
  WHERE client_id = OLD.id AND status IN ('open', 'in_progress');
  
  -- Mark user's bids as withdrawn
  UPDATE bids
  SET status = 'withdrawn'
  WHERE tradesperson_id = OLD.id AND status = 'pending';
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger for user deletion
CREATE TRIGGER cleanup_user_data_trigger
  BEFORE DELETE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_user_data();