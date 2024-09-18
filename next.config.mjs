/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'iranweeb.storage.iran.liara.space',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
