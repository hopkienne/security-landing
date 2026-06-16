import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Public site is mostly server-rendered via the Payload Local API.
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
