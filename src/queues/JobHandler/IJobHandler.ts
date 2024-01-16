interface JobHandler {
    handleJob(data : any): Promise<any>;
}

export default JobHandler;