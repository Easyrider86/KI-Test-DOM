import { Message } from "./Message";

export class Choice {
    message: Message;
    index: number;
    logprobs: any;  // oder spezifischere Typisierung, falls bekannt
    finish_reason: string;
  
    constructor(data: any) {
      this.message = data.message;
      this.index = data.index;
      this.logprobs = data.logprobs;
      this.finish_reason = data.finish_reason;
    }
  }