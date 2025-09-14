"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMatchStore } from '@/lib/store';
import { Edit2, Check, X } from 'lucide-react';
import { eventCategories } from '@/lib/event-categories';

export function ScoreBoard() {
  const { match, setMatch, setScore, addEvent } = useMatchStore();
  const [isEditingTeams, setIsEditingTeams] = useState(false);
  const [homeTeamName, setHomeTeamName] = useState(match.homeTeam);
  const [awayTeamName, setAwayTeamName] = useState(match.awayTeam);

  const handleSaveTeamNames = () => {
    setMatch({
      homeTeam: homeTeamName,
      awayTeam: awayTeamName,
    });
    setIsEditingTeams(false);
  };

  const handleCancelEdit = () => {
    setHomeTeamName(match.homeTeam);
    setAwayTeamName(match.awayTeam);
    setIsEditingTeams(false);
  };


  // Actions de points rugby (essai, transformation, pénalité, drop)
  const pointEvents = [
    { type: 'try', label: 'Essai', points: 5 },
    { type: 'conversion', label: 'Transformation', points: 2 },
    { type: 'penalty_goal', label: 'Pénalité', points: 3 },
    { type: 'drop_goal', label: 'Drop', points: 3 },
  ];

  // Ajout bouton pénalité manquée
  const handlePenaltyMiss = (team: 'home' | 'away') => {
    addEvent({
      id: Date.now().toString(),
      type: 'penalty_miss',
      timestamp: new Date().toISOString(),
      matchTime: match.currentTime,
      team,
    });
  };

  const handlePointEvent = (team: 'home' | 'away', event: { type: string; label: string; points: number }) => {
    // Ajout événement chronologie
    addEvent({
      id: Date.now().toString(),
  type: event.type as import("@/lib/types").EventType,
      timestamp: new Date().toISOString(),
      matchTime: match.currentTime,
      team,
      points: event.points,
    });
    // Mise à jour score
    const currentScore = team === 'home' ? match.homeScore : match.awayScore;
    setScore(team, currentScore + event.points);
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Score</h2>
        {!isEditingTeams ? (
          <Button
            onClick={() => setIsEditingTeams(true)}
            variant="ghost"
            size="sm"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSaveTeamNames}
              variant="ghost"
              size="sm"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        <div className="text-center">
          {isEditingTeams ? (
            <Input
              value={homeTeamName}
              onChange={(e) => setHomeTeamName(e.target.value)}
              className="text-center mb-2 text-sm sm:text-base"
            />
          ) : (
            <h3 className="text-sm sm:text-lg font-semibold mb-2 truncate">{match.homeTeam}</h3>
          )}
          <div className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">{match.homeScore}</div>
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
            {pointEvents.map((event) => (
              <Button
                key={event.type}
                onClick={() => handlePointEvent('home', event)}
                variant="outline"
                size="sm"
              >
                {event.label} (+{event.points})
              </Button>
            ))}
            <Button
              onClick={() => handlePenaltyMiss('home')}
              variant="outline"
              size="sm"
            >
              Pénalité manquée
            </Button>
          </div>
        </div>

        <div className="text-center">
          {isEditingTeams ? (
            <Input
              value={awayTeamName}
              onChange={(e) => setAwayTeamName(e.target.value)}
              className="text-center mb-2 text-sm sm:text-base"
            />
          ) : (
            <h3 className="text-sm sm:text-lg font-semibold mb-2 truncate">{match.awayTeam}</h3>
          )}
          <div className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">{match.awayScore}</div>
          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
            {pointEvents.map((event) => (
              <Button
                key={event.type}
                onClick={() => handlePointEvent('away', event)}
                variant="outline"
                size="sm"
              >
                {event.label} (+{event.points})
              </Button>
            ))}
            <Button
              onClick={() => handlePenaltyMiss('away')}
              variant="outline"
              size="sm"
            >
              Pénalité manquée
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}