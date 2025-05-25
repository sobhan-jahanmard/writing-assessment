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
