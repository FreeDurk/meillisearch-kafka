import { TorrentInterface } from "./torrent";

export interface MovieInterface {
  id: number;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  date_uploaded_unix: number;
  torrents: TorrentInterface[];
}