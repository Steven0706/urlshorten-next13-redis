import * as redis from 'redis';

import { SchemaFieldTypes } from 'redis';

const redisUrl = 'redis://localhost:6379';
const client = redis.createClient({ url: redisUrl });

client.on('connect', () => {
    console.log('Redis connected');
});

client.on('error', (err: Error) => {
    console.log('Redis error:', err);
});

client.connect();

client.ft.create('urlIdx', { title: SchemaFieldTypes.TEXT, longUrl: SchemaFieldTypes.TEXT }, { ON: 'HASH', PREFIX: 'shortUrl' })
    .then((result: string) => {
        console.log(result);
    })
    .catch((error: Error) => {
        console.log(error);
    });

export default client;
