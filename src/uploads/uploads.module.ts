import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { UploadToAwsProviderProvider } from './providers/upload-to-aws-provider.provider';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsProviderProvider]
})
export class UploadsModule {}
