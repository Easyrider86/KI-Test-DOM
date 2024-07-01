import { Component } from '@angular/core';

@Component({
  selector: 'chat-console',
  templateUrl: './chat-console.component.html',
  styleUrl: './chat-console.component.css'
})
export class ChatConsoleComponent {

  chatContent: string = '';
  isLoading: boolean = false;

  constructor() { }

  public updateChat(sender: string, message: string): void {
    this.chatContent += sender + ": " + message + "\n";
  }

  public updateAllChat(messages: Array<any>) {
    this.isLoading = true;
    for (const message of messages) {
      this.chatContent += message.role + ": " + message.content[0].text.value + "\n";
    }
    this.isLoading = false;
  }

  public clearChat(): void {
    this.chatContent = '';
  }
}