/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // if true pages render twice due to an issue with react 18: https://github.com/vercel/next.js/issues/35822
};

module.exports = nextConfig;
