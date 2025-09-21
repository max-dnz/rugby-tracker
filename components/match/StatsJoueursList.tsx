import React from 'react';
import type { Player } from '@/lib/types';
import { useMatchStore } from '@/lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button as UIButton } from '@/components/ui/button';

export function StatsJoueursList({ titulaires, remplacants }: { titulaires: Player[]; remplacants: Player[] }) {
  const { match } = useMatchStore();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<number|null>(null);

  // Regroupe tous les joueurs
  const joueurs = [...titulaires, ...remplacants];

  // Trouve le joueur sélectionné
  const joueur = joueurs.find(j => j.numero === selected);
  // Stats du joueur sélectionné
  const playerEvents = match.events.filter(e => e.player && e.player.numero === selected);
  const statsMap: Record<string, number> = {};
  playerEvents.forEach(e => {
    statsMap[e.type] = (statsMap[e.type] || 0) + 1;
  });

  // Calculs statistiques avancées
  const nbPlaquagesReussis = statsMap['tackle_success'] || 0;
  const nbPlaquagesRates = statsMap['tackle_miss'] || 0;
  const totalPlaquages = nbPlaquagesReussis + nbPlaquagesRates;
  const pctPlaquages = totalPlaquages > 0 ? Math.round((nbPlaquagesReussis / totalPlaquages) * 100) : 0;

  const nbSoutiensPositifs = statsMap['soutien_positif'] || 0;
  const nbSoutiensNegatifs = statsMap['soutien_negatif'] || 0;
  const totalSoutiens = nbSoutiensPositifs + nbSoutiensNegatifs;
  const pctSoutiens = totalSoutiens > 0 ? Math.round((nbSoutiensPositifs / totalSoutiens) * 100) : null;



  // En-avants : knock_on
  const nbEnAvants = statsMap['knock_on'] || 0;

  // Fautes : ruck, plaquage haut, hors jeu, en-avant
  const nbFautesRuck = statsMap['ruck'] || 0;
  const nbFautesPlaquageHaut = statsMap['high_tackle'] || 0;
  const nbFautesHorsJeu = statsMap['offside'] || 0;
  const nbFautes = nbFautesRuck + nbFautesPlaquageHaut + nbFautesHorsJeu;

  return (
    <div>
      <div className="mb-2 font-semibold">Joueurs</div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {joueurs.map(j => (
          <UIButton key={j.numero} onClick={() => { setSelected(j.numero); setOpen(true); }} variant="secondary" className="w-12 h-12 flex items-center justify-center text-lg font-bold">
            {j.numero}
          </UIButton>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Joueur n°{joueur?.numero}
              {joueur?.nom && ` - ${joueur.nom}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>% Plaquages réussis</span>
              <span className="font-bold">{totalPlaquages > 0 ? `${pctPlaquages}% (${nbPlaquagesReussis}/${totalPlaquages})` : '0% (0/0)'}</span>
            </div>
            {/* Ballons grattés retiré */}
            <div className="flex justify-between">
              <span>Efficacité au soutien</span>
              <span className="font-bold">{totalSoutiens > 0 ? `${pctSoutiens}% (${nbSoutiensPositifs}/${totalSoutiens})` : '0% (0/0)'}</span>
            </div>
            {/* Franchissements retiré */}
            {/* Essais retiré */}
            <div className="flex justify-between">
              <span>En-avants</span>
              <span className="font-bold">{nbEnAvants}</span>
            </div>
            <div className="flex justify-between items-end">
              <span>Fautes</span>
              <span className="font-bold">{nbFautes}</span>
            </div>
            <div className="flex justify-end">
              <span className="text-xs text-gray-500 pl-4" style={{marginTop: '-0.5rem'}}>
                {`Ruck: ${nbFautesRuck} · Plaquage haut: ${nbFautesPlaquageHaut} · Hors jeu: ${nbFautesHorsJeu}`}
              </span>
            </div>
          </div>
          <UIButton onClick={() => setOpen(false)} className="mt-4 w-full">Fermer</UIButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}
