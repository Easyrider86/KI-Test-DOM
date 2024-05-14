import { Choice } from "./Choice";

export class ChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
  
    constructor(data: any) {
      this.id = data.id;
      this.object = data.object;
      this.created = data.created;
      this.model = data.model;
      this.choices = data.choices.map((choice: any) => new Choice(choice));
    }
  }
  
