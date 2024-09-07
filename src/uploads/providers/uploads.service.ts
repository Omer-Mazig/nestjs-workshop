import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProviderProvider } from './upload-to-aws-provider.provider';
import { ConfigService } from '@nestjs/config';
import { IUploadFile } from '../interfaces/upload-file.interface';
import { FileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * Injecting UploadRepository
     */
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,

    /**
     * Injecting UploadToAwsProviderProvider
     */
    private readonly uploadToAwsProviderProvider: UploadToAwsProviderProvider,

    /**
     * Injecting ConfigService
     */
    private readonly configService: ConfigService,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    // Throw error for any unsupported MIME types
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Mime type not supported');
    }

    try {
      // upload the file to AWS S3
      const name = await this.uploadToAwsProviderProvider.fileUpload(file);

      // Generate a new entry in the DB
      const fileToUpload: IUploadFile = {
        name,
        path: `https://${this.configService.get('appConfig.awsCloudfrontUrl')}/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadRepository.create(fileToUpload);
      return await this.uploadRepository.save(upload);
    } catch (error) {
      console.log('ConflictException', error);
      throw new ConflictException(error);
    }
  }
}
