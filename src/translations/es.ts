export default {
  nav: {
    home: 'Inicio',
    discover: 'Descubrir',
    saved: 'Guardados',
    search: 'Buscar',
    more: 'Más'
  },
  search: {
    placeholder: 'Buscar en Wikipedia...',
    noResults: 'No se encontraron resultados',
    resultsFound: '{{count}} resultado encontrado',
    resultsFound_plural: '{{count}} resultados encontrados',
    title: 'Buscar',
    trending: 'Artículos Tendencia',
    saveArticle: 'Guardar artículo',
    removeFromSaved: 'Quitar de guardados',
    removeArticle: 'Quitar artículo "{{title}}"',
    saveArticleLabel: '{{action}} artículo "{{title}}"'
  },
  more: {
    created: 'Creado por',
    description: 'Un lector de Wikipedia estilo TikTok.',
    links: 'Enlaces',
    repository: 'Repositorio GitHub',
    portfolio: 'Portafolio',
    wikipediaNotice:
    'Este producto utiliza datos de Wikipedia y está disponible bajo la licencia Creative Commons Attribution-ShareAlike. © Wikimedia Foundation. Se pueden aplicar términos adicionales.',
  },
  discover: {
    title: 'Descubrir',
    featuredArticle: 'Artículo Destacado',
    browseTopics: 'Explorar Temas',
    seeMore: 'Ver Más',
    seeLess: 'Ver Menos',
    geography: 'Geografía',
    psychology: 'Psicología',
    science: 'Ciencia',
    art: 'Arte',
    history: 'Historia',
    physics: 'Física',
    loading: 'Cargando...',
    featuredBadge: 'Artículo Destacado'
  },
  feed: {
    readTime: "{{time}} min de lectura",
    readTime30: "30 seg de lectura",
    seeMore: "Ver Más",
    seeLess: "Ver Menos",
    save: "Guardar",
    share: "Compartir",
    read: "Leer",
    loading: "Cargando..."
  },
  saved: {
    title: 'Artículos Guardados',
    unread: 'Sin leer',
    all: 'Todos',
    read: 'Leídos',
    noSavedArticles: 'No hay artículos guardados',
    willAppearHere: 'Los artículos que guardes aparecerán aquí',
    allCaughtUp: '¡Estás al día!',
    noArticlesToShow: 'No hay artículos {{filter}} para mostrar',
    discoverArticles: 'Descubrir Artículos',
    markAsRead: 'Marcar artículo "{{title}}" como leído',
    markAsUnread: 'Marcar artículo "{{title}}" como no leído',
    unsaveArticle: 'Eliminar artículo "{{title}}"'
  }
} as const;
