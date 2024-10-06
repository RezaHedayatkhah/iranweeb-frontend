export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: '/dashboard',
                allow: '/',
            },
        ],
        sitemap: 'https://iranweeb.ir/sitemap.xml',
    };
}
