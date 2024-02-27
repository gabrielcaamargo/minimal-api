import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'posts_like' })
export class PostLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
