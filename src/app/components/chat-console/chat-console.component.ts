import { Component } from '@angular/core';

@Component({
  selector: 'chat-console',
  templateUrl: './chat-console.component.html',
  styleUrl: './chat-console.component.css'
})
export class ChatConsoleComponent {
  
  chatContent: string = '';

  constructor() {}

   public updateChat(sender: string, message: string): void {
    this.chatContent += sender + ": " + message + "\n";
  }
}