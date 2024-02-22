import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserLogged } from 'src/shared/decorators/current-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UserLogged() userId: string,
    @Body()
    createPostDto: CreatePostDto,

    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 4 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.postsService.create(
      createPostDto,
      file?.originalname,
      file?.buffer,
      userId,
    );
  }

  @Get()
  findAll(@Query('order') order: 'ASC' | 'DESC') {
    return this.postsService.findAll({ order });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
