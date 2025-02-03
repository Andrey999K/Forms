export const normalizeFirebaseError = (error?: string) => {
  if (!error) return 'Произошла неизвестная ошибка.';

  const errorMatch = error.match(/\(auth\/([a-z-]+)\)/);
  if (errorMatch) {
    return `auth/${errorMatch[1]}`;
  }

  return error.trim();
};
