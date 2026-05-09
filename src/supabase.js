import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://eaflcdnjveetrcgojeyp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZmxjZG5qdmVldHJjZ29qZXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjIxNjMsImV4cCI6MjA5Mzc5ODE2M30.3HHj6uckG1_gG8qFUdnVKdmmPy0A8iTJoatTYW06tWg'
);
