import { Component, ViewChild, OnInit } from '@angular/core';
import { ChatService } from '../../service/ChatService';
import { ChatCompletion } from '../../server/ChatCompletion';
import { ChatConsoleComponent } from '../chat-console/chat-console.component';
import { ChatThreadsComponent } from '../chat-threads/chat-threads.component';
import { SettingService } from '../../service/SettingsService';
import { ASSISTANT_ID_KEY, ChatGPT_API_KEY } from '../../constants/ConfigConstants';
import { SharedService } from '../../service/SharedService';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {

  @ViewChild(ChatConsoleComponent)chatConsoleComponente: ChatConsoleComponent;
  @ViewChild(ChatThreadsComponent)chatThreadsComponent: ChatThreadsComponent;

  isLoading: boolean = false;
  chatContent: string = '';
  inputText: string = '';
  isSidebarVisible: boolean;

  constructor(private chatService: ChatService, private settingService: SettingService, private sharedService: SharedService) {
    if(this.isThreadSelected) {
      this.isSidebarVisible = true;
    }
  }
  
  // receive the data from the settings.component to hide the Sidebar
  ngOnInit() {
    this.sharedService.data$.subscribe(data => {
      this.isSidebarVisible = data;
    });
  }

  isThreadSelected() {
    if(this.chatThreadsComponent) {
      return this.chatThreadsComponent.isThreadSelected();
    }
    return false;
  }

  isSendEnabeld() {
    const isApiKey = this.settingService.loadSetting(ChatGPT_API_KEY) != undefined || this.settingService.loadSetting(ChatGPT_API_KEY) != '';
    const isAssistantId = this.settingService.loadSetting(ASSISTANT_ID_KEY) != undefined || this.settingService.loadSetting(ASSISTANT_ID_KEY) != '';
    return (this.isThreadSelected() && isApiKey && isAssistantId);
  }

  changeThread(messages: Array<any>) {
    this.isLoading = true;
    this.clearInput();
    this.chatConsoleComponente.clearChat();

    console.log('GET FROM CHILD', messages);

    for (const message of messages) {
      this.chatConsoleComponente.updateChat(message.role, message.content[0].text.value);
    }

    this.isLoading = false;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      this.sendMessage();
    }
  }

  sendMessage(): void {
    this.isLoading = true;


    this.chatThreadsComponent.startRun(this.inputText).then((message) => {
      this.chatConsoleComponente.updateChat("Chat-GPT", message);
      this.isLoading = false;
    });

    this.clearInput();
  }

  // TODO: Do we still need this?
  sendMessageOld(): void {

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