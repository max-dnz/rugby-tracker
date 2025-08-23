"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMatchStore } from '@/lib/store';
import { Edit2, Check, X } from 'lucide-react';

export function ScoreBoard() {
  const { match, setMatch, setScore } = useMatchStore();
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

  const adjustScore = (team: 'home' | 'away', delta: number) => {
    const currentScore = team === 'home' ? match.homeScore : match.awayScore;
    const newScore = Math.max(0, currentScore + delta);
    setScore(team, newScore);
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
            <Button
              onClick={() => adjustScore('home', -1)}
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3"
            >
              -1
            </Button>
            <Button
              onClick={() => adjustScore('home', 3)}
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3"
            >
              +3
            </Button>
            <Button
              onClick={() => adjustScore('home', 5)}
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3"
            >
              +5
            </Button>
            <Button
              onClick={() => adjustScore('home', 7)}
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3"
            >
              +7
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
            <Button
              onClick={() => adjustScore('away', -1)}
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3"
            >
              -1
            </Button>
            <Button
              onClick={() => adjustScore('away', 3)}
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3"
            >
              +3
            </Button>
            <Button
              onClick={() => adjustScore('away', 5)}
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3"
            >
              +5
            </Button>
            <Button
              onClick={() => adjustScore('away', 7)}
              variant="outline"
              size="sm"
              className="h-8 px-2 sm:px-3"
            >
              +7
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}