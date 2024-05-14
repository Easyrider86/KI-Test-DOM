export class Message {
    role: string;
    content: string;
  
    constructor(data: any) {
      this.role = data.role;
      this.content = data.content;
    }
  }