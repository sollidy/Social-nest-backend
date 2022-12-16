import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';
import { getCloudinaryUploadOptions } from '../configs/cloudinary.config';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    id: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const fileName = `so-${id}`;
      const upload = v2.uploader.upload_stream(
        getCloudinaryUploadOptions(fileName),
        (err, res) => {
          if (err) return reject(err);
          if (!res) return reject('Upload image error');
          resolve(res);
        },
      );
      this.bufferToStream(file.buffer).pipe(upload);
    });
  }

  bufferToStream(buffer: Buffer) {
    const readable = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });
    return readable;
  }
}
