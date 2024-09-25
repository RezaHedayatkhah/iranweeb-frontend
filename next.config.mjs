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
    experimental: {
        serverActions: {
            allowedOrigins: [
                'http://localhost',
                'https://bitpay.ir',
            ]
        }
    },
    async headers() {
        return [
            {
                source: "/(.*)", // Apply globally to all routes
                headers: [
                    {
                        key: "Referrer-Policy",
                        value: "no-referrer-when-downgrade", // More lenient policy
                    },
                    {
                        key: "X-Frame-Options",
                        value: "ALLOWALL", // Allow iframes from any site
                    },
                    {
                        key: "Content-Security-Policy",
                        value: "default-src * data: 'unsafe-inline' 'unsafe-eval'", // Allow everything (for dev purposes, refine for production)
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
