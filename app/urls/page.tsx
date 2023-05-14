// "use client"


import CreateSurl from './CreateSurl';



export default async function UrlShorten() {


    return (
        <div>
            <CreateSurl />
            <h1>Top 10 URLs</h1>
            <div>
                <p> value pending...</p>

            </div>
        </div>
    )
}

function urlItem({ url }: any) {
    const { title, longUrl, shortUrl } = url || {};
    return (
        <div>
            <h2>{title}</h2>
            <h3>{longUrl}</h3>
            <h3>{shortUrl}</h3>
        </div>
    )
}
