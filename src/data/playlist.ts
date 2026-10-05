export interface Track {
  id: string;
  title: string;
  artist?: string;
  src: string;
}

/**
 * Audio playlist for portfolio background player.
 * Add additional tracks here to automatically enable next/previous navigation.
 */
export const PLAYLIST: Track[] = [
  {
    id: 'track-1',
    title: 'So Good',
    artist: 'Jhené Aiko ft. Kendrick Lamar',
    src: '/audio/so-good.mp3',
  },
  {
    id: 'track-2',
    title: 'Closer',
    artist: 'The Chainsmokers ft. Halsey',
    src: '/audio/closer.mp3',
  },
  {
    id: 'track-3',
    title: 'Iktara',
    artist: 'Kavita Seth & Amit Trivedi',
    src: '/audio/iktara.mp3',
  },
  {
    id: 'track-4',
    title: 'Adventure of a Lifetime',
    artist: 'Coldplay',
    src: '/audio/adventure-of-a-lifetime.mp3',
  },
  {
    id: 'track-5',
    title: 'cold/mess',
    artist: 'Prateek Kuhad',
    src: '/audio/cold-mess.mp3',
  },
  {
    id: 'track-6',
    title: 'Nights',
    artist: 'Frank Ocean',
    src: '/audio/nights.mp3',
  },
  {
    id: 'track-7',
    title: 'Something Just Like This',
    artist: 'The Chainsmokers & Coldplay',
    src: '/audio/something-just-like-this.mp3',
  },
  {
    id: 'track-8',
    title: 'Borderline',
    artist: 'Tame Impala',
    src: '/audio/borderline.mp3',
  },
  {
    id: 'track-9',
    title: 'Payphone',
    artist: 'Maroon 5 ft. Wiz Khalifa',
    src: '/audio/payphone.mp3',
  },
  {
    id: 'track-10',
    title: 'Paradise',
    artist: 'Coldplay',
    src: '/audio/paradise.mp3',
  },
  {
    id: 'track-11',
    title: '505',
    artist: 'Arctic Monkeys',
    src: '/audio/505.mp3',
  },
  {
    id: 'track-12',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    src: '/audio/heat-waves.mp3',
  },
  {
    id: 'track-13',
    title: 'Weightless',
    artist: 'Arlo Parks',
    src: '/audio/weightless.mp3',
  },
];
