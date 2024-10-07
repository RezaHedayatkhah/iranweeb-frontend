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
    },
};

module.exports = nextConfig;
