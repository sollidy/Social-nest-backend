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
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserIdRolesDto } from '../auth/dto/userIdRoles.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserIdRoles } from '../decorators/user.decorator';
import { getFileValidateConfig } from '../pipes/file.validation.config';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UPLOAD_ERROR } from './user.constants';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get(':id')
  async getProfile(@Param('id', IdValidationPipe) id: string) {
    const profile = await this.userService.getOne(id);
    return this.userService.checkIsNotEmpty(profile);
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedUser = await this.userService.delete(id);
    await this.userService.checkIsNotEmpty(deletedUser);
  }

  @Get('all')
  @Auth('ADMIN')
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Patch('profile')
  @UsePipes(new ValidationPipe())
  @Auth()
  async updateProfile(
    @UserIdRoles() { id }: UserIdRolesDto,
    @Body() dto: UpdateProfileDto,
  ) {
    const updatedProfile = await this.userService.updateProfile(id, dto);
    return this.userService.checkIsNotEmpty(updatedProfile);
  }

  @Post('follow/:followedId')
  @Auth()
  async follow(
    @Param('followedId', IdValidationPipe) followedId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    const followedIds = await this.userService.follow(id, followedId);
    return this.userService.checkIsNotEmpty(followedIds);
  }

  @Get('follow/:followedId')
  @Auth()
  async isFollowed(
    @Param('followedId', IdValidationPipe) followedId: string,
    @UserIdRoles() { id }: UserIdRolesDto,
  ) {
    return this.userService.isFollowed(id, followedId);
  }

  @Delete('follow/:unfollowedId')
  @Auth()
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
}
