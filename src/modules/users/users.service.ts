import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { createImageS3Url } from 'src/shared/utils/createImageS3Url';
import { UploadService } from '../upload/upload.service';
import { extractKeyFromUrl } from 'src/shared/utils/extractKeyFromUrl';
import { IUSerParams } from './types/IUserParams';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly uploadService: UploadService,
  ) { }

  async findAll(data: IUSerParams) {

    return this.usersRepository.find({
      where:
      data.search ? [
        { username: ILike(`%${data.search}%`) },
        { name: ILike(`%${data.search}%`) }
      ] : undefined
    });
  }

  async findUserPosts(id: string) {
    const user = await this.usersRepository.find({
      where: {
        id,
      },
      relations: ['posts'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userPosts = user.map((item) => ({
      id: item.id,
      posts: item.posts,
    }));

    return userPosts;
  }

  async finishUserRegister(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id:  createUserDto.id
      }
    })

    if(!user) {
      throw new NotFoundException('User not found')
    }

    const userByUsername = await this.usersRepository.findOne({
      where: {
        username: createUserDto.username
      }
    })

    if(userByUsername) {
      throw new BadRequestException('This username is already in use')
    }

    await this.usersRepository.update(user.id, {
      ...user,
      ...createUserDto
    })

    return { message: 'Register concluded!' }
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async changeAvatar(id: string, file: Express.Multer.File) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user.profilePicture) {
      const { key } = await this.uploadService.upload('avatars', file);

      const avatarUrl = createImageS3Url(process.env.AWS_BUCKET, key);

      return this.usersRepository.update(id, {
        profilePicture: avatarUrl,
      });
    }

    const currentPictureKey = extractKeyFromUrl(user.profilePicture);
    const currentPictureKeyWithFolder = `avatars/${currentPictureKey}`;

    try {
      await this.uploadService.remove(currentPictureKeyWithFolder);
    } catch (error) {
      throw new BadRequestException();
    }

    const { key } = await this.uploadService.upload('avatars', file);

    const avatarUrl = createImageS3Url(process.env.AWS_BUCKET, key);

    return this.usersRepository.update(id, {
      profilePicture: avatarUrl,
    });
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository
      .delete(id)
      .then(() => {
        return { message: 'User deleted' };
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
