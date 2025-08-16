import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Torrent } from './torrent.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  externalId: number;

  @Column()
  imdbCode: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleEnglish: string;

  @Column({ nullable: true })
  titleLong: string;

  @Column()
  year: number;

  @Column('decimal', { precision: 3, scale: 1, nullable: true })
  rating: number;

  @Column({ nullable: true })
  runtime: number;

  @Column('simple-array', { nullable: true })
  genres: string[];

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'text', nullable: true })
  descriptionFull: string;

  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @Column({ nullable: true })
  ytTrailerCode: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  mpaRating: string;

  @Column({ nullable: true })
  backgroundImage: string;

  @Column({ nullable: true })
  smallCoverImage: string;

  @Column({ nullable: true })
  mediumCoverImage: string;

  @Column({ nullable: true })
  largeCoverImage: string;

  @Column({ type: 'datetime', nullable: true })
  dateUploaded: Date | null;

  @OneToMany(() => Torrent, (torrent) => torrent.movie, { cascade: true })
  torrents: Torrent[];
}
