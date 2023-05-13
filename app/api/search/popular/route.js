import client from "@/utils/redisClient"

export const GET = async (request) => {
    try {

        rsp = await client.zRange("popular", 0, 20, {
            REV: true,
        })
        console.log({ rsp })
        return new Response(rsp, { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error " + error, { status: 500 });
    }
}