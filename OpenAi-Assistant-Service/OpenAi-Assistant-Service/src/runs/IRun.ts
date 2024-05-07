export interface IRun {
    startRun(openAIInstance: any, thread_id: number, message: String) : Promise<String>
}