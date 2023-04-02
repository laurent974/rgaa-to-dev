const StylelintPlugin = require("stylelint-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  optimizeFonts: false,
  webpack: (config) => {
    config.plugins.push(new StylelintPlugin());
    return config;
  },
}

module.exports = nextConfig
