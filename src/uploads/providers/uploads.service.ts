import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  public async uploadFile(file: Express.Multer.File) {
    // upload the file to AWS S3
    // Generate a new entry in the DB
  }
}
