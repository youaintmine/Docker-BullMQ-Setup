"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisOptions = {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    },
};
exports.default = redisOptions;
