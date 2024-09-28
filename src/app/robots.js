export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/dashboard',
        },
        sitemap: 'https://iranweeb.ir/sitemap.xml',
    }
}