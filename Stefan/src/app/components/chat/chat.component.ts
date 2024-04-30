import { Component } from '@angular/core';
import { ChatService } from '../../service/ChatService';
import { ChatCompletion } from '../../server/ChatCompletion';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chatContent: string = '';
  inputText: string = '';

  constructor(private chatService: ChatService) { }


  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      this.sendMessage();
    }
  }

  sendMessage(): void {

    this.chatService.sendMessage(this.inputText).subscribe({
      next: (completion: ChatCompletion) => {
        console.log("Received completion:", completion);
        this.updateChat(completion.choices[0].message.content);
      },
      error: (error) => {
        console.error("Error sending message:", error);
      }
    });

    this.clearInput();
  }

  clearInput(): void {
    if (this.inputText.trim()) {
      this.updateChat(this.inputText);
      this.inputText = ''; // Feld leeren nach dem Senden
    }
  }

  updateChat(message: string): void {
    this.chatContent += (this.chatContent ? '\n' : '') + message;
  }
}