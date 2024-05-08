import { IInitializeKISystem } from "./IInitializeKISystem";
const { Configuration, OpenAIApi } = require("openai");

export class InitializeKISystem implements IInitializeKISystem {
    public async createAIInstance(token: String) : Promise<any> {
        const conf = await new Configuration({
          apiKey: token,
        });
        return await new OpenAIApi(conf);
      };
}