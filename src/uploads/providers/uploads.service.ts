import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class UploadsService {
  public async uploadFile(file: Express.Multer.File) {
    // puplaod the file to S3
    // Generate a new entry in the DB
  }
}
