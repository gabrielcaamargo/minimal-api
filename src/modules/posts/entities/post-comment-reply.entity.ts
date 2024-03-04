import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostComment } from './post-comment.entity';

@Entity({ name: 'post-comment-reply' })
export class PostCommentReply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @OneToOne(() => User, { cascade: true })
  author: User;

  @ManyToOne(() => PostComment, (postComment) => postComment.replies, {
    cascade: true,
  })
  @JoinColumn({ name: 'replied_comment' })
  repliedComment: PostComment;
}
