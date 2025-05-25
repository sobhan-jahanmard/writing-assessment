
-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY

-- Create policy for uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'question-image')

-- Create policy for updates
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
WITH CHECK (bucket_id = 'question-image')

-- Create policy for reads
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'question-image')

-- Create policy for deletes
CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'question-image')