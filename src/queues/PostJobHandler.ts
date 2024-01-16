import JobHandler from "./JobHandler/IJobHandler";

class PostAnalysisJobHandler implements JobHandler {
    async handleJob(data: any): Promise<any> {
        const { id, name, description } = data;
        
        //Do the computation
        const {totalWords, averageWords} = await this.findMetadata(description);
        console.log(`For the POST total number of words: ${totalWords} and averagewords per line: ${averageWords}`)
    }

    async findMetadata(postDescription: string) : Promise<{totalWords : number, averageWords: number}> {
        const trimmedInput = postDescription.trim();

        const words = trimmedInput.split(/\s+/);
        const wordCount = words.length;

        const totalWords = words.reduce((total, word) => total + word.length, 0);
        const averageWords = wordCount > 0 ? totalWords / wordCount : 0;

        return {totalWords, averageWords };
    }
}

export default PostAnalysisJobHandler;