export interface IThreadController {
    createThread(openAIInstance: any) : Promise<any>;
    getThreads(openAIInstance: any, thread_id: number) : Promise<any>;
    deleteThread(openAIInstance: any, thread_id: number) : Promise<boolean>;
}