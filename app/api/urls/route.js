import client from "@/utils/redisClient"


// short url to long with params
export const GET = async (req) => {
    const url = new URL(req.url)
    const params = new URLSearchParams(url.search)
    console.log({ params })
    shortUrl = params.get("shortUrl")
    try {
        rsp = await client.hGetAll("shortUrl:" + shortUrl)
        console.log({ rsp })
        return new Response(JSON.stringify(rsp), { status: 200 })

    } catch (error) {
        return new Response("Fail to get key from Redis")
    }

}

import crypto from 'crypto';

// long to short
export const POST = async (request) => {
    const { longUrl, title } = await request.json();
    console.log({ longUrl })
    console.log({ title })

    if (!longUrl) {
        return new Response("Missing longUrl in request", { status: 400 });
    }

    try {
        // Check if longUrl already exists in Redis
        let shortUrl = await client.get("longUrl:" + longUrl);
        console.log("getting shortUrl", shortUrl)
        if (shortUrl) {
            return new Response(JSON.stringify({ shortUrl }), { status: 200 });
        } else {
            // Generate a short random string including 0-9, a-z, A-Z
            do {
                shortUrl = crypto.randomBytes(6).toString('base64').replace(/\+/g, '0').replace(/\//g, '0').substring(0, 6);
            } while (await client.exists(shortUrl));

            // Save the result to Redis
            await client.set("longUrl:" + longUrl, shortUrl);

            // Save the short to long mapping
            await client.hSet("shortUrl:" + shortUrl, "longUrl", longUrl)

            // Optionally set a title for the URL
            if (title) {
                await client.hSet("shortUrl:" + shortUrl, "title", title)
            }

            return new Response(JSON.stringify({ shortUrl }), { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Failed to get key from Redis", { status: 500 });
    }
}


