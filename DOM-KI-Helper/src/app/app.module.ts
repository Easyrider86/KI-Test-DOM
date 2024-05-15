import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { SettingsComponent } from './components/settings/settings.component'; 
import { ChatComponent } from './components/chat/chat.component';
import { ChatConsoleComponent } from './components/chat-console/chat-console.component';
import { ChatThreadsComponent } from './components/chat-threads/chat-threads.component';
import { HomePageComponent } from './home-page/home-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { OpenAIModule } from 'open-ai-assistant-service/src/components/openAI/openai.module';

@NgModule({
  declarations: [
    HomePageComponent,
    ChatComponent,
    ChatConsoleComponent,
    ChatThreadsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HighlightModule,
    OpenAIModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          html: () => import('highlight.js/lib/languages/xml')
          // Füge weitere Sprachen hinzu, die du benötigst
        }
      }
    },
    provideAnimationsAsync()
  ],
  bootstrap: [HomePageComponent]
})
export class AppModule { }
