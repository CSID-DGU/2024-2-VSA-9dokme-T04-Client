/** @type {import('next').NextConfig} */

const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SERVICE_URL
      : undefined,
  compress: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_SERVICE_URL: process.env.NEXT_PUBLIC_SERVICE_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
  output: "standalone",
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    domains: ["9dokme.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9dokme.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/mainPage",
        destination: "/main",
        permanent: true,
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
