/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
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
