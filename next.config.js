/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    // providing the locales supported by your application
    locales: ["en-US", 'ar-SA'],
    //  default locale used when the non-locale paths are visited
    defaultLocale: "en-US",
  },
} 
