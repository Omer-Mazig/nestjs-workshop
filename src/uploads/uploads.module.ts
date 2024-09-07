import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { UploadToAwsProviderProvider } from './providers/upload-to-aws-provider.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsProviderProvider],
  imports: [TypeOrmModule.forFeature([Upload])],
})
export class UploadsModule {}
