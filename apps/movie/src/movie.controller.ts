import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MovieInterface } from 'apps/api/src/dto/interface/movie';
import { Movie } from 'apps/api/src/models/movie.entity';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @MessagePattern('process.movie')
  processMovie(@Payload() movie: Movie): void {
    this.movieService.createMovie(movie);
  }
}


