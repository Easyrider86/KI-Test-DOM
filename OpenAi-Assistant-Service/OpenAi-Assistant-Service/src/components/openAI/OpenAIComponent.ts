import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseSettingComponent } from '../base/BaseSettingsComponent';
import { Setting } from '../../constants/IAIConfiguration';
import { ChatGPT_API_KEY } from '../../constants/ConfigConstants';

@Component({
  selector: 'openai-component',
  templateUrl: './OpenAIComponent.html',
  styleUrls: ['./OpenAIComponent.css']
})
export class OpenAIComponent extends BaseSettingComponent {

  apiKey: string = "";

  constructor(public override router: Router) {
    super(router);
  }

  /**
   * Get the api key.
   * 
   * @returns Returns the value of the setting as a list.
   */
  override getSettings(): Setting[] {
    return [new Setting(ChatGPT_API_KEY, this.apiKey)];
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
        return;
      }
    });
  }

}