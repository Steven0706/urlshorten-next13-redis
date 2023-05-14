import client from "@/utils/redisClient"

async function getHashes(keys: string[]) {
    let hashes = [];
    for (let i = 0; i < keys.length; i++) {
        hashes.push(client.hGetAll("shortUrl:" + keys[i]));
    }

    return Promise.all(hashes);
}

export const GET = async (request: Request) => {
    try {
        const rsp = await client.zRange("popular", 0, 20, {
            REV: true,
        });

        // Using await instead of .then() and .catch()
        try {
            const data = await getHashes(rsp);
            const combinedData = data.map((item, index) => {
                return { ...item, shortUrl: rsp[index] };
            });

            return new Response(JSON.stringify(combinedData), { status: 200 });
        } catch (err) {
            console.log({ err });
            // If getHashes() fails, return a 500 response
            return new Response("Internal Server Error " + err, { status: 500 });
        }
    } catch (error) {
        return new Response("Internal Server Error " + error, { status: 500 });
    }
}
