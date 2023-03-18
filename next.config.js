const StylelintPlugin = require("stylelint-webpack-plugin"); // line to add

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin());
    return config;
  },
}

module.exports = nextConfig
