import { IAIConfiguration, Setting } from "./IAIConfiguration";

export const ChatGPT_3_5_Turbo_DEFAULT = 'https://api.openai.com/v1/chat/completions';
export const ChatGPT_3_5_Turbo_DEFAULT_KEY = 'ChatGPT_3_5_Turbo_URL';
export const ASSISTANT_URL = 'https://api.openai.com/v1/assistants';
export const ASSISTANT_URL_KEY = 'ASSISTANT_URL';
export const ChatGPT_API_KEY = 'CHATGPT_API_KEY';
export const ASSISTENT_ID = 0;

export class OpenAIConfiguration implements IAIConfiguration {
    settings: Setting[] = [];

    private OpenAIConfiguration() {
        this.settings.push(new Setting(ChatGPT_API_KEY, ''));
        this.settings.push(new Setting(ChatGPT_3_5_Turbo_DEFAULT_KEY, ChatGPT_3_5_Turbo_DEFAULT));
        this.settings.push(new Setting(ASSISTANT_URL_KEY, ASSISTANT_URL_KEY));
    }
}