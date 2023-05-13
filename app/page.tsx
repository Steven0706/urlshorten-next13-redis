import client from './redis';

export default async function Home() {

  const value = await client.hGetAll('your_key')
  const value2 = await client.hGetAll('your_key')
  return (
    <>
      <p className="text-lg py-10">Home</p>
      <h2>{value.gg}</h2>
      <h2>{value.rr}</h2>
    </>
  )
}
