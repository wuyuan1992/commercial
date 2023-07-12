import semi from "@douyinfe/semi-next"

/** @type {import('next').NextConfig} */
const nextConfig = semi.default({
  omitCss: false,
})({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ["@douyinfe/semi-ui", "@douyinfe/semi-icons"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.bugutv.net",
        port: "",
        pathname: "/public/**",
        // pathname: '/public/**.webp',
      },
    ],
  },
})

export default nextConfig
