export interface SongModel {
  _id: any;
  artist: string;
  title: string;
  songLines: {
    chords: string;
    lyrics: string;
    _id: any;
  }[];
}
