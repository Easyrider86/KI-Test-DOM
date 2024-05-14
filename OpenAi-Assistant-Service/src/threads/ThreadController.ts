import { IThreadController } from './IThreadController'

export class Assistant_Thread implements IThreadController {
    public async createThread(openAIInstance: any): Promise<any> {
        // Create Thread
        const emptyThread = await openAIInstance.beta.threads.create().then((result: any) => {
            return result.id;
        });
    }

    public async getThread(openAIInstance: any, thread_id: number) : Promise<any> {
        await openAIInstance.beta.threads.retrieve(thread_id).then((result: any) => {
            return result;
        });
    }

    public async deleteThread(openAIInstance: any, thread_id: number) : Promise<boolean> {
        const response = await openAIInstance.beta.threads.del("thread_abc123");
        return response.data.deleted;
    }
}