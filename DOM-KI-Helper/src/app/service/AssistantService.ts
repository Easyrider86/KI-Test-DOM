import { Injectable } from "@angular/core";
import { ChatGPT_API_KEY } from "../constants/ConfigConstants";
import { SettingService } from "./SettingsService";
import OpenAI from "openai";

export class Assistant {
    id: string = "";
    name: string = "";
    instructions: string = "";


    constructor(id: string, name: string, instructions: string) {
        this.id = id;
        this.name = name;
        this.instructions = instructions
    }
}

@Injectable({
    providedIn: 'root'
})
export class AssistantService {
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
     * Create assistant with code interpreter.
     */
    public async createAssistant() {
        // TODO: Create assistant we need.
        const myAssistant = await this.openai.beta.assistants.create({
            instructions:
              "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
            name: "Math Tutor",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-3.5-turbo",
          });
        
          console.debug('Assistent:', myAssistant);
    }

    public async deleteAssistant(assistant_id: string) {
        const response = await this.openai.beta.assistants.del(assistant_id);
  
        console.debug(response);
    }

    public async getAllAssistans(apiKey: string): Promise<object[]> {
        if(this.openai === undefined) {
            await this.createAIInstance(apiKey);
        }
        this.openai.apiKey = apiKey;
        const myAssistants = await this.openai.beta.assistants.list({
            order: "desc",
            limit: "10",
          }).then((response) => {
            return response.data
          });
        return myAssistants;
    }
}