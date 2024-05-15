import { Component } from '@angular/core';
import { BaseSettingComponent } from '../base/base-settings.component';
import { Setting } from '../../constants/IAIConfiguration';
import { ChatGPT_API_KEY, ChatGPT_3_5_Turbo_DEFAULT_KEY, ASSISTANT_URL_KEY } from '../../constants/OpenAIConfiguration';

@Component({
  selector: 'app-openai-component',
  templateUrl: './openai.component.html',
  styleUrls: ['./openai.component.css']
})
export class OpenAIComponent extends BaseSettingComponent {

  apiKey: string = "";
  chatGPT_3_5_Turbo_url: string = "";
  assistant_url: string = "";

  constructor() {
    super();
  }

  /**
   * Get the api key.
   * 
   * @returns Returns the value of the setting as a list.
   */
  override getSettings(): Setting[] {
    let result = []
    result.push(new Setting(ChatGPT_API_KEY, this.apiKey));
    result.push(new Setting(ChatGPT_3_5_Turbo_DEFAULT_KEY, this.chatGPT_3_5_Turbo_url));
    result.push(new Setting(ASSISTANT_URL_KEY, this.assistant_url));

    return result;
  }

  /**
   * Set the api key.
   * 
   * @param settings The list of settings.
   */
  override setSetting(settings: Setting[]) {
    settings.forEach(element => {
      if(element.key === ChatGPT_API_KEY)  {
        this.apiKey = element.value;
      }
      else if(element.key === ASSISTANT_URL_KEY) {
        this.chatGPT_3_5_Turbo_url = element.value;
      }
      else if(element.key === ChatGPT_3_5_Turbo_DEFAULT_KEY) {
        this.assistant_url = element.value;
      }
    });
  }

}