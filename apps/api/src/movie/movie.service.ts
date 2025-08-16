import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../models/movie.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ResponseInterface } from '../dto/interface/response.data';
import { ClientKafka } from '@nestjs/microservices';
import { MovieInterface } from '../dto/interface/movie';
import { Torrent } from '../models/torrent.entity';

interface ResponseData {
  movie_count: number;
  limit: number;
  page_number: number;
  movies?: Movie[]
};

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private readonly movieRepo: Repository<Movie>, @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,) { }

  async sync() {
    let page = 1;
    let limit = 50

    while (true) {
      const result = await axios.get<ResponseInterface>(
        `https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}`
      );

      const { movies } = result.data.data;

      if (!movies || movies.length == 0) break;

      for (const movie of movies) {
        const mappedMovie = mapMovie(movie);
        this.kafkaClient.emit('process.movie', mappedMovie);
      }
      page++;
    }
  }
}

export function mapMovie(movie: MovieInterface): Movie {
  return {
    externalId: movie.id,
    imdbCode: movie.imdb_code,
    title: movie.title,
    titleEnglish: movie.title_english,
    titleLong: movie.title_long,
    year: movie.year,
    rating: movie.rating,
    runtime: movie.runtime,
    genres: movie.genres,
    summary: movie.summary,
    descriptionFull: movie.description_full,
    synopsis: movie.synopsis,
    ytTrailerCode: movie.yt_trailer_code,
    language: movie.language,
    mpaRating: movie.mpa_rating,
    backgroundImage: movie.background_image,
    smallCoverImage: movie.small_cover_image,
    mediumCoverImage: movie.medium_cover_image,
    largeCoverImage: movie.large_cover_image,
    dateUploaded: movie.date_uploaded_unix
      ? new Date(movie.date_uploaded_unix * 1000)
      : null,
    torrents: movie.torrents?.map((t) => {
      const torrent: Torrent = {
        url: t.url,
        hash: t.hash,
        quality: t.quality,
        type: t.type,
        isRepack: t.is_repack === '1',
        videoCodec: t.video_codec,
        bitDepth: t.bit_depth,
        audioChannels: t.audio_channels,
        size: t.size,
        sizeBytes: t.size_bytes,
        dateUploaded: t.date_uploaded_unix
          ? new Date(t.date_uploaded_unix * 1000)
          : undefined,
        movie: undefined,
      };
      return torrent;
    }) || [],
  }
}
