const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'brotliCompress', // ברירת מחדל: gzip. אבל Brotli עדיף מבחינת דחיסה
          filename: '[path][base].br',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240, // דוחס רק קבצים מעל 10KB
          minRatio: 0.7, // היחס בין הקובץ לפני ואחרי הדחיסה
        })
      );
    }

    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 20000000, // מגביל כל צ'אנק ל-20MB
      minSize: 50000,
    };

    if (!dev) {
      config.devtool = false; // ביטול Sourcemaps בפרודקשן
    }

    return config;
  },
};

module.exports = nextConfig;
