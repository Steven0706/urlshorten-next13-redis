import client from "@/utils/redisClient"

interface SearchQuery {
    searchQuery: string;
}

interface Document {
    id: string;
    value: {
        longUrl: string;
        title: string;
        [x: string]: string | number | boolean | null | undefined;
    };
}

interface Res {
    documents: Document[];
}

export const POST = async (request: Request) => {
    const { searchQuery } = await request.json() as SearchQuery;
    console.log({ searchQuery })
    try {
        // @ts-ignore
        const res = await client.ft.search('urlIdx', searchQuery) as Res;
        console.log(res)
        const output = res.documents.map(doc => ({
            shortUrl: doc.id.split(':')[1],
            longUrl: doc.value.longUrl,
            title: doc.value.title
        }));
        return new Response(JSON.stringify(output), { status: 200 });

    } catch (error: any) {
        console.log(error)
        return new Response("Search failed with " + error, { status: 400 });

    }
}
