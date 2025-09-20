"use client";
import { Composition } from '@/components/match/Composition';
import { MatchTimer } from '@/components/match/MatchTimer';
import React, { useState, useEffect } from 'react';
import { useMatchStore } from '@/lib/store';
import { RefreshCw, Share2, Copy } from 'lucide-react';
import * as LZString from 'lz-string';
// Pour l'URL export courte
function encodeExportData(titulaires: any[], remplacants: any[]) {
  const data = JSON.stringify({ t: titulaires, r: remplacants });
  if (typeof window !== 'undefined') {
    // LZ-string compresse puis encode en base64 (URL safe)
    return LZString.compressToEncodedURIComponent(data);
  }
  return '';
}
import { Button } from '@/components/ui/button';
import { EventButtonsIndividuel } from '@/components/match/EventButtons';
import { StatsJoueursList } from '@/components/match/StatsJoueursList';
import { EventsList } from '@/components/match/EventsList';


export default function IndividuelPage() {
  const [copied, setCopied] = useState(false);
  const [showExportLink, setShowExportLink] = useState(false);
  const [shortUrl, setShortUrl] = useState<string|null>(null);
  const [loadingShort, setLoadingShort] = useState(false);
  const [shortError, setShortError] = useState<string|null>(null);
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

  // Synchronise la composition dans le localStorage pour EventButtonsIndividuel
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('titulaires', JSON.stringify(titulaires));
      localStorage.setItem('remplacants', JSON.stringify(remplacants));
    }
  }, [titulaires, remplacants]);

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
            <div className="flex flex-col gap-2 items-end">
              {/* Génération du lien export court */}
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={handleResetMatch}
                  variant="destructive"
                  size="sm"
                  className="flex-1 sm:flex-initial"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Nouveau</span> Match
                </Button>
                <Button
                  onClick={async () => {
                    setShowExportLink(v => !v);
                    if (!showExportLink) {
                      setShortUrl(null);
                      setShortError(null);
                      setLoadingShort(true);
                      const exportCode = encodeExportData(titulaires, remplacants);
                      const exportUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/individuel/export?data=${exportCode}`;
                      try {
                        const resp = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(exportUrl)}`);
                        const txt = await resp.text();
                        if (txt.startsWith('Error')) {
                          setShortError('Erreur lors de la génération du lien court');
                        } else {
                          setShortUrl(txt);
                        }
                      } catch {
                        setShortError('Erreur réseau');
                      } finally {
                        setLoadingShort(false);
                      }
                    }
                  }}
                  variant="secondary"
                  size="sm"
                  className="flex-1 sm:flex-initial"
                  title="Afficher le lien d'export (page partageable)"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Export
                </Button>
                {showExportLink && (() => {
                  const exportCode = encodeExportData(titulaires, remplacants);
                  const exportUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/individuel/export?data=${exportCode}`;
                  return (
                    <div className="w-full mt-2">
                      {loadingShort && <span className="text-xs text-muted-foreground">Génération du lien court…</span>}
                      {shortError && (
                        <>
                          <span className="text-xs text-red-600">{shortError}</span>
                          <input
                            type="text"
                            value={exportUrl}
                            readOnly
                            className="w-full px-2 py-1 border rounded text-xs bg-muted mt-1"
                            onFocus={e => e.target.select()}
                          />
                        </>
                      )}
                      {shortUrl && !shortError && (
                        <input
                          type="text"
                          value={shortUrl}
                          readOnly
                          className="w-full px-2 py-1 border rounded text-xs bg-muted"
                          onFocus={e => e.target.select()}
                        />
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
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
            <EventButtonsIndividuel />
          </div>
          {/* Right column - Statistiques et Chronologie */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div>
              <div className="mb-4 text-xl font-bold">Statistiques</div>
              <StatsJoueursList titulaires={titulaires} remplacants={remplacants} />
            </div>
            <EventsList />
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
