import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
const shortid = require('shortid')

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const randomName = `${shortid.generate()}_${Date.now()}`
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  ))
  uploadFile(@UploadedFile() file) {
    return file;
  }

}
