import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

export const getFileValidateConfig = () => ({
  validators: [
    new MaxFileSizeValidator({ maxSize: 10000000 }),
    new FileTypeValidator({
      fileType: new RegExp('(.*?).(jpg|png|jpeg)$'),
    }),
  ],
});
