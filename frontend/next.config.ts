// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // …any existing config…
  async rewrites() {
    return [
      {
        source: '/api/:path*',                    // what client will call
        destination: 'http://localhost:5000/api/:path*', // your Express server
      },
    ];
  },
};

export default nextConfig;
