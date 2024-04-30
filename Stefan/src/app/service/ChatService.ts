import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChatGPT_3_5_Turbo } from '../constants/ServerConstants';
import { ChatCompletion } from '../server/ChatCompletion';

@Injectable({
    providedIn: 'root'
  })
  export class ChatService {
  
    constructor(private http: HttpClient) { }
  
    sendMessage(message: string): Observable<ChatCompletion> {

      console.log("Sending following text to gpt: " + message);

      const headers = {
        'Authorization': `Bearer LOL; STFU`,
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