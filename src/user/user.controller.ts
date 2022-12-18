import {
  Controller,
  Delete,
  HttpCode,
  Param,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserIdRolesDto } from '../auth/dto/userIdRoles.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserIdRoles } from '../decorators/user.decorator';
import { getFileValidateConfig } from '../pipes/file.validation.config';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { FileUploadDto } from './dto/file-upload.dto';
import { UpdatePartialProfileDto } from './dto/update-profile.dto';
import { UPLOAD_ERROR } from './user.constants';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('profile/:id')
  async getProfile(@Param('id', IdValidationPipe) id: string) {
    const profile = await this.userService.getOne(id);
    return this.userService.checkIsNotEmpty(profile);
  }

  @Patch('profile')
  @UsePipes(new ValidationPipe())
  @Auth()
  @ApiBearerAuth()
  async updateProfile(
    @UserIdRoles() { id }: UserIdRolesDto,
    @Body() dto: UpdatePartialProfileDto,
  ) {
    const updatedProfile = await this.userService.updateProfile(id, dto);
    return this.userService.checkIsNotEmpty(updatedProfile);
  }

  @Post('follow/:followedId')
  @Auth()
  @ApiBearerAuth()
  async follow(
    @Param('followedId', IdValidationPipe) followedId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    const followedIds = await this.userService.follow(id, followedId);
    return this.userService.checkIsNotEmpty(followedIds);
  }

  @Get('follow/:checkId')
  @Auth()
  @ApiBearerAuth()
  async isFollowed(
    @Param('checkId', IdValidationPipe) checkId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    return this.userService.isFollowed(id, checkId);
  }

  @Delete('follow/:unfollowedId')
  @Auth()
  @ApiBearerAuth()
  async unfollow(
    @Param('unfollowedId', IdValidationPipe) unfollowedId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    const followedIds = await this.userService.unfollow(id, unfollowedId);
    return this.userService.checkIsNotEmpty(followedIds);
  }

  @Post('photo')
  @HttpCode(200)
  @Auth()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'User Image',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UserIdRoles() { id }: UserIdRolesDto,
    @UploadedFile(new ParseFilePipe(getFileValidateConfig()))
    file: Express.Multer.File,
  ) {
    try {
      const imgData = await this.cloudinaryService.uploadImage(file, id);
      const response = await this.userService.savePhotoUrl(
        id,
        imgData.secure_url,
      );
      return this.userService.checkIsNotEmpty(response);
    } catch {
      throw new InternalServerErrorException(UPLOAD_ERROR);
    }
  }

  //Admin only
  @Get('all')
  @ApiTags('Admin only')
  @Auth('ADMIN')
  @ApiBearerAuth('ADMIN')
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Delete(':id')
  @ApiTags('Admin only')
  @Auth()
  @ApiBearerAuth('ADMIN')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedUser = await this.userService.delete(id);
    await this.userService.checkIsNotEmpty(deletedUser);
  }
}
