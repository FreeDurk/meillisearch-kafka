import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity({ name: 'torrents' })
export class Torrent {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  url: string;

  @Column()
  hash: string;

  @Column()
  quality: string;

  @Column()
  type: string;

  @Column({ default: false })
  isRepack: boolean;

  @Column({ nullable: true })
  videoCodec: string;

  @Column({ nullable: true })
  bitDepth: string;

  @Column({ nullable: true })
  audioChannels: string;

  @Column({ nullable: true })
  size: string;

  @Column({ type: 'bigint', nullable: true })
  sizeBytes: number;

  @Column({ type: 'datetime', nullable: true })
  dateUploaded?: Date;

  @ManyToOne(() => Movie, (movie) => movie.torrents, { onDelete: 'CASCADE' })
  movie?: Movie | null;
}
