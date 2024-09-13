import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  // Create connection
  const AppDataSource = await new DataSource({
    type: 'postgres',
    synchronize: config.get('database.synchronize'),
    port: +config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    host: config.get('database.host'),
    database: config.get('database.name'),
  }).initialize();

  // Drop all tables
  await AppDataSource.dropDatabase();

  // Close connection
  await AppDataSource.destroy();
}
