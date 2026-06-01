/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — the blueprint engine is pure/deterministic and runs in the
  // browser, so the whole app ships as static assets (ideal for Cloudflare Pages).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
