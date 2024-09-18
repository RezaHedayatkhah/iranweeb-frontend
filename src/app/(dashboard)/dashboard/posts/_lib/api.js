export async function updatePost(formData) {
    console.log(formData)
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/posts/${formData.id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: 'include', // Include credentials (cookies) in the request
        body: JSON.stringify(formData),
    })

}

export async function createPost(formData) {
    console.log(formData)
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: 'include', // Include credentials (cookies) in the request

        body: JSON.stringify(formData),
    });

}