import { createClient } from 'redis';
import { configDotenv } from 'dotenv';
configDotenv();

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host:  process.env.REDIS_HOST,
        port: 13155
    }
});

client.on('error', err => console.log('Redis Client Error', err));

const connectRedis = async()=>{
    await client.connect().then(()=>console.log("redis connected sucessfully"));
}




export {client,connectRedis};