import { MovieInterface } from "./movie";

export interface ResponseDataInterface {
  movie_count: number;
  limit: number;
  page_number: number;
  movies?: MovieInterface[];
}

export interface ResponseInterface {
  status: string;
  status_message: string;
  data: ResponseDataInterface;
}