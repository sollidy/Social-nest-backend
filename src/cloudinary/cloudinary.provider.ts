import { ConfigService } from '@nestjs/config';
import { getCloudinaryConfig } from '../configs/cloudinary.config';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  inject: [ConfigService],
  useFactory: getCloudinaryConfig,
};
