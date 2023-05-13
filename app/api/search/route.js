import client from "@/utils/redisClient"

export const POST = async (request) => {
    const { searchQuery } = await request.json();
    console.log({ searchQuery })
    try {
        const res = await client.ft.search('urlIdx', searchQuery)
        console.log(res)
        return new Response(JSON.stringify(res), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response("Search failed with " + error, { status: 400 });

    }
}
