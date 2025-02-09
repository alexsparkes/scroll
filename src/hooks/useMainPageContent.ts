import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchWithLanguageFallback } from '../utils/languageFallback';

interface MainPageContent {
  featuredArticle: {
    title: string;
    extract: string;
    thumbnail?: string;
  };
  inTheNews: {
    title: string;
    extract: string;
  }[];
  loading: boolean;
  error: string | null;
}

function cleanWikiText(element: Element | null): string {
  if (!element) return '';
  
  // Remove edit section links
  element.querySelectorAll('.mw-editsection').forEach(el => el.remove());
  
  // Remove reference links and citations
  element.querySelectorAll('.reference').forEach(el => el.remove());
  element.querySelectorAll('.citation').forEach(el => el.remove());
  
  // Get clean text and remove multiple spaces/newlines
  return element.textContent?.replace(/\s+/g, ' ').trim() || '';
}

export function useMainPageContent() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<MainPageContent>({
    featuredArticle: { title: '', extract: '' },
    inTheNews: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchMainPage = async () => {
      try {
        const lang = i18n.language.split('-')[0];
        
        const fetchForLang = async (language: string) => {
          const response = await fetch(
            `https://${language}.wikipedia.org/w/api.php?` +
            new URLSearchParams({
              action: 'parse',
              page: 'Main_Page',
              format: 'json',
              prop: 'text',
              origin: '*'
            })
          );
          const data = await response.json();
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.parse.text['*'], 'text/html');

          // Extract Today's Featured Article
          const featuredArticleElement = doc.querySelector('#mp-tfa');
          const featuredTitle = featuredArticleElement?.querySelector('p > b > a')?.textContent || '';
          const featuredImage = featuredArticleElement?.querySelector('img')?.src || '';
          
          // Get the first paragraph after removing the image and title
          const contentElement = featuredArticleElement?.cloneNode(true) as Element;
          contentElement?.querySelector('.thumbborder')?.parentElement?.remove();
          const firstParagraph = contentElement?.querySelector('p');
          const featuredExtract = cleanWikiText(firstParagraph);

          // Extract In The News
          const newsItems = Array.from(doc.querySelectorAll('#mp-itn ul li')).map(item => ({
            title: item.querySelector('b')?.textContent || '',
            extract: cleanWikiText(item)
          }));

          return {
            featuredArticle: {
              title: featuredTitle,
              extract: featuredExtract,
              thumbnail: featuredImage ? featuredImage.replace(/^\/\//, 'https://') : undefined
            },
            inTheNews: newsItems
          };
        };

        const { result, usedFallback } = await fetchWithLanguageFallback(
          fetchForLang,
          lang,
          (result) => result.inTheNews.length > 0 && result.featuredArticle.title !== ''
        );

        if (usedFallback) {
          console.log(`Using English fallback for main page content`);
        }

        setContent({
          ...result,
          loading: false,
          error: null
        });
      } catch {
        setContent(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch Wikipedia main page content'
        }));
      }
    };

    fetchMainPage();
  }, [i18n.language]);

  return content;
}
