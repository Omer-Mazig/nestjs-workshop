import { Module } from '@nestjs/common';
import { MetaOptionController } from './meta-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';

@Module({
  controllers: [MetaOptionController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptionModule {}
