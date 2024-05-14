import { IRun } from './IRun.js'
import { ASSISTENT_ID } from '../constants/OpenAIConfiguration.js';

export class Run implements IRun {
    public async startRun(openAIInstance: any, thread_id: number, message: string) : Promise<String> {
        // Create message
        const threadMessages = await openAIInstance.beta.threads.messages.create(
            thread_id,
            { 
                role: "user",
                content: message
            }
        );
    
        // Create run
        let run = await openAIInstance.beta.threads.runs.create(
            thread_id,
            { assistant_id: ASSISTENT_ID }
        );
    
        // Get run when completed
        while(run.status != "completed") {
            await this.sleep(500);
            run = await openAIInstance.beta.threads.runs.retrieve(thread_id, run.id);
        }
    
        const messages = openAIInstance.beta.threads.messagees.list(thread_id);
        const new_message = messages.data[0].content[0].text.value;
        console.log("Genearte message:" + new_message);
        return new_message;
    }
    
    private sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}