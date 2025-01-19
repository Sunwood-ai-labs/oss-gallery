/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
      },
      {
        protocol: 'https',
        hostname: 'reactjs.org',
      },
      {
        protocol: 'https',
        hostname: 'www.typescriptlang.org',
      },
    ],
  },
};

module.exports = nextConfig;
