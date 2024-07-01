import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { StoreModule } from '@ngrx/store';
// import { ThreadConfigService } from './config/ThreadConfigService';
// import { FileSaverModule } from 'ngx-filesaver';

// export function initConfig(appConfig: ThreadConfigService) {
//  return () => appConfig.load();
// }

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
    FormsModule,
    MatCardModule,
    ListboxModule,
    ButtonModule,
    SidebarModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ProgressSpinnerModule,
    IconFieldModule,
    InputIconModule,
    StoreModule.forRoot({}, {})
    //FileSaverModule
  ],
  providers: [
    //ThreadConfigService,
    //{ provide: APP_INITIALIZER, useFactory: initConfig, deps: [ThreadConfigService], multi: true },
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
