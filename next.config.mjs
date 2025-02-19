/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // מקטין את ה-build לתיקייה נפרדת וקטנה יותר
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}', // מונע טעינה של כל הספרייה
      },
    },
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 25000000, // מגביל כל צ'אנק ל-25MB
    };
    return config;
  },
};

// ייצוא נכון לפי התקן של Next.js
module.exports = nextConfig;
