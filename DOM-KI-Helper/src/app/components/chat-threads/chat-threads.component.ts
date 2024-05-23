import { Component, EventEmitter, Output } from '@angular/core';
import { RunService } from '../../service/RunService';
import { ThreadService } from '../../service/ThreadService';

interface Thread {
    id: string,
    name: string
}

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent {

    @Output() changeThread = new EventEmitter<string>();

    threads: Thread[];
    selectedThread: Thread;
    threadNameInput: string | undefined;

    loading: boolean = false;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    constructor(private runService: RunService, private threadService: ThreadService) {
        this.threads = [
            { id: 'thread_livlJtNHAnUbT2CIhmo2alCt', name: 'TestThread1' },
            { id: 'thread_LIn2heYoN4APMiU3uBvm1D81', name: 'TestThread2' },
            { id: 'thread_CHkBPDt31IhMVp37ttgVBgAQ', name: 'TestThread3' }
        ];
    }

    /**
     * Create thread.
     */
    public async createThread(): Promise<any> {
        const thread_id = await this.threadService.createThread();
        await this.threads.push({id: thread_id, name: this.threadNameInput});
        console.debug('Created thread: ', thread_id);
        this.visible = false
        return thread_id;
    }

    // RUN

    public async startRun(message: string) : Promise<string> {
        return this.runService.startRun(this.selectedThread.id, message);
    }

    public async changeThreadMessages() {
        this.changeThread.emit(await this.runService.getThreadMessages(this.selectedThread.id));
    }
}