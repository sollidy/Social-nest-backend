import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { IdValidationErrorDto } from '../dto/user-errors.dto';

export const ApiIdErrorResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      type: IdValidationErrorDto,
    }),
  );
};
