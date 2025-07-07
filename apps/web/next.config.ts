import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();


const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    position: 'top-right'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
