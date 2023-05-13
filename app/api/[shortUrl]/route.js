import client from "@/utils/redisClient"

export const GET = async (request, { params }) => {
    try {
        console.log("params:", params.shortUrl)
        // rsp = await client.hGetAll("shortUrl:" + params.shortUrl)
        const rsp = await client.hGetAll("shortUrl:" + params.shortUrl)
        console.log(rsp)
        if (Object.keys(rsp).length > 0) {
            console.log("increasing:", params.shortUrl)
            await client.zIncrBy("popular", 1, params.shortUrl)
        }
        return new Response(rsp.longUrl, { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error " + error, { status: 500 });
    }
}