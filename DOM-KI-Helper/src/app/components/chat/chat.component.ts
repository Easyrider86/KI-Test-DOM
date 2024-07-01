import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild(ChatConsoleComponent) chatConsoleComponente: ChatConsoleComponent;
  @ViewChild(ChatThreadsComponent) chatThreadsComponent: ChatThreadsComponent;

  isLoading: boolean = false;
  chatContent: string = '';
  inputText: string = '';
  // Datenempfang von Settings.component um die Sidebar zu verstecken
  isSidebarVisible: boolean;
  placeholder: string = 'Bitte wähle einen Thread oder erstelle einen neuen.';
  isSendEnabled: boolean = false;


  ngAfterViewInit() {
    console.log("TSRFD");
    // Any initialization that may cause change detection issues should be done here
    this.placeholder = 'Schreibe eine Nachricht';

    // Manually trigger change detection after initializing the values
    this.cdRef.detectChanges();
  }


  // Method to update the inputText which might change the isSendEnabled flag
  public updateInputText(text: string) {
    this.inputText = text;
  }

  constructor(private chatService: ChatService, private settingService: SettingService, private sharedService: SharedService, private cdRef: ChangeDetectorRef) {
    if (this.isThreadSelected) {
      this.isSidebarVisible = true;
    }
  }

  ngOnInit(): void {
    //Subscribes to the boolean$ observable in the ngOnInit method. This ensures the component updates whenever the boolean value changes.
    this.sharedService.currentBoolean.subscribe(value => this.isSidebarVisible = value);
  }

  public isThreadSelected() {
    if (this.chatThreadsComponent) {
      return this.chatThreadsComponent.isThreadSelected();
    }
    return false;
  }

  public isSendEnabeld() {
    const isApiKey = this.settingService.loadSetting(ChatGPT_API_KEY) != undefined || this.settingService.loadSetting(ChatGPT_API_KEY) != '';
    const isAssistantId = this.settingService.loadSetting(ASSISTANT_ID_KEY) != undefined || this.settingService.loadSetting(ASSISTANT_ID_KEY) != '';
    return (this.isThreadSelected() && isApiKey && isAssistantId);
  }

  public changeThread(messages: Array<any>) {
    this.isLoading = true;
    this.clearInput();
    this.chatConsoleComponente.clearChat();
    console.log('GET FROM CHILD', messages);
    this.chatConsoleComponente.updateAllChat(messages);
    this.isLoading = false;
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  public sendMessage(): void {
    this.isLoading = true
    this.chatThreadsComponent.startRun(this.inputText).then((message) => {
      this.chatConsoleComponente.updateChat("Chat-GPT", message);
      this.isLoading = false;
    });

    this.clearInput();
  }

  public cancelRun(): void {
    this.chatThreadsComponent.cancelRun();
  }

  public clearInput(): void {
    if (this.inputText.trim()) {
      this.chatConsoleComponente.updateChat("User", this.inputText)
      this.inputText = ''; // Clear the field after sending
    }
  }
}