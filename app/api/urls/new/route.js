import client from "@/utils/redisClient"
import crypto from 'crypto';

// long to short
export const POST = async (request) => {
    const { longUrl, title, customUrl } = await request.json();
    console.log({ longUrl })
    console.log({ title })
    console.log({ customUrl })

    if (!longUrl) {
        return new Response("Missing longUrl in request", { status: 400 });
    }

    try {
        // Check if longUrl already exists in Redis
        let shortUrl = await client.get("longUrl:" + longUrl);
        if (shortUrl) {
            return new Response(JSON.stringify({ shortUrl }), { status: 200 });
        } else {

            // if customUrl is provided:
            if (customUrl) {
                // check if customUrl is available
                if (await client.exists("shortUrl:" + customUrl) === 0) { shortUrl = customUrl }
                else {
                    return new Response("custom URL alreay exist", { status: 500 });
                }
            }
            else {
                do {
                    // Generate a short random string including 0-9, a-z, A-Z
                    shortUrl = crypto.randomBytes(6).toString('base64').replace(/\+/g, '0').replace(/\//g, '0').substring(0, 6);
                } while (await client.exists(shortUrl));
            }

            // Save the result to Redis
            await client.set("longUrl:" + longUrl, shortUrl);

            // Save the short to long mapping
            await client.hSet("shortUrl:" + shortUrl, "longUrl", longUrl)

            // count one on the popular set
            // await client.zAdd("popular", [{ score: 1, value: shortUrl }])
            await client.zIncrBy("popular", 1, shortUrl)

            // Optionally set a title for the URL
            if (title) {
                await client.hSet("shortUrl:" + shortUrl, "title", title)
            }
            console.log("generated shortUrl ", shortUrl, " for ", longUrl)
            return new Response(JSON.stringify({ shortUrl }), { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Failed to get key from Redis", { status: 500 });
    }
}
