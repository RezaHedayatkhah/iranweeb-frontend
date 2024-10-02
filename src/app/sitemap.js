export default async function sitemap() {
    const res = await fetch(`https://api.iranweeb.ir/api/posts`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    const data = await res.json();
    let post = []
    if (res.ok) {
        post = data.posts.map((item) => ({
            url: `https://iranweeb.ir/${item.contentType.toLowerCase()}/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        }))
    }
    return [
        {
            url: 'https://iranweeb.ir',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://iranweeb.ir/login',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://iranweeb.ir/register',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://iranweeb.ir/manga',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://iranweeb.ir/manhwa',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://iranweeb.ir/manhua',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        ...post
    ]
}