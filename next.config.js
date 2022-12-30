/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com'],
    optimize: true,
  },
}

module.exports = nextConfig
