import { Component } from '@angular/core';
import { IInitializeKISystem } from 'open-ai-assistant-service/src/init/IInitializeKISystem';
import { Setting } from 'open-ai-assistant-service/src/constants/IAIConfiguration';

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent {
    constructor() {
        let settings  = [];

        settings.push('apiKey', 'test');
    }
}