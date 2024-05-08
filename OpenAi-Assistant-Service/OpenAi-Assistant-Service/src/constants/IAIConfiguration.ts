export interface IAIConfiguration {
    settings : Array<Setting>;
}

export class Setting {
    key: string = "";
    value: string = "";

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}