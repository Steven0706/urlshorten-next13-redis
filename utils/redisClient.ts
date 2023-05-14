import redis, { SchemaFieldTypes } from 'redis';

const client = redis.createClient(
    { url: 'redis://localhost:6379' }
);

client.on('connect', () => {
    console.log('Redis connected');
});

client.on('error', (err) => {
    console.log('Redis error:', err);
});

client.connect()


client.ft.create('urlIdx', { title: SchemaFieldTypes.TEXT, longUrl: SchemaFieldTypes.TEXT }, { ON: 'HASH', PREFIX: 'shortUrl' }).then((result) => {
    console.log(result);
})
    .catch((error) => {
        console.log(error);
    });



export default client;
