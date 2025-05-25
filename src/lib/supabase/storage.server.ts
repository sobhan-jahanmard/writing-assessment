"use server";

import { generatFolderAndFileName } from "../generate-folder-and-filename";
import { getImageFullUrl } from "../get-image-full-url";
import { createClient } from "./server";

const bucket = "question-image";

export async function uploadFile(
  file: File | Blob,
  imageType: File["type"]
): Promise<string> {
  const folderAndFilename = generatFolderAndFileName(imageType);
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(folderAndFilename, file);

  if (!!error) {
    throw new Error("Uploading the file");
  }
  return getImageFullUrl(data?.fullPath);
}

export async function getFilePublicUrl(path: string) {
  const supabase = await createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function getFileSignedUrl(path: string, expiresInSeconds = 60) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresInSeconds);
  if (error) throw error;
  return data.signedUrl;
}

export async function removeFiles(paths: string[]) {
  const supabase = await createClient();
  return await supabase.storage.from(bucket).remove(paths);
}

export async function listFiles(folder = "", options = {}) {
  const supabase = await createClient();
  return await supabase.storage.from(bucket).list(folder, options);
}
