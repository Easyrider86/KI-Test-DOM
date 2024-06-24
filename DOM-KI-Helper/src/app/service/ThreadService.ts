import { Injectable } from "@angular/core";
import { SettingService } from "./SettingsService";
import { ChatGPT_API_KEY } from "../constants/ConfigConstants";
import OpenAI from "openai";

@Injectable({
    providedIn: 'root'
})
export class ThreadService {

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
     * Create thread.
     */
    public async createThread(): Promise<any> {
        console.debug('Create thread.');
        this.openai.apiKey = this.settingService.loadSetting(ChatGPT_API_KEY);
        const emptyThread = await this.openai.beta.threads.create().then((result: any) => {
            console.debug("THREAD ID: ", result.id);
            return result.id;
        });

        return emptyThread;
    }

    /**
     * Get thread by id.
     * 
     * @param thread_id 
     */
    public async getThread(thread_id: string) : Promise<any> {
        console.debug('Get thread.');
        await this.openai.beta.threads.retrieve(thread_id).then((result: any) => {
            return result;
        });
    }

    /**
     * Delete thread by id.
     * 
     * @param thread_id 
     * @returns 
     */
    public async deleteThread(thread_id: string) : Promise<boolean> {
        console.debug('Delete thread.');
        const response = await this.openai.beta.threads.del(thread_id);
        return response.deleted;
    }
}