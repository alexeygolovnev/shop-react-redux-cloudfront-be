import type  { AWS } from '@serverless/typescript'; 

type Resources = AWS['resources'];

const resource1: Resources = { Resources: {} }; 

export type Resource = typeof resource1['Resources'];
