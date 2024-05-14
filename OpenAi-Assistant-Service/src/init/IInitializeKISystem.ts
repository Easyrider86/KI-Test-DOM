import { IAIConfiguration } from "../constants/IAIConfiguration";

export interface IInitializeKISystem {
    createAIInstance(token: IAIConfiguration) : Promise<any>
}