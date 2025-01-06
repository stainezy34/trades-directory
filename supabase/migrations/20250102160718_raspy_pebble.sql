-- Add new policies for messages
CREATE POLICY "Users can mark messages as read"
  ON messages FOR UPDATE
  USING (auth.uid() IN (sender_id, recipient_id))
  WITH CHECK (auth.uid() = recipient_id AND NEW.read = true);

-- Add delete policies
CREATE POLICY "Users can delete their own messages"
  ON messages FOR DELETE
  USING (auth.uid() = sender_id);

CREATE POLICY "Project owners can delete their projects"
  ON projects FOR DELETE
  USING (client_id = auth.uid() AND status = 'open');

CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id);

-- Add update policies
CREATE POLICY "Project owners can update project status"
  ON projects FOR UPDATE
  USING (client_id = auth.uid())
  WITH CHECK (
    CASE 
      WHEN NEW.status = 'in_progress' THEN OLD.status = 'open'
      WHEN NEW.status = 'completed' THEN OLD.status = 'in_progress'
      WHEN NEW.status = 'cancelled' THEN OLD.status IN ('open', 'in_progress')
      ELSE false
    END
  );