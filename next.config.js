/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['cloudflare-ipfs.com', 'ipfs.bithomp.com'],
  },
}

module.exports = nextConfig
