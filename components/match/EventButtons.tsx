"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMatchStore } from '@/lib/store';
import { eventCategories } from '@/lib/event-categories';
import { EventType, Team, MatchEvent } from '@/lib/types';
import { cn } from '@/lib/utils';

export function EventButtons() {
  const { match, addEvent, setScore } = useMatchStore();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleEventClick = (eventType: EventType, points?: number) => {
    if (!selectedTeam) {
      alert("Veuillez sélectionner une équipe");
      return;
    }

    const event: MatchEvent = {
      id: Date.now().toString(),
      type: eventType,
      timestamp: new Date().toISOString(),
      matchTime: match.currentTime,
      team: selectedTeam,
      points,
    };

    addEvent(event);

    // Update score if event has points
    if (points && points > 0) {
      const currentScore = selectedTeam === 'home' ? match.homeScore : match.awayScore;
      setScore(selectedTeam, currentScore + points);
    }

    // Reset team selection after certain events
    if (['try', 'conversion', 'penalty_goal', 'drop_goal'].includes(eventType)) {
      setSelectedTeam(null);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Actions du match</h2>
      
      {/* Team selection */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Sélectionner l&apos;équipe:</h3>
        <div className="flex gap-2">
          <Button
            onClick={() => setSelectedTeam('home')}
            variant={selectedTeam === 'home' ? 'default' : 'outline'}
            className="flex-1"
          >
            {match.homeTeam}
          </Button>
          <Button
            onClick={() => setSelectedTeam('away')}
            variant={selectedTeam === 'away' ? 'default' : 'outline'}
            className="flex-1"
          >
            {match.awayTeam}
          </Button>
        </div>
      </div>

      {/* Event buttons organized by category */}
      <div className="space-y-6">
        {eventCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
              {category.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {category.events.map((event) => (
                <Button
                  key={event.type}
                  onClick={() => handleEventClick(event.type, event.points)}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-auto py-3 px-2 text-xs",
                    selectedTeam && `hover:${event.color} hover:text-white`
                  )}
                  disabled={!selectedTeam}
                >
                  <div className="text-center">
                    <div>{event.label}</div>
                    {event.points && (
                      <div className="text-xs text-muted-foreground mt-1">
                        +{event.points} pts
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}