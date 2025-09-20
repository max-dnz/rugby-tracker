"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMatchStore } from '@/lib/store';
import { EventType } from '@/lib/types';
import { Play, Pause, Flag } from 'lucide-react';

export function MatchTimer() {
  const { match, startMatch, pauseMatch, resumeMatch, updateMatchTime, setHalf, endMatch, addEvent } = useMatchStore();
  const [displayTime, setDisplayTime] = useState(0);
  const [realTime, setRealTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let realTimeInterval: NodeJS.Timeout | undefined;
    if (mounted) {
      setRealTime(new Date());
      realTimeInterval = setInterval(() => setRealTime(new Date()), 1000);
    }
    let interval: NodeJS.Timeout | undefined;
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
      if (realTimeInterval) clearInterval(realTimeInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.isRunning, match.isPaused, match.currentTime, updateMatchTime, mounted]);

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



  const handleHalfTime = () => {
    if (match.half === 1) {
      setHalf(2);
      pauseMatch();
      updateMatchTime(2400); // 40 minutes en secondes
      setDisplayTime(2400);
      addEvent({
        id: Date.now().toString(),
        type: 'Mi-temps' as EventType,
        timestamp: new Date().toISOString(),
        matchTime: match.currentTime,
        team: undefined,
      });
    } else {
      endMatch();
      addEvent({
        id: Date.now().toString(),
        type: 'Fin du match' as EventType,
        timestamp: new Date().toISOString(),
        matchTime: match.currentTime,
        team: undefined,
      });
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
        {mounted && realTime && (
          <div className="text-xs text-muted-foreground mb-2">
            Heure réelle : {realTime.toLocaleTimeString()}
          </div>
        )}
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