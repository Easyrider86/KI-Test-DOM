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
    deleteDialog: boolean = false;
    deleteDialogInfo: ThreadInfo;
    deleteDialogName: string;

    public showDialog() {
        this.visible = true;
    }

    public showDeleteDialog(deletThread) {
        this.deleteDialogInfo = deletThread;
        this.deleteDialogName = deletThread.name;
        this.deleteDialog = true;
    }

    constructor(private runService: RunService, private threadService: ThreadService, private threadListService: ThreadListService) {
        // TODO: Do it better (DB?)
        this.threads = threadListService.loadThreads();
    }

    /**
     * Create thread.
     */
    public async createThread(): Promise<any> {
        this.loading = true;
        this.visible = false;
        const thread_id = await this.threadService.createThread();
        await this.threads.push({id: thread_id, name: this.threadNameInput});
        console.debug('Created thread: ', thread_id);
        this.threadListService.saveThreads(this.threads);
        this.loading = false;
        return thread_id;
    }

    public async deleteThread() {
        this.loading = true;
        this.deleteDialog = false;
        await this.threadService.deleteThread(this.deleteDialogInfo.id).then((response) => {
            console.debug('Thread Deleted', response);
            if(response) {
                const index = this.threads.indexOf(this.deleteDialogInfo, 0);
                if (index > -1) {
                    this.threads.splice(index, 1);
                    this.threadListService.saveThreads(this.threads);
                }
            }
            else {
                console.debug('Couild not delete Thread: ', this.deleteDialogName);
            }
        }).catch((e) => {
            console.debug('Couild not delete Thread: ', e);
        });
        this.deleteDialogInfo = undefined;
        this.deleteDialogName = '';
        this.loading = false;
    }

    // RUN

    public async startRun(message: string) : Promise<string> {
        return this.runService.startRun(this.selectedThread.id, message);
    } 

    public async changeThreadMessages() {
        this.changeThread.emit(await this.runService.getThreadMessages(this.selectedThread.id));
    }

    public isThreadSelected() {
        return this.selectedThread != undefined;
    }
}