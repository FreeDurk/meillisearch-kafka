import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieInterface } from 'apps/api/src/dto/interface/movie';
import { Movie } from 'apps/api/src/models/movie.entity';
import { MeiliSearch } from 'meilisearch';
import { InjectMeiliSearch } from 'nestjs-meilisearch';
import { Repository } from 'typeorm';

interface MovieIndexInterface {
    id: number;
    externalId: number,
    imdbCode: string,
    title: string,
    titleEnglish: string,
    titleLong: string,
    year: number,
    rating: number,
    runtime: number,
    genres: string[],
    summary:string,
    descriptionFull: string,
    synopsis: string,
    poster: string
}

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private readonly movieRepo: Repository<Movie>,
    @InjectMeiliSearch() private readonly meiliClient: MeiliSearch
  ) { }

  async createMovie(movie: Movie) {
    
    const newMovie = this.movieRepo.create(movie);
    // // persist data
    const movieResult = await this.movieRepo.save(newMovie);

    const indexMovie:MovieIndexInterface = {
      id: movieResult.id!,
      externalId: movieResult.externalId,
      imdbCode: movieResult.imdbCode,
      title: movieResult.title,
      titleEnglish: movieResult.titleEnglish,
      titleLong: movieResult.titleLong,
      year: movieResult.year,
      rating: movieResult.rating,
      runtime: movieResult.runtime,
      genres: movieResult.genres,
      summary: movieResult.summary,
      descriptionFull: movieResult.descriptionFull,
      synopsis: movieResult.synopsis,
      poster: movie.largeCoverImage
    }

    console.log(`RECEIVED: ${indexMovie.title}`);
    // //index to meili search
    this.meiliClient.index('movies').addDocuments([indexMovie]);
    
  }
}
