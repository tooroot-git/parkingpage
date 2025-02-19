/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // הקטנת ה-build לתיקייה נפרדת
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}', // טעינה חלקית של Lodash
      },
    },
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 20000000, // שינוי ל-20MB כדי לוודא שאף קובץ לא חורג מהמגבלה של Cloudflare
      minSize: 100000, // מאפשר קבצים קטנים יותר כדי למנוע חבילות גדולות
      maxAsyncSize: 20000000, // גם בקבצים Async לא לעלות מעל 20MB
      maxInitialSize: 20000000, // בקבצים הראשונים שנטענים לא לעלות על 20MB
    };
    return config;
  },
};

module.exports = nextConfig;
