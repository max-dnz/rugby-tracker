"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { useMatchStore } from '@/lib/store';
import { eventCategories } from '@/lib/event-categories';
import { EventType, MatchEvent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Player } from '@/lib/types';

// Version COLLECTIF : boutons d'origine (aucun filtre)
export function EventButtons() {
  const { match, addEvent, setScore } = useMatchStore();

  const handleEventClick = (eventType: EventType, points?: number) => {
    const event: MatchEvent = {
      id: Date.now().toString(),
      type: eventType,
      timestamp: new Date().toISOString(),
      matchTime: match.currentTime,
      points,
      team: 'home',
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
      <div className="space-y-6">
        {eventCategories.map((category) => {
          if (category.name === 'Points') return null;
          return (
            <div key={category.name}>
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {category.events.map((event) => (
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

// Version INDIVIDUEL : boutons filtrés et personnalisés
export function EventButtonsIndividuel() {
  const { match, addEvent, setScore } = useMatchStore();
  // Pour le menu joueur
  const [open, setOpen] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<{type: EventType, points?: number} | null>(null);
  // Récupérer la composition depuis le localStorage (synchronisée par la page)
  let titulaires: { numero: number; poste: string; nom: string }[] = [];
  let remplacants: { numero: number; poste: string; nom: string }[] = [];
  if (typeof window !== 'undefined') {
    try {
      titulaires = JSON.parse(localStorage.getItem('titulaires') || '[]');
      remplacants = JSON.parse(localStorage.getItem('remplacants') || '[]');
    } catch {}
  }

  const handleEventClick = (eventType: EventType, points?: number) => {
    setPendingEvent({ type: eventType, points });
    setOpen(true);
  };

  const handleSelectJoueur = (joueur: { numero: number; poste: string; nom: string }) => {
    if (!pendingEvent) return;
    const player: Player = {
      numero: joueur.numero,
      poste: joueur.poste,
      nom: joueur.nom,
    };
    const event: MatchEvent = {
      id: Date.now().toString(),
      type: pendingEvent.type,
      timestamp: new Date().toISOString(),
      matchTime: match.currentTime,
      team: 'home',
      points: pendingEvent.points,
      player,
    };
    addEvent(event);
    if (pendingEvent.points && pendingEvent.points > 0) {
      const currentScore = match.homeScore;
      setScore('home', currentScore + pendingEvent.points);
    }
    setOpen(false);
    setPendingEvent(null);
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Actions du match</h2>
      <div className="space-y-6">
        {eventCategories.map((category) => {
          if (category.name === 'Points') return null;
          if (category.name === 'Zone de marque' || category.name === 'Phases de jeu') return null;
          let filteredEvents = category.events;
          if (category.name === 'Attaque') {
            filteredEvents = filteredEvents.filter(e => !['kick', 'lost_ruck', 'lost_ball'].includes(e.type));
            const rest = filteredEvents.filter(e => !['try', 'line_break'].includes(e.type));
            filteredEvents = [
              { type: 'soutien_positif', label: 'Soutien positif', color: 'bg-yellow-400' },
              { type: 'soutien_negatif', label: 'Soutien négatif', color: 'bg-red-400' },
              { type: 'line_break', label: 'Franchissement', color: 'bg-cyan-500' },
              { type: 'try', label: 'Essai', points: 5, color: 'bg-green-500' },
              ...rest
            ];
          }
          if (category.name === 'Fautes') {
            filteredEvents = filteredEvents.filter(e => e.type !== 'penalty_conceded');
          }
          if (category.name === 'Phases de jeu') {
            filteredEvents = filteredEvents.filter(e => e.type !== 'kick_off');
          }
          if (category.name === 'Fautes') {
            filteredEvents = filteredEvents.filter(e => e.type !== 'forward_pass');
          }
          if (filteredEvents.length === 0) return null;
          return (
            <div key={category.name}>
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredEvents.map((event) => (
                  <Button
                    key={event.type}
                    onClick={() => handleEventClick(event.type as EventType, event.points)}
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

      {/* Menu de sélection du joueur */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sélectionnez le joueur concerné</DialogTitle>
          </DialogHeader>
          <div className="mb-2 font-semibold">Titulaires</div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {titulaires.map(j => (
              <Button key={j.numero} onClick={() => handleSelectJoueur(j)} variant="secondary" className="w-12 h-12 flex items-center justify-center text-lg font-bold">
                {j.numero}
              </Button>
            ))}
          </div>
          <div className="mb-2 font-semibold">Remplaçants</div>
          <div className="grid grid-cols-4 gap-2">
            {remplacants.map(j => (
              <Button key={j.numero} onClick={() => handleSelectJoueur(j)} variant="ghost" className="w-12 h-12 flex items-center justify-center text-lg font-bold">
                {j.numero}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}