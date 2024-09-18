export async function generateMetadata({ params }) {
    let title = ''
    if (params.contentType === "manga"){
        title = `جستجوی مانگا`
    }else if(params.contentType === "manhua"){
        title = `جستجوی مانها`
    }else if(params.contentType === "manhwa"){
        title = `جستجوی مانهوا`
    }

    return {
        title: title,
    }
}

export default function Layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
