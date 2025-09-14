import { EventCategory } from './types';

export const eventCategories: EventCategory[] = [
  {
    name: "Défense",
    events: [
      { type: "tackle_success", label: "Plaquage réussi", color: "bg-green-500" },
      { type: "tackle_miss", label: "Plaquage raté", color: "bg-red-500" },
  { type: "turnover", label: "Ballon gratté", color: "bg-emerald-500" },
    ],
  },
  {
    name: "Attaque",
    events: [
      { type: "line_break", label: "Franchissement", color: "bg-cyan-500" },
      { type: "kick", label: "Jeu au pied", color: "bg-blue-400" },
      { type: "lost_ruck", label: "Ruck perdu", color: "bg-red-400" },
      { type: "lost_ball", label: "Ballon perdu", color: "bg-orange-400" },
    ],
  },
  {
    name: "Zone de marque",
    events: [
      { type: "entry_22", label: "Entrée dans les 22", color: "bg-blue-300" },
      { type: "phase_play", label: "Phase de jeu", color: "bg-indigo-400" },
      { type: "zone_points", label: "Points marqués", color: "bg-green-400" },
      { type: "zone_lost_ball", label: "Ballon perdu", color: "bg-red-400" },
    ],
  },
  {
    name: "Fautes",
    events: [
      { type: "knock_on", label: "En-avant", color: "bg-orange-500" },
      { type: "high_tackle", label: "Plaquage haut", color: "bg-red-700" },
      { type: "offside", label: "Hors-jeu", color: "bg-red-600" },
      { type: "ruck", label: "Ruck", color: "bg-indigo-500" },
      { type: "penalty_conceded", label: "Pénalité obtenue", color: "bg-red-500" },
    ],
  },
  {
    name: "Phases de jeu",
    events: [
      { type: "lineout_won", label: "Touche gagnée", color: "bg-green-500" },
      { type: "lineout_lost", label: "Touche perdue", color: "bg-red-500" },
  { type: "kick_miss", label: "Coup de pied raté", color: "bg-gray-500" },
    ],
  },
  {
  name: "Cartons",
    events: [
      { type: "yellow_card", label: "Carton jaune", color: "bg-yellow-500" },
      { type: "red_card", label: "Carton rouge", color: "bg-red-800" },
      { type: "white_card", label: "Carton blanc", color: "bg-gray-200 text-black" },
    ],
  },
  {
    name: "Points",
    events: [
      { type: "try", label: "Essai", points: 5, color: "bg-green-500" },
      { type: "conversion", label: "Transformation", points: 2, color: "bg-green-600" },
      { type: "penalty_goal", label: "Pénalité", points: 3, color: "bg-blue-500" },
      { type: "drop_goal", label: "Drop", points: 3, color: "bg-blue-600" },
      { type: "penalty_miss", label: "Pénalité ratée", color: "bg-gray-500" },
      { type: "conversion_miss", label: "Transformation ratée", color: "bg-gray-600" },
    ],
  },
];