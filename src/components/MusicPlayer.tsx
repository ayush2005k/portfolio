import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PLAYLIST, Track } from '../data/playlist';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Shuffle,
  Repeat,
  Minimize2,
  Maximize2,
  Pin,
  PinOff,
} from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentTrack: Track | undefined = PLAYLIST[currentTrackIndex];
  const hasMultipleTracks = PLAYLIST.length > 1;

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Hover detection handlers
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isPinned) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setShowVolumeSlider(false);
    }, 450);
  };

  // Sync volume with HTML audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Audio setup and event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    setHasError(false);
    audio.src = currentTrack.src;
    audio.load();

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setHasError(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (isLoop) {
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
      } else if (hasMultipleTracks) {
        if (isShuffle) {
          let nextIdx = Math.floor(Math.random() * PLAYLIST.length);
          if (nextIdx === currentTrackIndex) {
            nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
          }
          setCurrentTrackIndex(nextIdx);
        } else {
          setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
        }
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Auto-resume if user was actively playing when track switched
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrackIndex, currentTrack?.src]);

  // Toggle Play / Pause
  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasError(false);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        }
      }
    },
    [isPlaying]
  );

  // Next track
  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!hasMultipleTracks) return;

      if (isShuffle) {
        let nextIdx = Math.floor(Math.random() * PLAYLIST.length);
        if (nextIdx === currentTrackIndex) {
          nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
        }
        setCurrentTrackIndex(nextIdx);
      } else {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
      }
    },
    [hasMultipleTracks, isShuffle, currentTrackIndex]
  );

  // Previous track
  const handlePrevious = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!hasMultipleTracks) return;

      const audio = audioRef.current;
      // If played for more than 3 seconds, restart current track
      if (audio && audio.currentTime > 3) {
        audio.currentTime = 0;
        setCurrentTime(0);
        return;
      }

      setCurrentTrackIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
    },
    [hasMultipleTracks]
  );

  // Seek bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || !audioRef.current || !duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPositionX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickPositionX / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Keyboard navigation on seek bar
  const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const newTime = Math.min(duration, audio.currentTime + 5);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const newTime = Math.max(0, audio.currentTime - 5);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  // Volume slider change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Close volume popout when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        playerContainerRef.current &&
        !playerContainerRef.current.contains(event.target as Node)
      ) {
        setShowVolumeSlider(false);
        if (!isPinned) {
          setIsHovered(false);
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isPinned]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const showFullDeck = isHovered || isPinned;

  if (!currentTrack) return null;

  return (
    <aside
      ref={playerContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 select-none no-print transition-all duration-300"
      aria-label="Vintage Cassette Audio Player"
    >
      {/* Hidden native audio element */}
      <audio ref={audioRef} preload="metadata" />

      {/* ======================================================== */}
      {/* COMPACT HOVER TRIGGER PILL (Shown when not hovering)      */}
      {/* ======================================================== */}
      {!showFullDeck ? (
        <div
          onClick={() => setIsHovered(true)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#18181a]/95 backdrop-blur-sm border border-[#33323a] shadow-[0_8px_24px_rgba(0,0,0,0.5)] text-white hover:border-[#0b5d36] transition-all cursor-pointer group hover:scale-102"
          title="Hover or click to open Cassette Player"
        >
          {/* Mini rotating cassette spool */}
          <div
            className={`w-5 h-5 rounded-full bg-[#f3edd9] border border-[#2b2930] flex items-center justify-center relative shrink-0 ${
              isPlaying ? 'animate-reel' : ''
            }`}
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#18181a] flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-[#f3edd9]" />
            </div>
          </div>

          <div className="flex flex-col min-w-0 pr-0.5">
            <span className="text-[10px] font-bold font-editorial text-[#f3edd9] leading-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0b5d36] shrink-0" />
              <span className="truncate max-w-[95px] uppercase">{currentTrack.title}</span>
            </span>
            <span className="text-[8.5px] font-mono-code text-[#9c96a3]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Quick Play/Pause & Expand Trigger */}
          <div className="flex items-center gap-1 ml-0.5">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-6 h-6 rounded-full bg-[#0b5d36] hover:bg-[#075b32] text-white flex items-center justify-center transition-transform active:scale-90"
            >
              {isPlaying ? (
                <Pause className="w-2.5 h-2.5 fill-current" />
              ) : (
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              )}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPinned(true);
              }}
              aria-label="Open cassette player"
              className="p-0.5 text-[#8f8897] hover:text-white transition-colors"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* FULL PHYSICAL CASSETTE DECK (Petite & Hover Activated)    */
        /* ======================================================== */
        <div
          className="relative w-[235px] sm:w-[250px] rounded-xl cassette-shell-texture border border-[#33323a] shadow-[0_16px_40px_rgba(0,0,0,0.65),0_4px_16px_rgba(0,0,0,0.4)] p-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-200"
          role="region"
        >
          {/* Subtle Chamfer Highlight Line along Top Edge */}
          <div className="absolute top-0 left-2.5 right-2.5 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* Miniature Corner Screws */}
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#2a2930] border border-[#484554] flex items-center justify-center">
            <div className="w-[3px] h-[0.5px] bg-[#111014] rotate-45" />
          </div>
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#2a2930] border border-[#484554] flex items-center justify-center">
            <div className="w-[3px] h-[0.5px] bg-[#111014] -rotate-45" />
          </div>
          <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#2a2930] border border-[#484554] flex items-center justify-center">
            <div className="w-[3px] h-[0.5px] bg-[#111014] -rotate-12" />
          </div>
          <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#2a2930] border border-[#484554] flex items-center justify-center">
            <div className="w-[3px] h-[0.5px] bg-[#111014] rotate-30" />
          </div>

          {/* Cassette Top Header Bar: Metadata & Utility Toggles */}
          <div className="flex items-center justify-between px-1 pt-0.5 pb-1 text-[8.5px] font-mono-code font-bold uppercase tracking-wider text-[#9d97a6]">
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1 text-[#0b5d36] font-extrabold bg-[#f3edd9] px-1 py-0.2 rounded border border-[#dfd6c0] text-[8px]">
                <span
                  className={`w-1 h-1 rounded-full bg-[#0b5d36] ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                />
                SIDE A
              </span>
              <span className="hidden xs:inline text-[#7a7483] text-[8px]">CHROME</span>
            </div>

            {/* Top Right Utilities: Pin Toggle, Volume Popout & Close */}
            <div className="flex items-center gap-0.5">
              {/* Pin Toggle Button */}
              <button
                type="button"
                onClick={() => setIsPinned(!isPinned)}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  isPinned
                    ? 'text-[#34d399] bg-white/15'
                    : 'text-[#9d97a6] hover:text-white hover:bg-white/10'
                }`}
                title={isPinned ? 'Unpin player (close on hover out)' : 'Pin player open'}
                aria-label={isPinned ? 'Unpin player' : 'Pin player'}
              >
                {isPinned ? <PinOff className="w-2.5 h-2.5" /> : <Pin className="w-2.5 h-2.5" />}
              </button>

              {/* Volume Button */}
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVolumeSlider(!showVolumeSlider);
                  }}
                  className="p-1 rounded text-[#9d97a6] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Adjust volume"
                  title="Volume control"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-2.5 h-2.5 text-red-400" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-2.5 h-2.5" />
                  ) : (
                    <Volume2 className="w-2.5 h-2.5" />
                  )}
                </button>

                {/* Popout Volume Slider */}
                {showVolumeSlider && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-5 right-0 bg-[#1f1e24] border border-[#413f4d] shadow-xl rounded-md p-1.5 flex flex-col items-center gap-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="flex items-center justify-between w-18 text-[8px] font-mono-code text-[#aba5b5]">
                      <span>VOL</span>
                      <span>{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      aria-label="Volume slider"
                      className="w-18 h-1 bg-[#3a3845] rounded-lg appearance-none cursor-pointer accent-[#0b5d36]"
                    />
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="text-[8px] font-mono-code text-[#0b5d36] hover:underline cursor-pointer"
                    >
                      {isMuted ? 'UNMUTE' : 'MUTE'}
                    </button>
                  </div>
                )}
              </div>

              {/* Close/Minimize to Pill */}
              <button
                type="button"
                onClick={() => {
                  setIsPinned(false);
                  setIsHovered(false);
                }}
                className="p-1 rounded text-[#9d97a6] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Minimize cassette player"
                title="Collapse player"
              >
                <Minimize2 className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CENTRAL CASSETTE LABEL (Warm Cream Vintage Surface)      */}
          {/* ======================================================== */}
          <div className="cassette-label-paper rounded-lg border border-[#ded5be] p-2 text-[#17161a] relative shadow-inner overflow-hidden">
            {/* Top Metadata & Editorial Title */}
            <div className="flex items-start justify-between gap-1 border-b border-[#0b5d36]/20 pb-1">
              <div className="min-w-0 flex-1">
                {/* Vintage Editorial Track Title in Deep Forest Green */}
                <h3 className="font-editorial text-[12px] sm:text-[13px] font-bold text-[#0b5d36] tracking-tight leading-tight uppercase truncate">
                  {currentTrack.title}
                </h3>
                {/* Artist & Subtitle */}
                <div className="flex items-center gap-1 text-[8px] font-mono-code text-[#4a4751] font-semibold tracking-wide uppercase truncate">
                  <span>{currentTrack.artist || 'AYUSH SINGH'}</span>
                  <span>•</span>
                  <span>MIX</span>
                </div>
              </div>

              {/* Duration Badge */}
              <div className="text-right shrink-0">
                <span className="font-mono-code text-[9px] font-bold text-[#0b5d36]">
                  {formatTime(currentTime)}
                </span>
                <span className="text-[8px] font-mono-code text-[#736e7a]">
                  {' '}/ {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Cassette Center Section: Recessed Spool Deck Window */}
            <div className="my-1.5 bg-[#17161b] rounded-md p-1 border border-[#3b3845] relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
              {/* Central Window Guide Tick Ruler */}
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[6.5px] font-mono-code text-[#a6a0af] tracking-widest pointer-events-none select-none">
                100 • • • 0
              </div>

              <div className="flex items-center justify-between px-1 sm:px-2 py-0.5">
                {/* LEFT CASSETTE REEL / SPOOL */}
                <div
                  className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#f3edd9] border-[1.5px] border-[#868090] shadow-xs flex items-center justify-center relative shrink-0 ${
                    isPlaying ? 'animate-reel' : ''
                  }`}
                  style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                  aria-hidden="true"
                >
                  {/* Spool Cog Spokes / Gear Teeth */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-full h-[1px] bg-[#66606f]/40" />
                    <span className="w-[1px] h-full bg-[#66606f]/40" />
                    <span className="w-full h-[1px] bg-[#66606f]/40 rotate-45" />
                    <span className="w-full h-[1px] bg-[#66606f]/40 -rotate-45" />
                  </div>

                  {/* Inner Spool Hub */}
                  <div className="w-3 h-3 rounded-full bg-[#17161b] border border-[#3a3844] flex items-center justify-center relative z-10">
                    <div className="w-1 h-1 rounded-full bg-[#f3edd9]" />
                  </div>
                </div>

                {/* CENTER MAGNETIC TAPE VIEWPORT */}
                <div className="flex-1 mx-1.5 sm:mx-2 flex flex-col items-center justify-center">
                  {/* Magnetic Tape Bridge */}
                  <div className="w-full h-2.5 bg-[#2b1f1a] rounded-xs border border-[#48372e] relative overflow-hidden flex items-center justify-center">
                    <div className="w-full h-[1px] bg-[#5a3f30]" />
                    <div
                      className="absolute inset-y-0 left-0 bg-[#3a271f] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  {/* High-Fi Stereo Indicator */}
                  <div className="flex items-center gap-0.5 mt-0.5 text-[6.5px] font-mono-code font-bold uppercase text-[#0b5d36]">
                    <span className="w-1 h-1 rounded-full bg-[#0b5d36] animate-pulse" />
                    <span>STEREO HI-FI</span>
                  </div>
                </div>

                {/* RIGHT CASSETTE REEL / SPOOL */}
                <div
                  className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#f3edd9] border-[1.5px] border-[#868090] shadow-xs flex items-center justify-center relative shrink-0 ${
                    isPlaying ? 'animate-reel' : ''
                  }`}
                  style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                  aria-hidden="true"
                >
                  {/* Spool Cog Spokes / Gear Teeth */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-full h-[1px] bg-[#66606f]/40" />
                    <span className="w-[1px] h-full bg-[#66606f]/40" />
                    <span className="w-full h-[1px] bg-[#66606f]/40 rotate-45" />
                    <span className="w-full h-[1px] bg-[#66606f]/40 -rotate-45" />
                  </div>

                  {/* Inner Spool Hub */}
                  <div className="w-3 h-3 rounded-full bg-[#17161b] border border-[#3a3844] flex items-center justify-center relative z-10">
                    <div className="w-1 h-1 rounded-full bg-[#f3edd9]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Cassette Progress Bar */}
            <div className="mt-1 mb-1.5">
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                onKeyDown={handleProgressKeyDown}
                tabIndex={0}
                role="slider"
                aria-label="Seek track position"
                aria-valuemin={0}
                aria-valuemax={Math.floor(duration)}
                aria-valuenow={Math.floor(currentTime)}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                className="relative w-full h-1.5 bg-[#dfd6c0] hover:h-2 rounded-full cursor-pointer overflow-hidden transition-all group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0b5d36]"
              >
                {/* Forest Green Track Progress Fill */}
                <div
                  className="h-full bg-[#0b5d36] rounded-full transition-[width] duration-100 ease-linear pointer-events-none relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  {/* Circular Playhead Indicator */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#0b5d36] border border-white shadow-xs" />
                </div>
              </div>
            </div>

            {/* Bottom Vintage Cursive Stamp on Left */}
            <div className="flex items-center justify-between text-[9px] font-handwritten text-[#0b5d36] font-bold px-0.5 mb-1">
              <span className="text-[9.5px] tracking-wide">Ayush&rsquo;s Mix</span>
              <span className="font-mono-code text-[7.5px] uppercase tracking-wider text-[#635f6b]">
                {hasError ? 'ERROR' : 'DOLBY HX'}
              </span>
            </div>

            {/* ======================================================== */}
            {/* DEEP FOREST GREEN TRANSPORT CONTROL STRIP               */}
            {/* ======================================================== */}
            <div className="bg-[#0b5d36] text-[#f3edd9] rounded-md px-2 py-1 flex items-center justify-between shadow-inner">
              {/* Shuffle Toggle */}
              <button
                type="button"
                onClick={() => setIsShuffle(!isShuffle)}
                className={`p-1 rounded transition-all cursor-pointer ${
                  isShuffle
                    ? 'text-white bg-white/20 scale-105'
                    : 'text-[#f3edd9]/70 hover:text-white hover:bg-white/10'
                }`}
                title={isShuffle ? 'Shuffle active' : 'Shuffle off'}
                aria-label="Toggle shuffle"
              >
                <Shuffle className="w-2.5 h-2.5" />
              </button>

              {/* Previous Track */}
              <button
                type="button"
                onClick={handlePrevious}
                disabled={!hasMultipleTracks}
                className={`p-1 rounded transition-all active:scale-90 ${
                  hasMultipleTracks
                    ? 'text-white hover:bg-white/15 cursor-pointer'
                    : 'text-white/30 cursor-not-allowed'
                }`}
                title="Previous track"
                aria-label="Previous track"
              >
                <SkipBack className="w-3 h-3 fill-current" />
              </button>

              {/* Central Tactile Play / Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-6.5 h-6.5 rounded-full bg-white text-[#0b5d36] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 fill-current" />
                ) : (
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasMultipleTracks}
                className={`p-1 rounded transition-all active:scale-90 ${
                  hasMultipleTracks
                    ? 'text-white hover:bg-white/15 cursor-pointer'
                    : 'text-white/30 cursor-not-allowed'
                }`}
                title="Next track"
                aria-label="Next track"
              >
                <SkipForward className="w-3 h-3 fill-current" />
              </button>

              {/* Loop / Repeat Toggle */}
              <button
                type="button"
                onClick={() => setIsLoop(!isLoop)}
                className={`p-1 rounded transition-all cursor-pointer ${
                  isLoop
                    ? 'text-white bg-white/20 scale-105'
                    : 'text-[#f3edd9]/70 hover:text-white hover:bg-white/10'
                }`}
                title={isLoop ? 'Repeat track active' : 'Repeat track off'}
                aria-label="Toggle repeat"
              >
                <Repeat className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CASSETTE BOTTOM SHELL GEOMETRY (Capstan & Guide Holes)   */}
          {/* ======================================================== */}
          <div className="mt-1.5 flex items-center justify-center gap-2.5 px-2 py-0.5">
            <div className="w-2 h-2 rounded-full bg-[#111013] border border-[#3e3c49] flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-[#2a2933]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#111013] border border-[#484555] shadow-inner" />
            <div className="w-10 h-0.5 bg-[#111013] rounded-xs border border-[#383643]" />
            <div className="w-2 h-2 rounded-full bg-[#111013] border border-[#484555] shadow-inner" />
            <div className="w-2 h-2 rounded-full bg-[#111013] border border-[#3e3c49] flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-[#2a2933]" />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
