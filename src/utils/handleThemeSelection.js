const handleThemeSelection = () => {
  const appTheme = localStorage.theme;
  switch (appTheme) {
    case 'dark':
      document.body.classList.add('dark');
      break;

    /* If no theme is set in app, set theme based on prefers-color-scheme */
    default:
      const userPrefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (userPrefersDark) {
        document.body.classList.add('dark');
      }
  }
};
export default handleThemeSelection;
