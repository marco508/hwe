/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@hwe/ui", "@hwe/types"],
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
};
