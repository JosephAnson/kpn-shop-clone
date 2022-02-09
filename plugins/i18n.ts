export default ({ app }: any) => {
  const locale = app.i18n.getLocaleCookie();

  app.i18n.setLocale(locale);
};
