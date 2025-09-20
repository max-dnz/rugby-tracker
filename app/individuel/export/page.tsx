"use client";
import { StatsJoueursList } from '@/components/match/StatsJoueursList';
import type { Player } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ExportIndividuelPage() {
  // Récupère la composition et les noms depuis les paramètres d'URL (ou localStorage fallback)
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  let titulaires: Player[] = [];
  let remplacants: Player[] = [];
  if (typeof window !== 'undefined') {
    try {
      titulaires = JSON.parse(searchParams?.get('titulaires') || localStorage.getItem('titulaires') || '[]');
      remplacants = JSON.parse(searchParams?.get('remplacants') || localStorage.getItem('remplacants') || '[]');
    } catch {
      titulaires = [];
      remplacants = [];
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Export Statistiques Joueurs</h1>
          <p className="text-muted-foreground text-sm">Page export statique, non modifiable</p>
        </div>
        <StatsJoueursList titulaires={titulaires} remplacants={remplacants} />
      </div>
    </div>
  );
}
