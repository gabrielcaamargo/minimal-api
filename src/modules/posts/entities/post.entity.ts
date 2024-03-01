import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostLike } from './post-like.entity';
import { PostComment } from './post-comment.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ name: 'cover_url', nullable: true })
  coverUrl: string;

  @OneToMany(() => PostLike, (postLike) => postLike.post, { cascade: true })
  likes: PostLike[];

  @OneToMany(() => PostComment, (postComment) => postComment.post, {
    cascade: true,
  })
  comments: PostComment[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
