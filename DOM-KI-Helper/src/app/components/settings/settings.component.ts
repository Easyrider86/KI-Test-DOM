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

  constructor(private settingService: SettingService, private router: Router, private assistantService: AssistantService) {
    this.loadSettings();
  }

  async loadSettings(): Promise<void> {
    this.apiKey = this.settingService.loadSetting(ChatGPT_API_KEY);
    this.assistant_id = this.settingService.loadSetting(ASSISTANT_ID_KEY);
    this.assistants = await this.assistantService.getAllAssistans() as Assistant[];
    if(!this.assistant_id || this.assistant_id === "") {
      this.selectedAssistant = this.assistants[0];
      this.assistant_id = this.selectedAssistant.id;
    }
    else {
      this.selectedAssistant = this.assistants.find(assistant => assistant.id === this.assistant_id);
    }
    
    if (this.apiKey == "") {
      console.warn("Warnung! Es wurde noch kein API-KEY für den Zugriff auf Chat-GPT gesetzt!");
    }
  }

  saveSettings(): void {
    // Simuliere das Speichern von Daten
    console.log('Einstellungen werden gespeichert...');

    // Einstellungen zusammen schreiben
    let settings: Setting[] = [];
    settings.push(new Setting(ChatGPT_API_KEY, this.apiKey));
    settings.push(new Setting(ASSISTANT_ID_KEY, this.selectedAssistant.id));
    this.settingService.saveSettings(settings);

    // Hier würde der Code zum Speichern der Datei stehen, wenn es sich um eine Desktop-Anwendung handeln würde
    this.router.navigate(['']); // Navigiere zurück zur Hauptseite nach dem Speichern
  }

  cancel(): void {
    this.router.navigate(['']); // Navigiere zurück zur Hauptseite
  }
}