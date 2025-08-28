"use client";

import { useMatchStore } from '@/lib/store';

export function LiveStats() {
  const { match } = useMatchStore();

  // Plaquages
  const tacklesSuccess = match.events.filter(e => e.type === 'tackle_success' && e.team === 'home').length;
  const tacklesMiss = match.events.filter(e => e.type === 'tackle_miss' && e.team === 'home').length;
  const tacklesTotal = tacklesSuccess + tacklesMiss;
  const tacklePct = tacklesTotal > 0 ? Math.round((tacklesSuccess / tacklesTotal) * 100) : 0;

  // Ballons perdus/gagnés
  const lostBalls = match.events.filter(e => e.type === 'lost_ball' && e.team === 'home').length;
  const gainedBalls = match.events.filter(e => e.type === 'turnover' && e.team === 'home').length;

  // Rucks perdus
  const lostRucks = match.events.filter(e => e.type === 'lost_ruck' && e.team === 'home').length;

  // Pénalités concédées (total)
  const penalties = match.events.filter(e => e.type === 'penalty_conceded' && e.team === 'home').length;
  // Détail des types de pénalités (exemple : hors-jeu, ruck, plaquage haut)
  const penaltyOffside = match.events.filter(e => e.type === 'offside' && e.team === 'home').length;
  const penaltyRuck = match.events.filter(e => e.type === 'ruck' && e.team === 'home').length;
  const penaltyHighTackle = match.events.filter(e => e.type === 'high_tackle' && e.team === 'home').length;

  // Pénalités obtenues
  const penaltiesWon = match.events.filter(e => e.type === 'penalty_conceded' && e.team === 'away').length;

  // En-avant
  const knockOns = match.events.filter(e => e.type === 'knock_on' && e.team === 'home').length;

  return (
    <div className="mb-4 p-4 rounded-lg border bg-muted">
      <h2 className="text-lg font-bold mb-2">Statistiques</h2>
      {/* Pourcentage de plaquages réussis */}
      <div>
        <span className="font-semibold">% Plaquages réussis :</span> {tacklePct}%
        <span className="pl-2 text-sm text-muted-foreground">({tacklesSuccess} réussis / {tacklesMiss} ratés)</span>
      </div>
      {/* Ballons perdus/gagnés */}
      <div>
        <span className="font-semibold">Ballons perdus :</span> {lostBalls}
      </div>
      <div>
        <span className="font-semibold">Ballons gagnés :</span> {gainedBalls}
      </div>
      {/* Rucks perdus */}
      <div>
        <span className="font-semibold">Rucks perdus :</span> {lostRucks}
      </div>
      {/* Pénalités */}
      <div className="mt-2">
        <span className="font-semibold">Pénalités :</span> {penalties}
      </div>
      <div className="pl-6 text-sm text-muted-foreground">
        <div>Hors-jeu : {penaltyOffside}</div>
        <div>Ruck : {penaltyRuck}</div>
        <div>Plaquage haut : {penaltyHighTackle}</div>
      </div>
      {/* Pénalités obtenues */}
      <div>
        <span className="font-semibold">Pénalités obtenues :</span> {penaltiesWon}
      </div>
      {/* En-avant */}
      <div>
        <span className="font-semibold">En-avant :</span> {knockOns}
      </div>
      {/* Cartons */}
      <div className="mt-2">
        <span className="font-semibold">Cartons reçus :</span>
        <span className="pl-2">Blanc : {match.events.filter(e => e.type === 'white_card' && e.team === 'home').length}</span>
        <span className="pl-2">Jaune : {match.events.filter(e => e.type === 'yellow_card' && e.team === 'home').length}</span>
        <span className="pl-2">Rouge : {match.events.filter(e => e.type === 'red_card' && e.team === 'home').length}</span>
      </div>
      {/* Touches */}
      <div className="mt-2">
        <span className="font-semibold">Touches gagnées / perdues :</span>
        <span className="pl-2">{match.events.filter(e => e.type === 'lineout_won' && e.team === 'home').length} / {match.events.filter(e => e.type === 'lineout_lost' && e.team === 'home').length}</span>
      </div>
      {/* Mêlées */}
      <div>
        <span className="font-semibold">Mêlées gagnées / perdues :</span>
        <span className="pl-2">{match.events.filter(e => e.type === 'scrum_won' && e.team === 'home').length} / {match.events.filter(e => e.type === 'scrum_lost' && e.team === 'home').length}</span>
      </div>
    </div>
  );
}
