/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.animeweeb.ir',
                port: '',
                pathname: '/**',
            },
        ],
        minimumCacheTTL: 3600, // Apply the minimum cache TTL globally for images
    },
};

module.exports = nextConfig;
