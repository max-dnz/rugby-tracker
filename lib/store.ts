import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Match, MatchEvent, Player } from './types';

interface MatchStore {
  match: Match;
  setMatch: (match: Partial<Match>) => void;
  addEvent: (event: MatchEvent) => void;
  updateEvent: (eventId: string, event: Partial<MatchEvent>) => void;
  deleteEvent: (eventId: string) => void;
  setScore: (team: 'home' | 'away', score: number) => void;
  startMatch: () => void;
  pauseMatch: () => void;
  resumeMatch: () => void;
  endMatch: () => void;
  setHalf: (half: 1 | 2) => void;
  updateMatchTime: (time: number) => void;
    addPlayer: (player: Player, team: 'home' | 'away') => void;
  updatePlayer: (playerNumero: number, player: Partial<Player>) => void;
  deletePlayer: (playerNumero: number) => void;
  resetMatch: () => void;
}

const initialMatch: Match = {
  id: '',
  homeTeam: 'ROC HC',
  awayTeam: 'Adversaire',
  homeScore: 0,
  awayScore: 0,
  startTime: null,
  currentTime: 0,
  isRunning: false,
  isPaused: false,
  half: 1,
  events: [],
  homePlayers: [],
  awayPlayers: [],
};

export const useMatchStore = create<MatchStore>()(
  persist(
    (set) => ({
      match: initialMatch,
      
      setMatch: (matchData) =>
        set((state) => ({ match: { ...state.match, ...matchData } })),
      
      addEvent: (event) =>
        set((state) => ({
          match: {
            ...state.match,
            events: [...state.match.events, event],
          },
        })),
      
      updateEvent: (eventId, eventData) =>
        set((state) => ({
          match: {
            ...state.match,
            events: state.match.events.map((e) =>
              e.id === eventId ? { ...e, ...eventData } : e
            ),
          },
        })),
      
      deleteEvent: (eventId) =>
        set((state) => ({
          match: {
            ...state.match,
            events: state.match.events.filter((e) => e.id !== eventId),
          },
        })),
      
      setScore: (team, score) =>
        set((state) => ({
          match: {
            ...state.match,
            [team === 'home' ? 'homeScore' : 'awayScore']: score,
          },
        })),
      
      startMatch: () =>
        set((state) => ({
          match: {
            ...state.match,
            startTime: new Date().toISOString(),
            isRunning: true,
            isPaused: false,
          },
        })),
      
      pauseMatch: () =>
        set((state) => ({
          match: {
            ...state.match,
            isRunning: false,
            isPaused: true,
          },
        })),
      
      resumeMatch: () =>
        set((state) => ({
          match: {
            ...state.match,
            isRunning: true,
            isPaused: false,
          },
        })),
      
      endMatch: () =>
        set((state) => ({
          match: {
            ...state.match,
            isRunning: false,
            isPaused: false,
          },
        })),
      
      setHalf: (half) =>
        set((state) => ({
          match: {
            ...state.match,
            half,
          },
        })),
      
      updateMatchTime: (time) =>
        set((state) => ({
          match: {
            ...state.match,
            currentTime: time,
          },
        })),
      
      addPlayer: (player: Player, team: 'home' | 'away') =>
        set((state) => ({
          match: {
            ...state.match,
            [team === 'home' ? 'homePlayers' : 'awayPlayers']: [
              ...state.match[team === 'home' ? 'homePlayers' : 'awayPlayers'],
              player,
            ],
          },
        })),
      
      updatePlayer: (playerNumero, playerData) =>
        set((state) => ({
          match: {
            ...state.match,
            homePlayers: state.match.homePlayers.map((p) =>
              p.numero === playerNumero ? { ...p, ...playerData } : p
            ),
            awayPlayers: state.match.awayPlayers.map((p) =>
              p.numero === playerNumero ? { ...p, ...playerData } : p
            ),
          },
        })),

      deletePlayer: (playerNumero) =>
        set((state) => ({
          match: {
            ...state.match,
            homePlayers: state.match.homePlayers.filter((p) => p.numero !== playerNumero),
            awayPlayers: state.match.awayPlayers.filter((p) => p.numero !== playerNumero),
          },
        })),
      
      resetMatch: () => set({ match: initialMatch }),
    }),
    {
      name: 'rugby-match-storage',
    }
  )
);