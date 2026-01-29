# CLAUDE.md

## Projet

Backoffice gamemaster pour escape game interactif. Gère les inscriptions équipes, sessions de jeu, et communication temps réel avec les mini-jeux.

## Stack

| Couche | Techno                           |
| ------ | -------------------------------- |
| Back   | Express + Socket.IO + TypeScript |
| Front  | React + Vite + TypeScript        |
| DB     | SQLite (better-sqlite3)          |
| Upload | Multer                           |

## Structure

```
escape-backoffice/
├── apps/
│   ├── server/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── db/
│   │   │   ├── routes/
│   │   │   └── socket/
│   │   └── package.json
│   └── client/
│       └── src/
├── public/inscription/
├── uploads/
├── data/
└── pnpm-workspace.yaml
```

## Architecture Socket.IO

**Mini-jeu → Backoffice (register) :**

```js
{
  gameId: "coffre",
  name: "Le Coffre Mystère",
  availableActions: [
    { id: "unlock", label: "Débloquer" },
    { id: "hint", label: "Indice", params: ["level"] }
  ]
}
```

**Backoffice → Mini-jeu (command) :**

```js
{ type: "command", action: "unlock", payload: {} }
```

**Mini-jeu → Backoffice (state_update) :**

```js
{ type: "state_update", state: { solved: true } }
```

## DB Schema

```sql
CREATE TABLE slots (
  id INTEGER PRIMARY KEY,
  label TEXT NOT NULL,
  start_time TEXT NOT NULL,
  max_teams INTEGER DEFAULT 1
);

CREATE TABLE teams (
  id INTEGER PRIMARY KEY,
  slot_id INTEGER REFERENCES slots(id),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participants (
  id INTEGER PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  photo_path TEXT
);

CREATE TABLE sessions (
  id INTEGER PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id),
  status TEXT DEFAULT 'pending',
  started_at TEXT,
  ended_at TEXT
);

CREATE TABLE session_logs (
  id INTEGER PRIMARY KEY,
  session_id INTEGER REFERENCES sessions(id),
  event_type TEXT,
  game_id TEXT,
  payload TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## Conventions

- **Langue code** : Anglais
- **Langue contenu** : Français
- **Commentaires** : Anglais, uniquement si nécessaire
- **Package manager** : pnpm

## Commandes

```bash
pnpm dev            # Lance server + client en parallèle
pnpm dev:server     # Server seul
pnpm dev:client     # Client seul
pnpm lint           # Lint tout
pnpm format         # Format tout
```

## Communication

- Direct et concis
- Pas de validation automatique
- Corriger les erreurs immédiatement
- Proposer des alternatives si approche sous-optimale
