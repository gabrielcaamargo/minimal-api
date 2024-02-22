import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findUserPosts(id: string) {
    const user = await this.usersRepository.find({
      where: {
        id,
        deletedAt: null,
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

  async delete(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.softDelete(id);
  }
}
