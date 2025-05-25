import { randomBytes } from "crypto";
import { extension } from "mime-types";

export function generatFolderAndFileName(imageType: File["type"]): string {
  const date = new Date().toISOString().split("T")[0];
  return `${date}/${randomBytes(16).toString("hex")}.${extension(imageType)}`;
}
