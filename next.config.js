const StylelintPlugin = require("stylelint-webpack-plugin"); // line to add

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin());

    config.module.rules.push(
      {
        test: /\.mdx$/,
        use: 'raw-loader',
      }
    )
    return config;
  },
}

module.exports = nextConfig
