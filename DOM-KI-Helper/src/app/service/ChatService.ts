import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChatGPT_3_5_Turbo } from '../constants/ServerConstants';
import { ChatCompletion } from '../server/ChatCompletion';
import { SettingService } from './SettingsService';
import { ChatGPT_API_KEY } from '../constants/ConfigConstants';

@Injectable({
    providedIn: 'root'
  })
  export class ChatService {
  
    apiKey = "";

    constructor(private http: HttpClient, private settingService: SettingService) { 
      console.log("Loading apiKey from settings...");
      this.apiKey = this.settingService.loadSetting(ChatGPT_API_KEY);
      console.log("apiKey: " + this.apiKey);
    }
  
    sendMessage(message: string): Observable<ChatCompletion> {

      console.log("Sending following text to gpt: " + message);

      if(this.apiKey == "") {
        this.apiKey = this.settingService.loadSetting(ChatGPT_API_KEY);
      }

      if(this.apiKey == "") {
        console.error("Konnte den API-Key nicht lesen, Funktion wird abgebrochen!");
        return undefined;
      }

      const headers = {
        'Authorization': `Bearer ` + this.apiKey,
        'Content-Type': 'application/json'
      };
      const body = {
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message }],
        max_tokens: 2048,
        temperature: 0.5
      };
  
      return this.http.post(ChatGPT_3_5_Turbo, body, { headers }).pipe(
        map(response => new ChatCompletion(response)),
        catchError(this.handleError)
      );
    }
  
    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Ein unbekannter Fehler ist aufgetreten.';
      if (error.error instanceof ErrorEvent) {
        // Client-seitige oder Netzwerkfehler
        errorMessage = `Ein Fehler ist aufgetreten: ${error.error.message}`;
      } else {
        // Der Backend hat einen erfolglosen Response-Code zurückgeliefert
        errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }
  }