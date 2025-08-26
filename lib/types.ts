export type EventType = 
  | "try"
  | "conversion"
  | "penalty_goal"
  | "drop_goal"
  | "penalty_miss"
  | "conversion_miss"
  | "scrum"
  | "lineout"
  | "knock_on"
  | "forward_pass"
  | "penalty_conceded"
  | "yellow_card"
  | "red_card"
  | "substitution"
  | "injury"
  | "kick_off"
  | "half_time"
  | "full_time"
  | "tackle"
  | "turnover"
  | "ruck"
  | "maul"
  | "offside"
  | "high_tackle"
  | "time_out"
  | "lineout_won"
  | "lineout_lost"
  | "scrum_won"
  | "scrum_lost"
  | "white_card"
  | "tackle_success"
  | "tackle_miss"
  | "line_break"
  | "kick"
  | "lost_ruck"
  | "lost_ball";

export type Team = "home" | "away";

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  team: Team;
}

export interface MatchEvent {
  id: string;
  type: EventType;
  timestamp: string; // ISO string for better serialization
  matchTime: number; // in seconds
  team?: Team;
  player?: Player;
  description?: string;
  points?: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: string | null; // ISO string for better serialization
  currentTime: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  half: 1 | 2;
  events: MatchEvent[];
  homePlayers: Player[];
  awayPlayers: Player[];
}

export interface EventCategory {
  name: string;
  events: {
    type: EventType;
    label: string;
    points?: number;
    color: string;
  }[];
}