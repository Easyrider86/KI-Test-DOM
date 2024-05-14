import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Setting, SettingService } from '../../service/SettingsService';
import { ChatGPT_API_KEY } from '../../constants/ConfigConstants';

@Component({
  selector: 'settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  apiKey: string = "";

  constructor(private settingService: SettingService, private router: Router) {
    this.loadSettings();
  }

  loadSettings(): void {
    this.apiKey = this.settingService.loadSetting(ChatGPT_API_KEY);

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
    this.settingService.saveSettings(settings);

    // Hier würde der Code zum Speichern der Datei stehen, wenn es sich um eine Desktop-Anwendung handeln würde
    this.router.navigate(['']); // Navigiere zurück zur Hauptseite nach dem Speichern
  }

  cancel(): void {
    this.router.navigate(['']); // Navigiere zurück zur Hauptseite
  }
}