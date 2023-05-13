import client from "@/utils/redisClient"

export const GET = async (request, { params }) => {
    try {
        console.log(params)
        rsp = await client.hGetAll("shortUrl:" + params.shortUrl)
        console.log({ rsp })
        return new Response(JSON.stringify(rsp), { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}