import { IInitializeKISystem } from "./IInitializeKISystem";
import { IAIConfiguration } from "../constants/IAIConfiguration";
const { Configuration, OpenAIApi } = require("openai");

export class InitializeKISystem implements IInitializeKISystem {
    public async createAIInstance(config: IAIConfiguration) : Promise<any> {
        const conf = await new Configuration({
          apiKey: config.settings[0].value,
        });
        return await new OpenAIApi(conf);
      };
}
