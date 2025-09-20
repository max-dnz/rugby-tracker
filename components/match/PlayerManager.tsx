"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMatchStore } from '@/lib/store';
import { Player, Team } from '@/lib/types';
// Patch useMatchStore type to match new addPlayer signature
type AddPlayerFn = (player: Player, team: 'home' | 'away') => void;
import { UserPlus, Trash2, Users } from 'lucide-react';

export function PlayerManager() {
  const { match, deletePlayer } = useMatchStore();
  const addPlayer = useMatchStore((state) => state.addPlayer as AddPlayerFn);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    number: '',
    position: '',
    team: 'home' as Team,
  });

  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.number) {
      alert('Veuillez remplir au moins le nom et le numéro');
      return;
    }

    const player: Player = {
      numero: parseInt(newPlayer.number),
      poste: newPlayer.position,
      nom: newPlayer.name,
    };

  addPlayer(player, newPlayer.team);
    setNewPlayer({
      name: '',
      number: '',
      position: '',
      team: 'home',
    });
    setShowAddPlayer(false);
  };

  const positions = [
    'Pilier gauche', 'Talonneur', 'Pilier droit',
    'Deuxième ligne', 'Troisième ligne aile', 'Troisième ligne centre',
    'Demi de mêlée', 'Demi d\'ouverture', 'Ailier',
    'Centre', 'Arrière'
  ];

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Joueurs
        </h2>
        <Button
          onClick={() => setShowAddPlayer(!showAddPlayer)}
          variant="outline"
          size="sm"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {showAddPlayer && (
        <div className="mb-4 p-4 border rounded-lg space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Nom du joueur"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Numéro"
              value={newPlayer.number}
              onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={newPlayer.position}
              onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
            >
              <option value="">Position</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={newPlayer.team}
              onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value as Team })}
            >
              <option value="home">{match.homeTeam}</option>
              <option value="away">{match.awayTeam}</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddPlayer} size="sm">
              Ajouter
            </Button>
            <Button
              onClick={() => setShowAddPlayer(false)}
              variant="outline"
              size="sm"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2 text-sm sm:text-base">{match.homeTeam}</h3>
          <ScrollArea className="h-[150px] sm:h-[200px]">
            <div className="space-y-1">
              {match.homePlayers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun joueur</p>
              ) : (
                match.homePlayers.map((player) => (
                  <div
                    key={player.numero}
                    className="flex items-center justify-between p-2 rounded hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm w-6">
                        {player.numero}
                      </span>
                      <div>
                        <div className="text-sm font-medium">{player.nom}</div>
                        {player.poste && (
                          <div className="text-xs text-muted-foreground">
                            {player.poste}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => deletePlayer(player.numero)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-sm sm:text-base">{match.awayTeam}</h3>
          <ScrollArea className="h-[150px] sm:h-[200px]">
            <div className="space-y-1">
              {match.awayPlayers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun joueur</p>
              ) : (
                match.awayPlayers.map((player) => (
                  <div
                    key={player.numero}
                    className="flex items-center justify-between p-2 rounded hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm w-6">
                        {player.numero}
                      </span>
                      <div>
                        <div className="text-sm font-medium">{player.nom}</div>
                        {player.poste && (
                          <div className="text-xs text-muted-foreground">
                            {player.poste}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => deletePlayer(player.numero)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}