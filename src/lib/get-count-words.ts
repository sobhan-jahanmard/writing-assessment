export const getWordsCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};
