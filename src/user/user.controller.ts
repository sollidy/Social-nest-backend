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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtUser } from '../decorators/jwtUser.decorator';
import { getFileValidateConfig } from '../pipes/file.validation.config';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { FileUploadDto } from './dto/file-upload.dto';
import { QueryUsersDto } from './dto/query-users.dto';
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
    @JwtUser('id', IdValidationPipe) id: string,
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
    @JwtUser('id', IdValidationPipe) id: string,
  ) {
    const followedIds = await this.userService.follow(id, followedId);
    return this.userService.checkIsNotEmpty(followedIds);
  }

  @Get('follow/:checkId')
  @Auth()
  @ApiBearerAuth()
  async isFollowed(
    @Param('checkId', IdValidationPipe) checkId: string,
    @JwtUser('id', IdValidationPipe) id: string,
  ) {
    return this.userService.isFollowed(id, checkId);
  }

  @Delete('follow/:unfollowedId')
  @Auth()
  @ApiBearerAuth()
  async unfollow(
    @Param('unfollowedId', IdValidationPipe) unfollowedId: string,
    @JwtUser('id', IdValidationPipe) id: string,
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
    @JwtUser('id', IdValidationPipe) id: string,
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

  @Get('get-users')
  @Auth('ANY')
  async getUsers(@JwtUser('id') id: string, @Query() query: QueryUsersDto) {
    return this.userService.getUsers(id, query);
  }
}
@ApiTags('Admin')
@Controller('user')
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  //Admin only
  @Get('get-all')
  @Auth('ADMIN')
  @ApiBearerAuth('ADMIN')
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Delete(':id')
  @Auth('ADMIN')
  @ApiBearerAuth('ADMIN')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedUser = await this.userService.delete(id);
    await this.userService.checkIsNotEmpty(deletedUser);
  }
}
