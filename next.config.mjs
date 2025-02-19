/** @type {import('next').NextConfig} */
const CompressionPlugin = require('compression-webpack-plugin');

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
      // דחיסת קבצים עם Brotli
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'brotliCompress',
          filename: '[path][base].br',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.7,
        })
      );

      // הסרת Source Maps מה-Client כדי לחסוך מקום
      config.devtool = false;

      // ✅ החרגת חבילות כבדות מלהיכנס ל-Client
      config.externals = [...config.externals, 'moment', 'axios', 'lodash'];
    }

    // הגבלת גודל כל Chunk
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 20000000, // הגבלת כל Chunk ל-20MB כדי לא לעבור את מגבלת Cloudflare
      minSize: 50000,
    };

    return config;
  },
};

module.exports = nextConfig;
