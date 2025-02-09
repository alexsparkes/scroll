export async function fetchWithLanguageFallback<T>(
  fetchFn: (lang: string) => Promise<T>,
  currentLang: string,
  validateResult: (result: T) => boolean
): Promise<{ result: T; usedFallback: boolean }> {
  try {
    const result = await fetchFn(currentLang);
    if (validateResult(result)) {
      return { result, usedFallback: false };
    }
    // If result is empty/invalid and language isn't English, try English
    if (currentLang !== 'en') {
      const fallbackResult = await fetchFn('en');
      return { result: fallbackResult, usedFallback: true };
    }
    return { result, usedFallback: false };
  } catch (error) {
    if (currentLang !== 'en') {
      const fallbackResult = await fetchFn('en');
      return { result: fallbackResult, usedFallback: true };
    }
    throw error;
  }
}
