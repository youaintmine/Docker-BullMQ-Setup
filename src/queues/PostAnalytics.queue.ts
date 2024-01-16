import { Job, Queue } from "bullmq";
import redisOptions from "../config/redisopt";


class PostAnalyticsQueue {
    private queue : Queue;

    constructor(queueName : string) {
        this.queue = new Queue(queueName);
    }

    async addJob(data : any): Promise<void> {
        await this.queue.add('Analysis Post', data);
        console.log('Job added to queue');
    }
}