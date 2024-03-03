import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { PostCommentReply } from './post-comment-reply.entity';

@Entity({ name: 'post-comment' })
export class PostComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @OneToOne(() => User, { cascade: true })
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @OneToMany(
    () => PostCommentReply,
    (postCommentReply) => postCommentReply.repliedComment,
    { cascade: true },
  )
  replies: PostCommentReply[];

  @Column({ name: 'replies_count', default: 0 })
  repliesCount: number;
}
