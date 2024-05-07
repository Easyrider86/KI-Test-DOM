import { Component, ViewChild } from '@angular/core';
import { ChatService } from '../../service/ChatService';
import { ChatCompletion } from '../../server/ChatCompletion';
import { ChatConsoleComponent } from '../chat-console/chat-console.component';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @ViewChild(ChatConsoleComponent)chatConsoleComponente: ChatConsoleComponent;

  isLoading: boolean = true;
  chatContent: string = '';
  inputText: string = '';

  constructor(private chatService: ChatService) {

  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      this.sendMessage();
    }
  }

  sendMessage(): void {

    this.isLoading = true;

    this.chatService.sendMessage(this.inputText).subscribe({
      next: (completion: ChatCompletion) => {
        console.log("Received completion:", completion);
        this.chatConsoleComponente.updateChat("Chat-GPT", completion.choices[0].message.content)
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error sending message:", error);
        this.isLoading = false;
      },
      
    });

    this.clearInput();
  }

  clearInput(): void {
    if (this.inputText.trim()) {
      this.chatConsoleComponente.updateChat("User", this.inputText)
      this.inputText = ''; // Feld leeren nach dem Senden
    }
  }

  updateChat(message: string): void {
    this.chatContent += (this.chatContent ? '\n' : '') + message;
  }
}