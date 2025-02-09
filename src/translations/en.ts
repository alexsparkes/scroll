export default {
  nav: {
    home: 'Home',
    discover: 'Discover',
    saved: 'Saved',
    search: 'Search',
    more: 'More'
  },
  search: {
    placeholder: 'Search Wikipedia...',
    noResults: 'No results found',
    resultsFound: '{{count}} result found',
    resultsFound_plural: '{{count}} results found',
    title: 'Search',
    trending: 'Trending Articles',
    saveArticle: 'Save article',
    removeFromSaved: 'Remove from saved',
    removeArticle: 'Remove article "{{title}}"',
    saveArticleLabel: '{{action}} article "{{title}}"'
  },
  more: {
    created: 'Created by',
    description: 'A Tiktok style wikipedia reader.',
    links: 'Links',
    repository: 'GitHub Repository',
    portfolio: 'Portfolio'
  },
  discover: {
    title: 'Discover',
    featuredArticle: 'Featured Article',
    browseTopics: 'Browse Topics',
    seeMore: 'See More',
    seeLess: 'See Less',
    geography: 'Geography',
    psychology: 'Psychology',
    science: 'Science',
    art: 'Art',
    history: 'History',
    physics: 'Physics',
    loading: 'Loading...',
    featuredBadge: 'Featured Article'
  },
  feed: {
    readTime: "{{time}} min read",
    readTime30: "30 sec read",
    seeMore: "See More",
    seeLess: "See Less",
    save: "Save",
    share: "Share",
    read: "Read",
    loading: "Loading..."
  },
  saved: {
    title: 'Saved Articles',
    unread: 'Unread',
    all: 'All',
    read: 'Read',
    noSavedArticles: 'No saved articles yet',
    willAppearHere: 'Articles you save will appear here',
    allCaughtUp: "You're all caught up!",
    noArticlesToShow: 'No {{filter}} articles to show',
    discoverArticles: 'Discover Articles',
    markAsRead: 'Mark article "{{title}}" as read',
    markAsUnread: 'Mark article "{{title}}" as unread',
    unsaveArticle: 'Unsave article "{{title}}"'
  }
} as const;
