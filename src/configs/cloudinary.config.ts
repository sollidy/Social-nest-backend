import { ConfigService } from '@nestjs/config';
import { v2, ConfigOptions, UploadApiOptions } from 'cloudinary';

export const getCloudinaryConfig = async (
  configService: ConfigService,
): Promise<ConfigOptions> => {
  return v2.config({
    cloud_name: 'm7mark',
    api_key: configService.get('CLOUD_API_KEY'),
    api_secret: configService.get('CLOUD_API_SECRET'),
  });
};

export const getCloudinaryUploadOptions = (
  fileName: string,
): UploadApiOptions => ({
  resource_type: 'image',
  folder: 'SOCNET',
  filename_override: `${fileName}`,
  unique_filename: false,
  use_filename: true,
});
