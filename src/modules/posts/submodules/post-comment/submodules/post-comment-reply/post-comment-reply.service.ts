import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCommentReply } from 'src/modules/posts/entities/post-comment-reply.entity';
import { PostComment } from 'src/modules/posts/entities/post-comment.entity';
import { Repository } from 'typeorm';
import { CreatePostCommentReplyDto } from '../../dto/create-post-comment-reply.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class PostCommentReplyService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepo: Repository<PostComment>,
    @InjectRepository(PostCommentReply)
    private readonly postCommentReplyRepo: Repository<PostCommentReply>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(
    createPostCommentReplyDto: CreatePostCommentReplyDto,
    loggedUserId: string,
  ) {
    const { repliedComment } = createPostCommentReplyDto;

    const comment = await this.postCommentRepo.findOne({
      where: {
        id: repliedComment.id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const user = await this.userRepo.findOne({
      where: {
        id: loggedUserId,
      },
    });

    const reply = this.postCommentReplyRepo.create(createPostCommentReplyDto);
    reply.repliedComment = comment;
    reply.author = user;

    await this.postCommentRepo.update(comment.id, {
      repliesCount: comment.repliesCount++,
    });

    return await this.postCommentReplyRepo.save(reply);
  }
}
