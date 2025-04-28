/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
  // Any other existing configuration options should be preserved here
}

module.exports = nextConfig
