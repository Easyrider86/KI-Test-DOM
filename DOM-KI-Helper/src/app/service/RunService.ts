import { Injectable } from "@angular/core";
import OpenAI from "openai";
import { ASSISTANT_ID_KEY, ChatGPT_API_KEY } from "../constants/ConfigConstants";
import { SettingService } from "./SettingsService";

@Injectable({
    providedIn: 'root'
})
export class RunService {

    apiKey;
    openai;

    constructor(private settingService: SettingService) {
        this.apiKey = this.settingService.loadSetting(ChatGPT_API_KEY);
        this.createAIInstance(this.apiKey);
    }

    private async createAIInstance(apiKey: string) {
        const key = this.settingService.loadSetting(ChatGPT_API_KEY);
        this.openai = await new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});
    };

    /**
     * Get the last messages of a thread by a limit (1 to 100).
     * 
     * @param threadId 
     * @returns messages of a thread
     */
    public async getThreadMessages(threadId: string) : Promise<any> {

        const messages = await this.openai.beta.threads.messages.list(
            threadId,
            {limit: 80}
        );

        return messages.data.reverse();
    }

    /**
     * Send a message to the assisetent and do a run.
     * 
     * @param thread_id id of the thread
     * @param message message to send
     * @returns result messsage of the server
     */
    public async startRun(thread_id: string, message: string) : Promise<string> {
        // Create message
        console.debug('Create message');
        const threadMessages = await this.openai.beta.threads.messages.create(
            thread_id,
            { 
                role: "user",
                content: message
            }
        );
    
        // Create run
        console.debug('Create run');
        let run = await this.openai.beta.threads.runs.create(
            thread_id,
            { 
                assistant_id: this.settingService.loadSetting(ASSISTANT_ID_KEY)
            }
        );
    
        // Get run when completed
        // TODO: Search for a better solution or wait for openai update.
        while(run.status != 'completed') {
            await this.sleep(500);
            run = await this.openai.beta.threads.runs.retrieve(thread_id, run.id);
        }

        if (run.status === 'completed') {
            const messages = await this.openai.beta.threads.messages.list(
              run.thread_id
            );
            return messages.data[0].content[0].text.value;
          } else {
            console.debug(run.status);
            return 'No answer';
          }
    }
    
    private sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}