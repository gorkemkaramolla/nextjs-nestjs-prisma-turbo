import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/database', '@repo/ui', '@repo/utils'],
};

export default nextConfig;
