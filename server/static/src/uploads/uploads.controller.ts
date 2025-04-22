import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

}
