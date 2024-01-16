import { Worker } from "bullmq";
import JobHandler from "./JobHandler/IJobHandler";

export class JobConsumer {
    private jobJandler : JobHandler;

    constructor(queueName : string, jobHandler : JobHandler) {
        this.jobJandler = jobHandler;

        const worker = new Worker(queueName, async (job) => {
            try{
                await this.jobJandler.handleJob(job.data);
            }catch(error){
                throw new Error('Job processing failed');
            }
        });

    }
}