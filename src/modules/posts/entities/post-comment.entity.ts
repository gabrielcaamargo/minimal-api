import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

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
}
