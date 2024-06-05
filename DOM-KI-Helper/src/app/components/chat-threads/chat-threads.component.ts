import { Component, EventEmitter, Output } from '@angular/core';
import { RunService } from '../../service/RunService';
import { ThreadService } from '../../service/ThreadService';
import { ThreadInfo, ThreadListService } from '../../service/ThreadListService';

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent {

    // Event for parent component
    @Output() changeThread = new EventEmitter<string>();

    threads: ThreadInfo[];
    selectedThread: ThreadInfo;
    threadNameInput: string | undefined;

    loading: boolean = false;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    constructor(private runService: RunService, private threadService: ThreadService, private threadListService: ThreadListService) {
        // TODO: Do it better (DB?)
        this.threads = threadListService.loadThreads();
    }

    /**
     * Create thread.
     */
    public async createThread(): Promise<any> {
        const thread_id = await this.threadService.createThread();
        await this.threads.push({id: thread_id, name: this.threadNameInput});
        console.debug('Created thread: ', thread_id);
        this.threadListService.saveThreads(this.threads);
        this.visible = false;
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