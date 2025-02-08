import { useState, useEffect } from "react";

export interface SearchResult {
  pageid: number;
  title: string;
  snippet: string;
  thumbnail?: {
    source: string;
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
      // Modified URL to include extracts for snippets
      fetch(
        `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
          query
        )}&gsrlimit=10&prop=pageimages|extracts&exintro=1&explaintext=1&format=json&pithumbsize=200&origin=*`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          if (data.query?.pages) {
            const pagesArray = (Object.values(data.query.pages) as (SearchResult & { extract: string })[]).map((page) => {
              const typedPage = page as SearchResult & { extract: string };
              return {
                ...typedPage,
                snippet: typedPage.extract || "",
              };
            });
            setSearchResults(pagesArray);
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