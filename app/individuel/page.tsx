"use client";
import { Composition } from '@/components/match/Composition';
import { MatchTimer } from '@/components/match/MatchTimer';
import React, { useState } from 'react';
import { useMatchStore } from '@/lib/store';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventButtons } from '@/components/match/EventButtons';
import { EventsList } from '@/components/match/EventsList';


export default function IndividuelPage() {
  const { resetMatch } = useMatchStore();
  // État partagé pour la composition
  const [titulaires, setTitulaires] = useState(() => [
    { numero: 1, poste: "Pilier gauche", nom: "" },
    { numero: 2, poste: "Talonneur", nom: "" },
    { numero: 3, poste: "Pilier droit", nom: "" },
    { numero: 4, poste: "Deuxième ligne gauche", nom: "" },
    { numero: 5, poste: "Deuxième ligne droit", nom: "" },
    { numero: 6, poste: "Troisième ligne aile gauche", nom: "" },
    { numero: 7, poste: "Troisième ligne aile droit", nom: "" },
    { numero: 8, poste: "Troisième ligne centre", nom: "" },
    { numero: 9, poste: "Demi de mêlée", nom: "" },
    { numero: 10, poste: "Demi d'ouverture", nom: "" },
    { numero: 11, poste: "Ailier gauche", nom: "" },
    { numero: 12, poste: "Premier centre", nom: "" },
    { numero: 13, poste: "Deuxième centre", nom: "" },
    { numero: 14, poste: "Ailier droit", nom: "" },
    { numero: 15, poste: "Arrière", nom: "" },
  ]);
  const [remplacants, setRemplacants] = useState(() => [
    { numero: 16, poste: "Remplaçant 1", nom: "" },
    { numero: 17, poste: "Remplaçant 2", nom: "" },
    { numero: 18, poste: "Remplaçant 3", nom: "" },
    { numero: 19, poste: "Remplaçant 4", nom: "" },
    { numero: 20, poste: "Remplaçant 5", nom: "" },
    { numero: 21, poste: "Remplaçant 6", nom: "" },
    { numero: 22, poste: "Remplaçant 7", nom: "" },
  ]);

  const handleResetMatch = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le match ? Toutes les données seront perdues.')) {
      resetMatch();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Rugby Match Monitor (Individuel)</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Enregistrez vos statistiques personnelles en temps réel
              </p>
            </div>
            <div>
              <Button
                onClick={handleResetMatch}
                variant="destructive"
                size="sm"
                className="flex-1 sm:flex-initial"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Nouveau</span> Match
              </Button>
            </div>
          </div>
        </div>

        {/* Main grid layout */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Left column - Timer et Composition (éditable) */}
          <div className="space-y-6 lg:col-span-1">
            <MatchTimer />
            <Composition
              titulaires={titulaires}
              setTitulaires={setTitulaires}
              remplacants={remplacants}
              setRemplacants={setRemplacants}
            />
          </div>

          {/* Middle column - Event buttons */}
          <div className="lg:col-span-1">
            <EventButtons />
          </div>

          {/* Right column - Statistiques (affichage composition non éditable) */}
          <div className="lg:col-span-1">
            <div className="mb-4 text-xl font-bold">Statistiques</div>
            <Composition
              titulaires={titulaires}
              remplacants={remplacants}
              edit={false}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Les données sont automatiquement sauvegardées localement. 
            Exportez régulièrement vos données en CSV pour les conserver.
          </p>
        </div>
      </div>
    </div>
  );
}
