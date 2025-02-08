import { useState, useEffect } from "react";

export interface SearchResult {
  pageid: number;
  title: string;
  snippet: string;
  description?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}

export function useSearch(query: string) {
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

    const debounceHandler = setTimeout(() => {
      setSearchLoading(true);
      setSearchError("");
      
      fetch(
        `https://en.wikipedia.org/w/api.php?` +
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
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          if (data.query?.pages) {
            const pagesArray = Object.values(data.query.pages) as Array<{
              pageid: number;
              title: string;
              extract: string;
              description?: string;
              thumbnail?: {
                source: string;
                width: number;
                height: number;
              };
            }>;

            const results = pagesArray.map((page) => ({
              pageid: page.pageid,
              title: page.title,
              snippet: page.extract || "",
              description: page.description,
              thumbnail: page.thumbnail
            }));

            setSearchResults(results);
          } else {
            setSearchResults([]);
          }
        })
        .catch((err: Error) => {
          setSearchError(err.message || "Error occurred");
        })
        .finally(() => {
          setSearchLoading(false);
        });
    }, 500);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [query]);

  return { searchResults, searchLoading, searchError };
}