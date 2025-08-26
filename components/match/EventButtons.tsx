"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMatchStore } from '@/lib/store';
import { eventCategories } from '@/lib/event-categories';
import { EventType, Team, MatchEvent } from '@/lib/types';
import { cn } from '@/lib/utils';

export function EventButtons() {
  const { match, addEvent, setScore } = useMatchStore();

  const handleEventClick = (eventType: EventType, points?: number) => {
    const event: MatchEvent = {
      id: Date.now().toString(),
      type: eventType,
      timestamp: new Date().toISOString(),
      matchTime: match.currentTime,
      team: 'home',
      points,
    };

    addEvent(event);

    // Update score if event has points
    if (points && points > 0) {
      const currentScore = match.homeScore;
      setScore('home', currentScore + points);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Actions du match</h2>
      


      {/* Event buttons organized by category (hors actions de points) */}
      <div className="space-y-6">
        {eventCategories.map((category) => {
          // On retire la catégorie Points
          if (category.name === 'Points') return null;
          // Filtrage des événements à masquer
          let filteredEvents = category.events;
          if (category.name === 'Phases de jeu') {
            filteredEvents = filteredEvents.filter(e => e.type !== 'kick_off');
          }
          if (category.name === 'Fautes') {
            filteredEvents = filteredEvents.filter(e => e.type !== 'forward_pass');
          }
          return (
            <div key={category.name}>
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredEvents.map((event) => (
                  <Button
                    key={event.type}
                    onClick={() => handleEventClick(event.type, event.points)}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-auto py-3 px-2 text-xs"
                    )}
                  >
                    <div className="text-center">
                      <div>{event.label}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}