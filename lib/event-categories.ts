import { EventCategory } from './types';

export const eventCategories: EventCategory[] = [
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
  {
    name: "Phases de jeu",
    events: [
      { type: "scrum", label: "Mêlée", color: "bg-purple-500" },
      { type: "lineout", label: "Touche", color: "bg-purple-600" },
      { type: "ruck", label: "Ruck", color: "bg-indigo-500" },
      { type: "maul", label: "Maul", color: "bg-indigo-600" },
      { type: "kick_off", label: "Coup d'envoi", color: "bg-cyan-500" },
    ],
  },
  {
    name: "Fautes",
    events: [
      { type: "knock_on", label: "En-avant", color: "bg-orange-500" },
      { type: "forward_pass", label: "Passe en avant", color: "bg-orange-600" },
      { type: "penalty_conceded", label: "Pénalité concédée", color: "bg-red-500" },
      { type: "offside", label: "Hors-jeu", color: "bg-red-600" },
      { type: "high_tackle", label: "Plaquage haut", color: "bg-red-700" },
    ],
  },
  {
    name: "Cartons & Remplacements",
    events: [
      { type: "yellow_card", label: "Carton jaune", color: "bg-yellow-500" },
      { type: "red_card", label: "Carton rouge", color: "bg-red-800" },
      { type: "substitution", label: "Remplacement", color: "bg-teal-500" },
      { type: "injury", label: "Blessure", color: "bg-pink-500" },
      { type: "time_out", label: "Temps mort", color: "bg-gray-700" },
    ],
  },
  {
    name: "Actions défensives",
    events: [
      { type: "tackle", label: "Plaquage", color: "bg-slate-500" },
      { type: "turnover", label: "Turnover", color: "bg-emerald-500" },
    ],
  },
  {
    name: "Gestion du match",
    events: [
      { type: "half_time", label: "Mi-temps", color: "bg-zinc-500" },
      { type: "full_time", label: "Fin du match", color: "bg-zinc-700" },
    ],
  },
];