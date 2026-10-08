// GITHUB_PAGES=1 builds a static export served from https://<user>.github.io/darismysl/.
// The /api/lead route needs a server, so the Pages workflow removes it before building.
const pages = process.env.GITHUB_PAGES === '1';
const basePath = pages ? '/darismysl' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(pages && { output: 'export', trailingSlash: true, images: { unoptimized: true } }),
};
export default nextConfig;
