// import client from '../../redis';

// async function getLongUrl(shortUrl: string) {
//     const value = await client.hGetAll("your_key");
//     return value;
// }


export default async function longUrlPage({ params }: any) {
    // const value = await getLongUrl("params.key");
    return (
        <div>
            <h1>your long URL is:</h1>
            {/* <h2>{value.gg}</h2> */}
        </div>
    )
}