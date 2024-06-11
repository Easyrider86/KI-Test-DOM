import { Injectable } from "@angular/core";

export class ThreadInfo {
    id: string = "";
    name: string = "";

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

@Injectable({
    providedIn: 'root'
})
export class ThreadListService {
    /**
     * Private constructor
     */
    constructor() { }

    /**
     * Stores threads array in the local storage.
     * @param threads The list of settings to be saved.
     */
    saveThreads(threads: ThreadInfo[]) {
        localStorage.setItem("threads", JSON.stringify(threads));
    }

    /**
     * Loads the list of threads from local storage.
     * 
     * @returns Returns the list of threads as array.
     */
    loadThreads(): ThreadInfo[] {

        let value: ThreadInfo[] = JSON.parse(localStorage.getItem('threads'));

        if (value) {
            return value;
        }
        else {
            console.debug("Die Thread Liste existiert nicht.");
            return [];
        }
    }
}