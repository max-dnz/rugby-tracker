"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMatchStore } from '@/lib/store';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export function MatchTimer() {
  const { match, startMatch, pauseMatch, resumeMatch, updateMatchTime, setHalf, endMatch } = useMatchStore();
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (match.isRunning && !match.isPaused) {
      interval = setInterval(() => {
        const newTime = match.currentTime + 1;
        updateMatchTime(newTime);
        setDisplayTime(newTime);
      }, 1000);
    } else {
      setDisplayTime(match.currentTime);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [match.isRunning, match.isPaused, match.currentTime, updateMatchTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (!match.startTime) {
      startMatch();
    } else if (match.isRunning) {
      pauseMatch();
    } else {
      resumeMatch();
    }
  };

  const handleReset = () => {
    updateMatchTime(0);
    setDisplayTime(0);
  };

  const handleHalfTime = () => {
    if (match.half === 1) {
      setHalf(2);
      pauseMatch();
    } else {
      endMatch();
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-2">
          {match.half === 1 ? '1ère Mi-temps' : '2ème Mi-temps'}
        </div>
        <div className="text-5xl font-bold font-mono mb-4">
          {formatTime(displayTime)}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            onClick={handleStartPause}
            variant={match.isRunning ? "secondary" : "default"}
            size="default"
            className="min-w-[100px]"
          >
            {match.isRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {!match.startTime ? 'Démarrer' : 'Reprendre'}
              </>
            )}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="default"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button
            onClick={handleHalfTime}
            variant="outline"
            size="default"
          >
            <Flag className="mr-2 h-4 w-4" />
            {match.half === 1 ? 'Mi-temps' : 'Fin'}
          </Button>
        </div>
      </div>
    </div>
  );
}