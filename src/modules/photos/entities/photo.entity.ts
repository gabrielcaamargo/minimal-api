import { Post } from 'src/modules/posts/entities/post.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  s3Key: string;

  @OneToOne(() => Post, (post) => post.photo, { nullable: true })
  post: Post;
}
