export interface IThreadController {
    createThread(openAIInstance: any) : Promise<any>;
    getThread(openAIInstance: any, thread_id: number) : Promise<any>;
    deleteThread(openAIInstance: any, thread_id: number) : Promise<boolean>;
}