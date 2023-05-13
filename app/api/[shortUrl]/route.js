import client from "@/utils/redisClient"

export const GET = async (request, { params }) => {
    try {
        console.log("params:", params.shortUrl)
        rsp = await client.hGetAll("shortUrl:" + params.shortUrl)
        console.log({ rsp })
        if (rsp != null) {
            console.log(params.shortUrl)
            await client.zIncrBy("popular", 1, params.shortUrl)
        }
        return new Response(rsp.longUrl, { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error " + error, { status: 500 });
    }
}