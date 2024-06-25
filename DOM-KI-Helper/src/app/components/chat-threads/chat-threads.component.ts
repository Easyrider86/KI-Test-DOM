import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RunService } from '../../service/RunService';
import { ThreadService } from '../../service/ThreadService';
import { ThreadInfo, ThreadListService } from '../../service/ThreadListService';

@Component({
    selector: 'chat-threads',
    templateUrl: './chat-threads.component.html',
    styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {

    // Event for parent component
    @Output() changeThread = new EventEmitter<string>();

    threads: ThreadInfo[];
    selectedThread: ThreadInfo;
    threadNameInput: string | undefined;

    loading: boolean = false;

    visible: boolean = false;
    deleteDialog: boolean = false;
    deleteDialogInfo: ThreadInfo;
    editDialogInfo: ThreadInfo;
    editDialogId: string;
    deleteDialogName: string;
    isEditDialogVisible: boolean = false;

   async ngOnInit() {
        try {
            await this.changeThreadMessages(); 
        } catch {
            console.error("No Thread is selected")
        } 
    }

    public showDialog() {
        this.visible = true;
    }

    public showDeleteDialog(deletThread) {
        this.deleteDialogInfo = deletThread;
        this.deleteDialogName = deletThread.name;
        this.deleteDialog = true;
    }

    public showEditDialog(editThread) {
        this.deleteDialogInfo = editThread;
        this.editDialogId = editThread.id;
        this.isEditDialogVisible = true;
    }

    constructor(private runService: RunService, private threadService: ThreadService, private threadListService: ThreadListService) {
        // TODO: Do it better (DB?)
        this.threads = threadListService.loadThreads();
        this.selectedThread  = this.threadListService.loadSelectedThread()[0];
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
        await this.threadService.deleteThread(this.deleteDialogInfo?.id).then((response) => {
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

    public async editThread() {
        this.loading = true;
        this.isEditDialogVisible = false;
        let editedThread: ThreadInfo = this.threads.find(thread => thread.id === this.editDialogId);
        editedThread.name = this.threadNameInput;
       let newThread: ThreadInfo[] = [editedThread]
        const updatedThreadsList = this.threads.map((thread) => {
            if (thread.id=== this.editDialogId) {
              return { ...thread, name: editedThread.name }; // Replace edition with a new value
            }
            return thread;
          });

        this.threadListService.saveThreads(updatedThreadsList);
        this.threadListService.saveSelectedThread(newThread)
    
        this.loading = false;
    }

    // RUN

    public async startRun(message: string) : Promise<string> {
        return this.runService.startRun(this.selectedThread?.id, message);
    }
    
    public async cancelRun() {
        return this.runService.cancelRun();
    } 

    public async changeThreadMessages() {
        let selectedThread: ThreadInfo[] = [];
        if(this.selectedThread) {
            const thread_id: string = this.threads.find(thread => thread?.id === this.selectedThread?.id)?.id;
            const thread_name: string = this.threads.find(thread => thread?.id === this.selectedThread?.id)?.name;
            await selectedThread.push({id: thread_id, name: thread_name})
            this.threadListService.saveSelectedThread(selectedThread);
            this.changeThread.emit(await this.runService.getThreadMessages(this.selectedThread?.id));
        }
        else {
            this.changeThread.emit("");
        }
    }

    public isThreadSelected() {
        return this.selectedThread != undefined;
    }

 
}