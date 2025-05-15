export interface SongModel {
  _id: any;
  artists: string;
  title: string;
  songLines: {
    chords: string;
    lyrics: string;
    _id: any;
  }[];
}
