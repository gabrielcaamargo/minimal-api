import { Photo } from 'src/modules/photos/entities/photo.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostLike } from './posts-like.entity';

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

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  likes: PostLike[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  authorId: User;

  @OneToOne(() => Photo, (photo) => photo.post, { nullable: true })
  @JoinColumn({ name: 'photo' })
  photo?: Photo;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
