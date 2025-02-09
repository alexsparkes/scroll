import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { fetchWithLanguageFallback } from '../utils/languageFallback';

export interface SearchResult {
  pageid: number;
  title: string;
  snippet: string;
  extract?: string;
  description?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}

export function useSearch(query: string) {
  const { i18n } = useTranslation();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      setSearchError("");
      setSearchLoading(false);
      return;
    }

    const fetchForLang = async (language: string) => {
      const response = await fetch(
        `https://${language}.wikipedia.org/w/api.php?` +
        `action=query&` +
        `generator=search&` +
        `gsrsearch=${encodeURIComponent(query)}&` +
        `gsrlimit=10&` +
        `prop=pageimages|description|extracts&` +
        `piprop=thumbnail&` +
        `pithumbsize=200&` +
        `pilimit=10&` +
        `exintro=1&` +
        `explaintext=1&` +
        `exlimit=10&` +
        `format=json&` +
        `origin=*`
      );
      const data = await response.json();
      return data.query?.pages ? Object.values(data.query.pages) : [];
    };

    const debounceHandler = setTimeout(async () => {
      setSearchLoading(true);
      setSearchError("");
      
      try {
        const lang = i18n.language.split('-')[0];
        const { result, usedFallback } = await fetchWithLanguageFallback(
          fetchForLang,
          lang,
          (results) => results.length > 0
        );

        if (usedFallback) {
          console.log(`Using English fallback for search results`);
        }

        const results = (result as SearchResult[]).map((page: SearchResult) => ({
          pageid: page.pageid,
          title: page.title,
          snippet: page.extract || "",
          description: page.description,
          thumbnail: page.thumbnail
        }));

        setSearchResults(results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setSearchError(err.message);
        } else {
          setSearchError("Error occurred");
        }
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [query, i18n.language]);

  return { searchResults, searchLoading, searchError };
}