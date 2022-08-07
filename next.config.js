/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'ar'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    domains: [
      {
        domain: '/',
        defaultLocale: 'en-US',
        // other locales that should be handled on this domain
        locales: ['es'],
      },
      {
        domain: '/',
        defaultLocale: 'ar',
      }
    ],
  }
}
