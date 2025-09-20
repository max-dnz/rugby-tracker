import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";

export function PlayerStatsDialog({ open, onOpenChange, numero, stats }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  numero: number;
  stats: { label: string; value: number }[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Statistiques du joueur n°{numero}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {stats.length === 0 ? (
            <div>Aucune statistique pour ce joueur.</div>
          ) : (
            stats.map((s) => (
              <div key={s.label} className="flex justify-between">
                <span>{s.label}</span>
                <span className="font-bold">{s.value}</span>
              </div>
            ))
          )}
        </div>
        <Button onClick={() => onOpenChange(false)} className="mt-4 w-full">Fermer</Button>
      </DialogContent>
    </Dialog>
  );
}
