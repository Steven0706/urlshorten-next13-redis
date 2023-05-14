import client from "@/utils/redisClient"

export const POST = async (request) => {
    const { searchQuery } = await request.json();
    console.log({ searchQuery })
    try {
        const res = await client.ft.search('urlIdx', searchQuery)
        console.log(res)
        const output = res.documents.map(doc => ({
            shortUrl: doc.id.split(':')[1],
            longUrl: doc.value.longUrl,
            title: doc.value.title
        }));
        return new Response(JSON.stringify(output), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response("Search failed with " + error, { status: 400 });

    }
}
