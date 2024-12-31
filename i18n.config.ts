export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      calculator: 'Calculator',
      clear: 'C',
      history: 'History',
      no_history: 'No calculations yet',
      new_content: 'New content available',
      reload: 'Reload',
      close: 'Close'
    },
    fr: {
      calculator: 'Calculatrice',
      clear: 'C',
      history: 'Historique',
      no_history: 'Aucun calcul pour le moment',
      new_content: 'Nouveau contenu disponible',
      reload: 'Recharger',
      close: 'Fermer'
    }
  }
}))