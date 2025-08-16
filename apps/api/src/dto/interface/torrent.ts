export interface TorrentInterface {
  url: string;
  hash: string;
  quality: string;
  type: string;
  is_repack: string;
  video_codec: string;
  bit_depth: string;
  audio_channels: string;
  size: string;
  size_bytes: number;
  date_uploaded_unix: number; 
}