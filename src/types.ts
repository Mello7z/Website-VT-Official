export interface Track {
  id: string;
  number: string;
  name: string;
  duration: string;
  coverPath: string;
  audioPath: string;
  artist: string;
  trackType: string;
  release: string;
  year: string;
  youtubeUrl?: string;
  isUnreleased?: boolean;
  statusLabel?: string;
  isLocked?: boolean;
  isCorrupted?: boolean;
}
