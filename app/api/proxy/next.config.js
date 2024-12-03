/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy',
        destination: '/api/proxy',
      },
    ];
  },
}

export default nextConfig;
