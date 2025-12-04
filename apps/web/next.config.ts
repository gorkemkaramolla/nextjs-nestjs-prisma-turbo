import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ['@repo/database', '@repo/ui', '@repo/utils'],
};

export default nextConfig;
