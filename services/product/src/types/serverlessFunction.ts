import { AWS } from '@serverless/typescript';

type ServerlessFunctions = AWS['functions'];

const serverlessFunction: ServerlessFunctions = { function: {} };

export type ServerlessFunction = typeof serverlessFunction['function'];
