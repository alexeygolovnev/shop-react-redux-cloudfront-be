import { ServerlessFunction } from '@Types';
import { handlerPath } from '@Utils';

export default {
  handler: `${handlerPath(__dirname)}/handler.runSeeds`,
} as ServerlessFunction;
