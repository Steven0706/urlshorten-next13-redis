// "use client"

import client from '../redis';
import CreateSurl from './CreateSurl';


async function getRedisData() {
    const value = await client.hGetAll('your_key');

    return value;
}


export default async function UrlShorten() {
    const topUrls = await getRedisData();

    return (
        <div>
            <CreateSurl />
            <h1>Top 10 URLs</h1>
            <div>
                <p> value pending...</p>
                <p>{topUrls.gg}</p>
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
