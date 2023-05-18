import { seeds } from './data';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { Cart, CartItem } from '../../cart/models';

dotenv.config();

export async function insertSeeds() {
  let dataSource: DataSource;
  try {
    dataSource = new DataSource({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Cart, CartItem],
      synchronize: true,
      logging: true,
      dropSchema: true,
    });
    await dataSource.initialize();
  } catch (e) {
    Logger.log(`Database connection error, ${e}`);
  }

  try {
    await Promise.all(
      seeds.map((Seed) => {
        const seedInstance = new Seed();

        return seedInstance.run(dataSource);
      }),
    );

    Logger.log('success');
  } catch (error) {
    Logger.log({
      status: 'failed',
      message: 'Seeds inserting error',
      data: error,
    });
  }
}

insertSeeds();
