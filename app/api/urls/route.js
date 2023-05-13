import client from "@/utils/redisClient"


// single short url to long with params
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

