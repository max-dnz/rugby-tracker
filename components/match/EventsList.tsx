"use client";

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMatchStore } from '@/lib/store';
import { eventCategories } from '@/lib/event-categories';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EventsList() {
  const { match, deleteEvent } = useMatchStore();

  const getEventDetails = (type: string) => {
    for (const category of eventCategories) {
      const event = category.events.find(e => e.type === type);
      if (event) return event;
    }
    return null;
  };

  const formatMatchTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}'${secs.toString().padStart(2, '0')}"`;
  };

  const sortedEvents = [...match.events].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        Chronologie ({match.events.length} événements)
      </h2>
      
      {match.events.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          Aucun événement enregistré
        </p>
      ) : (
        <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
          <div className="space-y-2">
            {sortedEvents.map((event) => {
              const eventDetails = getEventDetails(event.type);
              // Affiche numéro et nom du joueur si dispo, sinon nom équipe
              let playerLabel = '';
              if (event.player) {
                playerLabel = `#${event.player.number}`;
                if (event.player.name && event.player.name !== event.player.position && event.player.name !== `#${event.player.number}`) {
                  playerLabel += ` - ${event.player.name}`;
                }
              }
              const teamName = playerLabel || (event.team === 'home' ? match.homeTeam : match.awayTeam);
              
              return (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors gap-2"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-xs sm:text-sm font-mono text-muted-foreground">
                      {formatMatchTime(event.matchTime)}
                    </div>
                    {eventDetails && (
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full flex-shrink-0",
                          eventDetails.color
                        )}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm sm:text-base truncate">
                        {eventDetails?.label || event.type}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground truncate">
                        {teamName}
                        {event.points && event.type !== 'try' && ` (+${event.points} pts)`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {format(new Date(event.timestamp), 'HH:mm:ss', { locale: fr })}
                    </span>
                    <Button
                      onClick={() => deleteEvent(event.id)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}