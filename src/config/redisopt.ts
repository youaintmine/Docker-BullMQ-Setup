import IORedis from 'ioredis';

const redisConnection = new IORedis({
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as unknown as number,
    password: process.env.REDIS_PASSWORD as string,
});

export default redisConnection;
