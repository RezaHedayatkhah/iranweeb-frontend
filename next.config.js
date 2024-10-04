/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.iranweeb.ir',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
