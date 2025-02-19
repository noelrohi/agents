"use client";

import dynamic from "next/dynamic";
import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import type ReactPlayer from "react-player";

const DynamicReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

interface VideoPlayerContextType {
  seekTo: (start: number, end?: number) => void;
  stopAt?: number;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null);

export function useVideoPlayer() {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error("useVideoPlayer must be used within a VideoPlayerProvider");
  }
  return context;
}

interface VideoPlayerProviderProps extends PropsWithChildren {
  url: string;
}

export function VideoPlayerProvider({
  children,
  url,
}: VideoPlayerProviderProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const [stopAt, setStopAt] = useState<number>();
  const [playing, setPlaying] = useState(false);

  const seekTo = useCallback((start: number, end?: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(start, "seconds");
      setStopAt(end);
      setPlaying(true);
    }
  }, []);

  const handleProgress = useCallback(
    ({ playedSeconds }: { playedSeconds: number }) => {
      if (stopAt && playedSeconds >= stopAt) {
        setPlaying(false);
        setStopAt(undefined);
      }
    },
    [stopAt],
  );

  const handlePause = useCallback(() => {
    setPlaying(false);
  }, []);

  const handlePlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const contextValue = {
    seekTo,
    stopAt,
  };

  return (
    <VideoPlayerContext.Provider value={contextValue}>
      <div className="space-y-8">
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <DynamicReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            controls
            playing={playing}
            onProgress={handleProgress}
            onPause={handlePause}
            onPlay={handlePlay}
          />
        </div>
        {children}
      </div>
    </VideoPlayerContext.Provider>
  );
}
