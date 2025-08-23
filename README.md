# Rugby Notify

Application web Next.js pour gérer et suivre les notifications liées au rugby.

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/Remenby31/rugby-tracker
cd rugby-tracker

# Installer les dépendances
npm install
```

## 💻 Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build

```bash
# Créer une version de production
npm run build

# Lancer la version de production
npm run start
```

## 🛠️ Technologies utilisées

- **Framework**: Next.js 15.5
- **UI**: React 19.1
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **TypeScript**: Pour le typage statique
- **Composants UI**: Radix UI
- **Parsing CSV**: PapaParse
- **Dates**: date-fns

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Lance l'application en mode production
- `npm run lint` - Vérifie le code avec ESLint

## 📁 Structure du projet

```
rugby-notify/
├── app/           # Pages et layouts Next.js
├── components/    # Composants React réutilisables
├── lib/          # Utilitaires et fonctions helpers
├── public/       # Fichiers statiques
└── styles/       # Fichiers de styles globaux
```