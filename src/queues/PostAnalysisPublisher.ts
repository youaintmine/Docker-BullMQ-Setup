import { Queue } from "bullmq";

class PostAnalysisPublisher {
    async publishJob(queueName: string, data: any): Promise<void> {
        const queue = new Queue(queueName);
        await queue.add('Analyze Post', data);
    }
}

export default PostAnalysisPublisher;