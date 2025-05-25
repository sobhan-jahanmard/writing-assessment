export function getImageFullUrl(fullPath: string) {
  return `${process.env.NEXT_PUBLIC_STORAGE_PATH}/${fullPath}`;
}
