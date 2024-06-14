import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Setting, SettingService } from '../../service/SettingsService';
import { ChatGPT_API_KEY, ASSISTANT_ID_KEY } from '../../constants/ConfigConstants';
import { Assistant, AssistantService } from '../../service/AssistantService';

@Component({
  selector: 'settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  apiKey: string = "";
  assistant_id: string = "";
  assistants: Assistant[] = [];
  selectedAssistant: Assistant;
  errorText: string = "";
  isDropdwonDisabled: boolean = true;

  constructor(private settingService: SettingService, private router: Router, private assistantService: AssistantService) {
    this.loadSettings();
  }
  

  async loadSettings(): Promise<void> {
    this.apiKey = this.settingService.loadSetting(ChatGPT_API_KEY);
    try {
      this.assistants = await this.assistantService.getAllAssistans(this.apiKey) as Assistant[]
    } catch(error) {
      console.error("401 Incorrect API key provided, please give a validate key");
    }
    this.isDrodropdownDisability();
    this.assistant_id = this.settingService.loadSetting(ASSISTANT_ID_KEY);
    if(!this.assistant_id || this.assistant_id === "") {
      this.selectedAssistant = this.assistants[0];
      this.assistant_id = this.selectedAssistant?.id;
    }
    else {
      this.selectedAssistant = this.assistants.find(assistant => assistant.id === this.assistant_id);
      console.log(this.selectedAssistant)
    }
    
    if (this.apiKey == "") {
      console.warn("Warnung! Es wurde noch kein API-KEY für den Zugriff auf Chat-GPT gesetzt!");
    }
  }

  async saveSettings(): Promise<void> {
    // Simuliere das Speichern von Daten
    console.log('Einstellungen werden gespeichert...');
    let settings: Setting[] = [];

    // Einstellungen zusammen schreiben#
    settings.push(new Setting(ChatGPT_API_KEY, this.apiKey));
    settings.push(new Setting(ASSISTANT_ID_KEY, this.selectedAssistant?.id));

    // Hier würde der Code zum Speichern der Datei stehen, wenn es sich um eine Desktop-Anwendung handeln würde
    this.settingService.saveSettings(settings);
  }

  routerNavigateBack() {
    this.router.navigate(['']); 
  }

  async saveButtonSettings(): Promise<void> {
    await this.saveSettings();
    this.routerNavigateBack(); 
  }

  //Check if the Dropdown disabled
  isDrodropdownDisability(): void {
    this.isDropdwonDisabled = this.assistants.length === 0 ? true : false;
  }

  async validateApiKey(): Promise<void> {
    try {
      this.assistants = await this.assistantService.getAllAssistans(this.apiKey) as Assistant[];
      this.errorText = "";
    } catch (error) {
      this.errorText = "The API key is unauthorized.";
      this.assistants = [];
    }
    this.isDrodropdownDisability();
  
  }

  cancel(): void {
    this.router.navigate(['']); // Navigiere zurück zur Hauptseite
  }
}