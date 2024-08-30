import { Module } from '@nestjs/common';
import { MetaOptionController } from './meta-option.controller';

@Module({
  controllers: [MetaOptionController]
})
export class MetaOptionModule {}
