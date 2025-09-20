import React, { useState } from "react";


const defaultTitulaires = [
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
];

const defaultRemplacants = [
  { numero: 16, poste: "Remplaçant 1", nom: "" },
  { numero: 17, poste: "Remplaçant 2", nom: "" },
  { numero: 18, poste: "Remplaçant 3", nom: "" },
  { numero: 19, poste: "Remplaçant 4", nom: "" },
  { numero: 20, poste: "Remplaçant 5", nom: "" },
  { numero: 21, poste: "Remplaçant 6", nom: "" },
  { numero: 22, poste: "Remplaçant 7", nom: "" },
];


type Joueur = { numero: number; poste: string; nom: string };
type Updater<T> = T | ((prev: T) => T);
type CompositionProps = {
  titulaires?: Joueur[];
  setTitulaires?: (t: Updater<Joueur[]>) => void;
  remplacants?: Joueur[];
  setRemplacants?: (r: Updater<Joueur[]>) => void;
  edit?: boolean;
};
export function Composition(props: CompositionProps = {}) {
  // Onglet Composition : tout est local
  const [edit, setEdit] = useState(false);
  // Si props.titulaires/remplacants/setTitulaires/setRemplacants sont fournis, on utilise l'état parent, sinon local
  const [localTitulaires, setLocalTitulaires] = useState(defaultTitulaires);
  const [localRemplacants, setLocalRemplacants] = useState(defaultRemplacants);
  const titulaires = props.titulaires ?? localTitulaires;
  const setTitulaires = props.setTitulaires ?? setLocalTitulaires;
  const remplacants = props.remplacants ?? localRemplacants;
  const setRemplacants = props.setRemplacants ?? setLocalRemplacants;

  const handleNomChange = (index: number, value: string, isRemplaçant = false) => {
    if (isRemplaçant) {
      setRemplacants(remplacants => {
        const arr = [...remplacants];
        arr[index] = { ...arr[index], nom: value };
        return arr;
      });
    } else {
      setTitulaires(titulaires => {
        const arr = [...titulaires];
        arr[index] = { ...arr[index], nom: value };
        return arr;
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center gap-4 mb-2">
        {/* Affiche le titre seulement si on n'est PAS dans l'onglet statistiques */}
        {props.edit !== false && (
          <h2 className="text-xl font-bold">Composition de l&apos;équipe</h2>
        )}
        {/* Bouton Modifier/Valider uniquement si pas de edit en props (onglet composition) */}
        {props.edit === undefined && (
          edit ? (
            <button
              className="text-xs px-2 py-1 rounded border bg-green-700 text-white transition"
              onClick={() => {
                setEdit(false);
                // Si on a des setters parents, on synchronise l'état parent
                if (props.setTitulaires) props.setTitulaires(titulaires);
                if (props.setRemplacants) props.setRemplacants(remplacants);
              }}
            >
              Valider
            </button>
          ) : (
            <button
              className="text-xs px-2 py-1 rounded border bg-white text-green-700 border-green-700 transition"
              onClick={() => setEdit(true)}
            >
              Modifier
            </button>
          )
        )}
      </div>
      <div className="relative w-[420px] h-[500px] bg-green-700 rounded-lg border-4 border-green-900 mb-6">
        {/* Titulaires sur le terrain (diagramme simplifié) */}
        {/* Première ligne */}
        <div className={`absolute left-1/2 top-[10px] flex -translate-x-1/2 ${edit ? 'gap-8' : 'gap-16'}`}>
          {titulaires.slice(0, 3).map((j, i) => (
            <PlayerCircle key={j.numero} numero={j.numero} nom={j.nom} edit={edit} onNomChange={v => handleNomChange(i, v)} />
          ))}
        </div>
        {/* Deuxième ligne */}
        <div className={`absolute left-1/2 top-[90px] flex -translate-x-1/2 ${edit ? 'gap-16' : 'gap-20'}`}>
          {titulaires.slice(3, 5).map((j, i) => (
            <PlayerCircle key={j.numero} numero={j.numero} nom={j.nom} edit={edit} onNomChange={v => handleNomChange(i + 3, v)} />
          ))}
        </div>
        {/* Troisième ligne */}
        <div className={`absolute left-1/2 top-[170px] flex -translate-x-1/2 ${edit ? 'gap-8' : 'gap-14'}`}>
          {titulaires.slice(5, 8).map((j, i) => (
            <PlayerCircle key={j.numero} numero={j.numero} nom={j.nom} edit={edit} onNomChange={v => handleNomChange(i + 5, v)} />
          ))}
        </div>
        {/* Charnière */}
        <div className={`absolute left-1/2 top-[250px] flex -translate-x-1/2 ${edit ? 'gap-8' : 'gap-14'}`}>
          {titulaires.slice(8, 10).map((j, i) => (
            <PlayerCircle key={j.numero} numero={j.numero} nom={j.nom} edit={edit} onNomChange={v => handleNomChange(i + 8, v)} />
          ))}
        </div>
        {/* Trois-quarts */}
          <div className={`absolute left-1/2 top-[330px] flex -translate-x-1/2 ${edit ? 'gap-4' : 'gap-8'}`}>
          {titulaires.slice(10, 14).map((j, i) => (
            <PlayerCircle key={j.numero} numero={j.numero} nom={j.nom} edit={edit} onNomChange={v => handleNomChange(i + 10, v)} />
          ))}
        </div>
        {/* Arrière */}
        <div className="absolute left-1/2 top-[410px] flex -translate-x-1/2">
          <PlayerCircle numero={15} nom={titulaires[14].nom} edit={edit} onNomChange={v => handleNomChange(14, v)} />
        </div>
      </div>
      <div className="w-full max-w-xs mx-auto">
        <h3 className="font-semibold mb-2">Remplaçants</h3>
        <div className="grid grid-cols-2 gap-2">
          {remplacants.map((j, i) => (
            <div key={j.numero} className="flex items-center justify-center gap-2 bg-green-100 rounded px-2 py-1">
              <span className="font-bold text-green-900">{j.numero}</span>
              {edit ? (
                <input
                  className="px-1 py-0.5 border rounded text-sm w-28 text-center"
                  value={j.nom}
                  onChange={e => handleNomChange(i, e.target.value, true)}
                  placeholder="Nom"
                />
              ) : (
                  j.nom && <span className="text-green-900 text-sm font-semibold whitespace-nowrap max-w-[8rem] overflow-hidden text-ellipsis">{j.nom}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rien de plus à afficher dans l'onglet Statistiques */}
    </div>
  );
}

function PlayerCircle({ numero, nom, edit, onNomChange }: {
  numero: number;
  nom?: string;
  edit?: boolean;
  onNomChange?: (v: string) => void;
}) {
  // Dans l'onglet composition (edit ou non), jamais de bouton stats
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-white border-2 border-green-900 flex items-center justify-center font-bold text-green-900 mb-1">
        {numero}
      </div>
      {edit ? (
        <input
          className="mt-1 px-1 py-0.5 border rounded text-sm w-28 text-center"
          value={nom || ""}
          onChange={e => onNomChange && onNomChange(e.target.value)}
          placeholder="Nom"
        />
      ) : (
        nom && <span className="mt-0.5 text-white text-sm font-semibold whitespace-nowrap max-w-[8rem] overflow-hidden text-ellipsis">{nom}</span>
      )}
    </div>
  );
}
