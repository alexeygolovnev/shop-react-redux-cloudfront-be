import { insertSeeds } from "@Db";

export const runSeeds = async () => { 
   const result = await insertSeeds();

   return result;
};
