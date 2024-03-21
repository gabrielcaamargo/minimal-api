import { Post } from 'src/modules/posts/entities/post.entity';
import { PostLike } from 'src/modules/posts/entities/post-like.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post;

  @OneToMany(() => PostLike, (postLike) => postLike.user, { cascade: true })
  likes: PostLike[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
