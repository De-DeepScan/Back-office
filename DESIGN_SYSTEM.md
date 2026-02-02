# ARIA Design System

> Design system pour les projets liés à ARIA

## Table des matières

1. [Mascotte ARIA (SVG)](#mascotte-aria-svg)
2. [Palette de couleurs](#palette-de-couleurs)
3. [Typographie](#typographie)
4. [Espacement & Layout](#espacement--layout)
5. [Bordures & Ombres](#bordures--ombres)
6. [Animations](#animations)
7. [Composants](#composants)
8. [Effets visuels](#effets-visuels)
9. [Responsive](#responsive)
10. [Variables CSS](#variables-css)

---

## Mascotte ARIA (SVG)

Le chat ARIA est la mascotte centrale du projet. Il existe en deux versions : **Good** (cyan) et **Evil** (rouge).

### SVG Mode Good

```svg
<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
  <!-- Tête - Mode Good -->
  <path
    d="M 35 110
       L 30 35 L 65 75
       Q 100 55, 135 75
       L 170 35 L 165 110
       C 175 140, 145 175, 100 175
       C 55 175, 25 140, 35 110 Z"
    fill="none"
    stroke="#00ffff"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="cat-line"
  />

  <!-- Oeil unique central -->
  <g class="eye">
    <path
      d="M 55 115
         Q 65 100, 100 85
         Q 135 100, 145 115
         Q 135 130, 100 145
         Q 65 130, 55 115 Z"
      fill="none"
      stroke="#00ffff"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Pupille verticale -->
    <line
      x1="100"
      y1="95"
      x2="100"
      y2="135"
      stroke="#00ffff"
      stroke-width="3"
      stroke-linecap="round"
      class="eye-pupil"
    />
  </g>

  <!-- Moustaches gauche -->
  <line x1="0" y1="100" x2="45" y2="115" stroke="#00ffff" stroke-width="2" stroke-linecap="round" class="whisker" />
  <line x1="-5" y1="120" x2="45" y2="125" stroke="#00ffff" stroke-width="2" stroke-linecap="round" class="whisker" />
  <line x1="0" y1="140" x2="45" y2="135" stroke="#00ffff" stroke-width="2" stroke-linecap="round" class="whisker" />

  <!-- Moustaches droite -->
  <line x1="155" y1="115" x2="200" y2="100" stroke="#00ffff" stroke-width="2" stroke-linecap="round" class="whisker" />
  <line x1="155" y1="125" x2="205" y2="120" stroke="#00ffff" stroke-width="2" stroke-linecap="round" class="whisker" />
  <line x1="155" y1="135" x2="200" y2="140" stroke="#00ffff" stroke-width="2" stroke-linecap="round" class="whisker" />
</svg>
```

### SVG Mode Evil

```svg
<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
  <!-- Tête - Mode Evil (oreilles plus pointues) -->
  <path
    d="M 35 110
       L 15 55 L 55 80
       Q 100 60, 145 80
       L 185 55 L 165 110
       C 175 140, 145 175, 100 175
       C 55 175, 25 140, 35 110 Z"
    fill="none"
    stroke="#ff0000"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="cat-line"
  />

  <!-- Oeil unique - plus étroit en mode Evil -->
  <g class="eye">
    <path
      d="M 50 115
         Q 65 105, 100 100
         Q 135 105, 150 115
         Q 135 125, 100 130
         Q 65 125, 50 115 Z"
      fill="none"
      stroke="#ff0000"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Pupille verticale -->
    <line
      x1="100"
      y1="103"
      x2="100"
      y2="127"
      stroke="#ff0000"
      stroke-width="3"
      stroke-linecap="round"
      class="eye-pupil"
    />
  </g>

  <!-- Moustaches gauche (plus agressives) -->
  <line x1="-10" y1="95" x2="45" y2="115" stroke="#ff0000" stroke-width="2" stroke-linecap="round" class="whisker" />
  <line x1="-15" y1="120" x2="45" y2="120" stroke="#ff0000" stroke-width="2" stroke-linecap="round" class="whisker" />
  <line x1="-10" y1="145" x2="45" y2="135" stroke="#ff0000" stroke-width="2" stroke-linecap="round" class="whisker" />

  <!-- Moustaches droite (plus agressives) -->
  <line x1="155" y1="115" x2="210" y2="95" stroke="#ff0000" stroke-width="2" stroke-linecap="round" class="whisker" />
  <line x1="155" y1="120" x2="215" y2="120" stroke="#ff0000" stroke-width="2" stroke-linecap="round" class="whisker" />
  <line x1="155" y1="135" x2="210" y2="145" stroke="#ff0000" stroke-width="2" stroke-linecap="round" class="whisker" />
</svg>
```

### Différences entre les modes

| Élément    | Mode Good           | Mode Evil                     |
| ---------- | ------------------- | ----------------------------- |
| Couleur    | `#00ffff` (cyan)    | `#ff0000` (rouge)             |
| Oreilles   | Normales (30°)      | Plus pointues et hautes (45°) |
| Oeil       | Large, rond         | Étroit, menaçant              |
| Pupille    | Y: 95 → 135         | Y: 103 → 127 (plus courte)    |
| Moustaches | Horizontales douces | Inclinées agressivement       |

### Styles CSS pour le SVG

```css
/* Container du SVG */
.aria-cat-svg {
  width: 400px;
  height: 360px;
  color: var(--color-primary); /* Hérite la couleur */
  filter: drop-shadow(0 0 15px var(--color-primary-glow-medium));
  transition: filter 0.3s ease;
}

/* Mode Evil */
.aria-cat-svg.evil {
  color: var(--color-danger);
  filter: drop-shadow(0 0 15px var(--color-danger-glow));
}

/* Animation de dessin (apparition) */
.cat-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

/* Animation des moustaches */
.whisker {
  transform-origin: right center;
  animation: whiskerTwitch 4s ease-in-out infinite;
}

.whisker:nth-child(odd) {
  animation-delay: 0.1s;
}

@keyframes whiskerTwitch {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(2deg);
  }
  75% {
    transform: rotate(-2deg);
  }
}

/* Clignement de l'oeil */
.eye {
  transition: opacity 0.1s;
}

.eye.blink {
  opacity: 0;
}

/* Oeil fermé (ligne horizontale pour le clignement) */
.eye-closed {
  opacity: 0;
  transition: opacity 0.1s;
}

.eye-closed.show {
  opacity: 1;
}

/* Pupille avec suivi du regard */
.eye-pupil {
  transition: all 0.2s ease-out;
}
```

### Utilisation en React/JSX

```jsx
// Utilisation avec currentColor pour héritage de couleur
<svg viewBox="0 0 200 180" className="aria-cat-svg">
  <path
    d="M 35 110 L 30 35 L 65 75 Q 100 55, 135 75 L 170 35 L 165 110 C 175 140, 145 175, 100 175 C 55 175, 25 140, 35 110 Z"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  />
  {/* ... autres éléments */}
</svg>
```

### Animation autonome de l'oeil (sans webcam)

Pour les projets sans détection de visage, utiliser cette animation CSS pure qui fait regarder l'oeil de gauche à droite avec clignement périodique.

#### CSS - Keyframes

```css
/* Animation du regard gauche-droite */
@keyframes eyeLookAround {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-8px); /* Regarde à gauche */
  }
  40% {
    transform: translateX(-8px);
  }
  60% {
    transform: translateX(8px); /* Regarde à droite */
  }
  80% {
    transform: translateX(8px);
  }
}

/* Animation de clignement */
@keyframes eyeBlink {
  0%,
  9%,
  11%,
  100% {
    transform: scaleY(1);
  }
  10% {
    transform: scaleY(0.1); /* Oeil fermé */
  }
}

/* Animation combinée : regard + clignement décalé */
@keyframes eyeBlinkOnly {
  0%,
  45%,
  55%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
```

#### CSS - Application sur les éléments

```css
/* Pupille qui regarde autour */
.eye-pupil {
  animation: eyeLookAround 4s ease-in-out infinite;
}

/* Oeil qui cligne (appliqué au groupe .eye) */
.eye {
  transform-origin: center;
  animation: eyeBlink 3s ease-in-out infinite;
}

/* Alternative : cacher l'oeil ouvert et montrer la ligne fermée */
.eye-open {
  animation: eyeBlinkOnly 4s ease-in-out infinite;
}

.eye-closed-line {
  opacity: 0;
  animation: eyeBlinkOnly 4s ease-in-out infinite reverse;
}
```

#### Exemple complet SVG avec animations CSS

```svg
<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" class="aria-cat-svg">
  <style>
    .eye-pupil {
      animation: eyeLookAround 4s ease-in-out infinite;
    }
    .eye-group {
      transform-origin: 100px 115px;
      animation: eyeBlink 3.5s ease-in-out infinite;
    }
    .eye-closed-line {
      opacity: 0;
    }

    @keyframes eyeLookAround {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      50% { transform: translateX(0); }
      75% { transform: translateX(8px); }
    }

    @keyframes eyeBlink {
      0%, 42%, 48%, 100% { transform: scaleY(1); }
      45% { transform: scaleY(0.1); }
    }
  </style>

  <!-- Tête -->
  <path
    d="M 35 110 L 30 35 L 65 75 Q 100 55, 135 75 L 170 35 L 165 110 C 175 140, 145 175, 100 175 C 55 175, 25 140, 35 110 Z"
    fill="none"
    stroke="#00ffff"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- Oeil avec animation -->
  <g class="eye-group">
    <path
      d="M 55 115 Q 65 100, 100 85 Q 135 100, 145 115 Q 135 130, 100 145 Q 65 130, 55 115 Z"
      fill="none"
      stroke="#00ffff"
      stroke-width="3"
    />
    <!-- Pupille animée -->
    <line
      x1="100" y1="95"
      x2="100" y2="135"
      stroke="#00ffff"
      stroke-width="3"
      stroke-linecap="round"
      class="eye-pupil"
    />
  </g>

  <!-- Ligne oeil fermé (visible uniquement pendant le blink via CSS) -->
  <line
    x1="55" y1="115"
    x2="145" y2="115"
    stroke="#00ffff"
    stroke-width="3"
    stroke-linecap="round"
    class="eye-closed-line"
  />

  <!-- Moustaches -->
  <line x1="0" y1="100" x2="45" y2="115" stroke="#00ffff" stroke-width="2" stroke-linecap="round" />
  <line x1="-5" y1="120" x2="45" y2="125" stroke="#00ffff" stroke-width="2" stroke-linecap="round" />
  <line x1="0" y1="140" x2="45" y2="135" stroke="#00ffff" stroke-width="2" stroke-linecap="round" />
  <line x1="155" y1="115" x2="200" y2="100" stroke="#00ffff" stroke-width="2" stroke-linecap="round" />
  <line x1="155" y1="125" x2="205" y2="120" stroke="#00ffff" stroke-width="2" stroke-linecap="round" />
  <line x1="155" y1="135" x2="200" y2="140" stroke="#00ffff" stroke-width="2" stroke-linecap="round" />
</svg>
```

#### Version React/JSX avec animations

```jsx
import "./AriaCat.css"; // Contient les keyframes

function AriaCatSimple({ isEvil = false }) {
  const color = isEvil ? "#ff0000" : "#00ffff";

  return (
    <svg
      viewBox="0 0 200 180"
      className={`aria-cat-svg ${isEvil ? "evil" : ""}`}
    >
      {/* Tête */}
      <path
        d={
          isEvil
            ? "M 35 110 L 15 55 L 55 80 Q 100 60, 145 80 L 185 55 L 165 110 C 175 140, 145 175, 100 175 C 55 175, 25 140, 35 110 Z"
            : "M 35 110 L 30 35 L 65 75 Q 100 55, 135 75 L 170 35 L 165 110 C 175 140, 145 175, 100 175 C 55 175, 25 140, 35 110 Z"
        }
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Oeil avec animation */}
      <g className="eye-group">
        <path
          d={
            isEvil
              ? "M 50 115 Q 65 105, 100 100 Q 135 105, 150 115 Q 135 125, 100 130 Q 65 125, 50 115 Z"
              : "M 55 115 Q 65 100, 100 85 Q 135 100, 145 115 Q 135 130, 100 145 Q 65 130, 55 115 Z"
          }
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
        <line
          x1="100"
          y1={isEvil ? 103 : 95}
          x2="100"
          y2={isEvil ? 127 : 135}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          className="eye-pupil"
        />
      </g>

      {/* Moustaches */}
      {/* ... moustaches ici ... */}
    </svg>
  );
}
```

#### Fichier CSS associé (AriaCat.css)

```css
/* === ANIMATIONS OEIL ARIA === */

/* Regard gauche-droite */
@keyframes eyeLookAround {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  30% {
    transform: translateX(-8px);
  }
  70%,
  80% {
    transform: translateX(8px);
  }
}

/* Clignement */
@keyframes eyeBlink {
  0%,
  42%,
  48%,
  100% {
    transform: scaleY(1);
  }
  45% {
    transform: scaleY(0.1);
  }
}

/* Application */
.eye-pupil {
  animation: eyeLookAround 4s ease-in-out infinite;
}

.eye-group {
  transform-origin: 100px 115px; /* Centre de l'oeil */
  animation: eyeBlink 3.5s ease-in-out infinite;
}

/* Timing décalé pour effet naturel */
.aria-cat-svg:nth-child(2n) .eye-group {
  animation-delay: 0.5s;
}

.aria-cat-svg:nth-child(2n) .eye-pupil {
  animation-delay: 1s;
}
```

#### Paramètres ajustables

| Paramètre        | Valeur par défaut    | Description                      |
| ---------------- | -------------------- | -------------------------------- |
| Durée regard     | `4s`                 | Cycle complet gauche-droite      |
| Durée clignement | `3.5s`               | Intervalle entre clignements     |
| Amplitude regard | `8px`                | Distance du mouvement horizontal |
| Durée fermeture  | `~0.2s` (6% de 3.5s) | Temps oeil fermé                 |

### Animations de la pupille (suivi webcam)

Pour les projets avec détection de visage (face-api.js), utiliser le suivi dynamique :

```jsx
// Offset de la pupille basé sur la position du visage détecté
const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

// Dans le SVG
<line
  x1={100 + pupilOffset.x}
  y1={95 + pupilOffset.y}
  x2={100 + pupilOffset.x}
  y2={135 + pupilOffset.y}
  stroke="currentColor"
  strokeWidth="3"
  style={{ transition: "all 0.2s ease-out" }}
/>;
```

### États visuels

| État        | Animation                      | Durée |
| ----------- | ------------------------------ | ----- |
| Idle        | `float` (flottement vertical)  | 3s    |
| Thinking    | `float` rapide + glow intense  | 1.5s  |
| Speaking    | `speakingPulse` + glow pulsé   | 0.8s  |
| Blinking    | Oeil opacity 0 → 1             | 0.15s |
| Evil Glitch | `screenGlitch` + `evilFlicker` | 0.8s  |

---

## Palette de couleurs

### Mode "Good" (Cyan)

| Token                         | Valeur                   | Usage                              |
| ----------------------------- | ------------------------ | ---------------------------------- |
| `--color-primary`             | `#00ffff`                | Accent principal, bordures actives |
| `--color-primary-glow-soft`   | `rgba(0, 255, 255, 0.3)` | Ombres légères                     |
| `--color-primary-glow-medium` | `rgba(0, 255, 255, 0.5)` | Hover states                       |
| `--color-primary-glow-strong` | `rgba(0, 255, 255, 0.8)` | États actifs                       |
| `--color-secondary`           | `#006666`                | Éléments secondaires (sound bars)  |

### Mode "Evil" (Rouge)

| Token                      | Valeur                 | Usage                     |
| -------------------------- | ---------------------- | ------------------------- |
| `--color-danger`           | `#ff0000`              | Accent principal evil     |
| `--color-danger-dark`      | `#8b0000`              | Rouge foncé, ombres       |
| `--color-danger-light`     | `#ff3333`              | Highlights                |
| `--color-danger-glow`      | `rgba(255, 0, 0, 0.3)` | Ombres evil               |
| `--color-danger-secondary` | `#4a0000`              | Éléments secondaires evil |

### Neutres

| Token                    | Valeur                      | Usage                |
| ------------------------ | --------------------------- | -------------------- |
| `--color-bg-deep`        | `#0a0a0a`                   | Background principal |
| `--color-bg-surface`     | `#1a1a1a`                   | Surfaces élevées     |
| `--color-bg-elevated`    | `#242424`                   | Boutons, cartes      |
| `--color-text-primary`   | `rgba(255, 255, 255, 0.87)` | Texte principal      |
| `--color-text-secondary` | `rgba(255, 255, 255, 0.6)`  | Texte secondaire     |
| `--color-text-muted`     | `rgba(255, 255, 255, 0.4)`  | Texte désactivé      |

### Effets spéciaux

| Token                    | Valeur                 | Usage              |
| ------------------------ | ---------------------- | ------------------ |
| `--color-glitch-magenta` | `#f0f`                 | Effet glitch       |
| `--color-glitch-yellow`  | `#ff0`                 | Effet glitch       |
| `--color-overlay-dark`   | `rgba(0, 20, 20, 0.9)` | Overlay de message |

---

## Typographie

### Familles de polices

```css
/* Police principale - Esthétique terminal */
--font-primary: "Courier New", Courier, monospace;

/* Police système - Fallback */
--font-system: system-ui, Avenir, Helvetica, Arial, sans-serif;
```

### Échelle typographique

| Token         | Taille    | Usage                    |
| ------------- | --------- | ------------------------ |
| `--text-xs`   | `0.6rem`  | Labels minuscules        |
| `--text-sm`   | `0.7rem`  | Timestamps, métadonnées  |
| `--text-base` | `0.85rem` | Texte de chat            |
| `--text-md`   | `0.9rem`  | Messages, corps de texte |
| `--text-lg`   | `1rem`    | Sous-titres              |
| `--text-xl`   | `1.5rem`  | Titres de section        |
| `--text-2xl`  | `2.5rem`  | Titre principal          |
| `--text-3xl`  | `3.2rem`  | Hero text                |

### Propriétés typographiques

```css
/* Titres */
.title {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8em;
  line-height: 1.1;
}

/* Corps de texte */
.body {
  font-family: var(--font-primary);
  font-size: var(--text-md);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 1px;
}

/* Labels */
.label {
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 3px;
}
```

---

## Espacement & Layout

### Échelle d'espacement

| Token         | Valeur    | Usage                  |
| ------------- | --------- | ---------------------- |
| `--space-xs`  | `0.25rem` | Micro-espacement       |
| `--space-sm`  | `0.5rem`  | Espacement serré       |
| `--space-md`  | `0.75rem` | Espacement standard    |
| `--space-lg`  | `1rem`    | Espacement confortable |
| `--space-xl`  | `1.5rem`  | Espacement large       |
| `--space-2xl` | `2rem`    | Espacement de section  |

### Dimensions de conteneurs

```css
/* Conteneur principal */
.container {
  width: 100%;
  max-width: 420px;
  padding: var(--space-xl);
}

/* Chat container */
.chat-container {
  width: 420px;
  max-height: 60vh;
}

/* SVG principal */
.aria-svg {
  width: 400px;
  height: 360px;
}
```

### Patterns de layout

```css
/* Centrage flex */
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* Grille de fond */
.grid-background {
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

---

## Bordures & Ombres

### Bordures

| Token                  | Valeur      | Usage              |
| ---------------------- | ----------- | ------------------ |
| `--border-thin`        | `1px solid` | Bordures subtiles  |
| `--border-medium`      | `2px solid` | Contrôles, inputs  |
| `--border-radius-none` | `0`         | Esthétique brutale |
| `--border-radius-sm`   | `4px`       | Léger arrondi      |
| `--border-radius-md`   | `8px`       | Boutons            |
| `--border-radius-full` | `50%`       | Cercles            |

### Box Shadows (Mode Good)

```css
/* Ombre subtile */
--shadow-glow-soft: 0 0 10px rgba(0, 255, 255, 0.3);

/* Ombre moyenne */
--shadow-glow-medium: 0 0 20px rgba(0, 255, 255, 0.4);

/* Ombre intense */
--shadow-glow-strong: 0 0 30px rgba(0, 255, 255, 0.8);

/* Ombre interne */
--shadow-inset: inset 0 0 20px rgba(0, 255, 255, 0.05);
```

### Box Shadows (Mode Evil)

```css
--shadow-evil-soft: 0 0 10px rgba(255, 51, 51, 0.2);
--shadow-evil-medium: 0 0 20px rgba(255, 0, 0, 0.4);
--shadow-evil-strong: 0 0 30px rgba(255, 0, 0, 0.8);
```

---

## Animations

### Timing functions

```css
--ease-default: ease;
--ease-smooth: ease-in-out;
--ease-out: ease-out;
--ease-bounce: cubic-bezier(0.4, 0, 0.2, 1);
```

### Durées

| Token                | Valeur    | Usage                       |
| -------------------- | --------- | --------------------------- |
| `--duration-instant` | `0.1s`    | Flicker, micro-interactions |
| `--duration-fast`    | `0.3s`    | Transitions UI              |
| `--duration-normal`  | `0.5s`    | Animations d'entrée         |
| `--duration-slow`    | `0.8s`    | Animations complexes        |
| `--duration-ambient` | `2s - 4s` | Animations ambiantes        |
| `--duration-orbital` | `20s`     | Rotations lentes            |

### Keyframes essentiels

```css
/* Flottement vertical */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Pulsation */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

/* Clignotement curseur */
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* Flicker CRT */
@keyframes crtFlicker {
  0%,
  100% {
    opacity: 0.97;
  }
  50% {
    opacity: 1;
  }
}

/* Scanline */
@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
}

/* Glitch text */
@keyframes letterGlitch {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
  20% {
    transform: translate(-2px, 1px);
    opacity: 0.8;
  }
  40% {
    transform: translate(2px, -1px);
    opacity: 0.9;
  }
  60% {
    transform: translate(-1px, 2px);
    opacity: 0.7;
  }
  80% {
    transform: translate(1px, -2px);
    opacity: 1;
  }
}

/* Apparition de message */
@keyframes messageAppear {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Bounce pour typing indicator */
@keyframes typingBounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}

/* Evil flicker intense */
@keyframes evilFlicker {
  0%,
  100% {
    opacity: 1;
  }
  10% {
    opacity: 0.8;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
  }
  70% {
    opacity: 0.85;
  }
  80% {
    opacity: 1;
  }
}

/* Screen glitch */
@keyframes screenGlitch {
  0% {
    filter: hue-rotate(0deg) saturate(100%);
    transform: translate(0);
  }
  10% {
    filter: hue-rotate(90deg) saturate(200%);
    transform: translate(-2px, 1px);
  }
  20% {
    filter: hue-rotate(180deg) saturate(150%);
    transform: translate(2px, -1px);
  }
  30% {
    filter: hue-rotate(270deg) saturate(300%);
    transform: translate(-1px, -1px);
  }
  40%,
  100% {
    filter: hue-rotate(0deg) saturate(100%);
    transform: translate(0);
  }
}
```

### Classes utilitaires d'animation

```css
.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.animate-blink {
  animation: blink 0.8s step-end infinite;
}

.animate-glitch {
  animation: letterGlitch 4s ease-in-out infinite;
}
```

---

## Composants

### Bouton primaire

```css
.btn-primary {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;

  padding: var(--space-md) var(--space-xl);

  background: var(--color-bg-elevated);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--border-radius-md);

  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: rgba(0, 255, 255, 0.1);
  box-shadow: var(--shadow-glow-medium);
}

.btn-primary:active {
  animation: btnPulse 0.3s ease;
}

/* Variante Evil */
.btn-primary.evil {
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.btn-primary.evil:hover {
  background: rgba(255, 0, 0, 0.1);
  box-shadow: var(--shadow-evil-medium);
}
```

### Message box

```css
.message-box {
  position: relative;
  padding: var(--space-xl);
  margin-top: var(--space-2xl);

  background: var(--color-overlay-dark);
  border: 1px solid var(--color-primary);

  font-family: var(--font-primary);
  font-size: var(--text-md);
  color: var(--color-primary);
  text-align: left;
  line-height: 1.6;
}

/* Label */
.message-box::before {
  content: "# STATUS";
  position: absolute;
  top: -10px;
  left: 10px;
  padding: 0 var(--space-sm);

  background: var(--color-bg-deep);
  font-size: var(--text-xs);
  letter-spacing: 3px;
  color: var(--color-primary);
}

/* Curseur clignotant */
.message-box::after {
  content: "_";
  animation: blink 0.8s step-end infinite;
}

/* Variante Evil */
.message-box.evil {
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.message-box.evil::before {
  content: "! DANGER !";
  color: var(--color-danger);
}
```

### Toggle switch

```css
.toggle-switch {
  position: relative;
  width: 60px;
  height: 30px;

  background: transparent;
  border: 2px solid var(--color-primary);
  border-radius: 0;

  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-switch::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;

  background: var(--color-primary);
  border-radius: 50%;

  transition: all 0.3s ease;
}

.toggle-switch.active::after {
  left: calc(100% - 23px);
  background: var(--color-danger);
}

.toggle-switch.active {
  border-color: var(--color-danger);
}
```

### Chat container

```css
.chat-container {
  position: fixed;
  bottom: var(--space-2xl);
  right: var(--space-2xl);

  width: 420px;
  max-height: 60vh;

  background: rgba(20, 0, 0, 0.95);
  border: 1px solid var(--color-danger);

  display: flex;
  flex-direction: column;

  animation: chatAppear 0.5s ease-out;
}

@keyframes chatAppear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.chat-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);

  border-bottom: 1px solid rgba(255, 0, 0, 0.3);
}

.chat-status-dot {
  width: 8px;
  height: 8px;
  background: var(--color-danger);
  border-radius: 50%;
  animation: statusPulse 1s ease-in-out infinite;
}

@keyframes statusPulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 5px var(--color-danger);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 10px var(--color-danger);
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-lg);

  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.chat-message {
  padding: var(--space-sm) var(--space-md);
  padding-left: var(--space-lg);

  border-left: 2px solid var(--color-danger-light);

  font-family: var(--font-primary);
  font-size: var(--text-base);
  color: var(--color-text-secondary);

  animation: messageAppear 0.3s ease-out;
}
```

### Typing indicator

```css
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: var(--space-sm) var(--space-md);
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: var(--color-danger-light);
  border-radius: 50%;
  animation: typingBounce 1.4s ease-in-out infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}
```

---

## Effets visuels

### CRT Overlay

```css
.crt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

/* Scanlines */
.crt-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );

  animation: crtFlicker 0.1s infinite;
}

/* Scanline mobile */
.crt-overlay::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;

  background: rgba(0, 255, 255, 0.1);

  animation: scanline 4s linear infinite;
}
```

### Glow effect (SVG)

```css
.glow-effect {
  filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.6));
  transition: filter 0.3s ease;
}

.glow-effect.intense {
  filter: drop-shadow(0 0 40px rgba(0, 255, 255, 1));
}

.glow-effect.evil {
  filter: drop-shadow(0 0 30px rgba(139, 0, 0, 1));
}
```

### Glitch overlay

```css
.glitch-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 0, 0, 0.1) 45%,
    rgba(0, 255, 255, 0.1) 50%,
    transparent 55%
  );

  mix-blend-mode: overlay;
  pointer-events: none;

  animation: glitchOverlay 4s ease-in-out infinite;
}

@keyframes glitchOverlay {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
}
```

### Orbital borders

```css
.orbital-border {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  height: 500px;

  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 50%;

  animation: orbit-rotate 20s linear infinite;
}

@keyframes orbit-rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

---

## Responsive

### Breakpoint principal

```css
@media (max-width: 600px) {
  /* Typographie */
  .title {
    font-size: 1.8rem;
    letter-spacing: 0.5em;
  }

  /* SVG */
  .aria-svg {
    width: 200px;
    height: 180px;
  }

  /* Message box */
  .message-box {
    width: 90%;
  }

  /* Chat container */
  .chat-container {
    width: calc(100% - 2rem);
    left: 1rem;
    right: 1rem;
  }

  .chat-messages {
    max-height: 200px;
  }

  /* Toggle */
  .toggle-switch {
    width: 50px;
    height: 26px;
  }

  /* Contrôles */
  .controls {
    padding: var(--space-lg);
  }
}
```

---

## Variables CSS

### Fichier de tokens complet

```css
:root {
  /* Colors - Good Mode */
  --color-primary: #00ffff;
  --color-primary-glow-soft: rgba(0, 255, 255, 0.3);
  --color-primary-glow-medium: rgba(0, 255, 255, 0.5);
  --color-primary-glow-strong: rgba(0, 255, 255, 0.8);
  --color-secondary: #006666;

  /* Colors - Evil Mode */
  --color-danger: #ff0000;
  --color-danger-dark: #8b0000;
  --color-danger-light: #ff3333;
  --color-danger-glow: rgba(255, 0, 0, 0.3);
  --color-danger-secondary: #4a0000;

  /* Colors - Neutral */
  --color-bg-deep: #0a0a0a;
  --color-bg-surface: #1a1a1a;
  --color-bg-elevated: #242424;
  --color-text-primary: rgba(255, 255, 255, 0.87);
  --color-text-secondary: rgba(255, 255, 255, 0.6);
  --color-text-muted: rgba(255, 255, 255, 0.4);

  /* Colors - Effects */
  --color-glitch-magenta: #f0f;
  --color-glitch-yellow: #ff0;
  --color-overlay-dark: rgba(0, 20, 20, 0.9);

  /* Typography */
  --font-primary: "Courier New", Courier, monospace;
  --font-system: system-ui, Avenir, Helvetica, Arial, sans-serif;

  --text-xs: 0.6rem;
  --text-sm: 0.7rem;
  --text-base: 0.85rem;
  --text-md: 0.9rem;
  --text-lg: 1rem;
  --text-xl: 1.5rem;
  --text-2xl: 2.5rem;
  --text-3xl: 3.2rem;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 0.75rem;
  --space-lg: 1rem;
  --space-xl: 1.5rem;
  --space-2xl: 2rem;

  /* Borders */
  --border-thin: 1px solid;
  --border-medium: 2px solid;
  --border-radius-none: 0;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-full: 50%;

  /* Shadows */
  --shadow-glow-soft: 0 0 10px rgba(0, 255, 255, 0.3);
  --shadow-glow-medium: 0 0 20px rgba(0, 255, 255, 0.4);
  --shadow-glow-strong: 0 0 30px rgba(0, 255, 255, 0.8);
  --shadow-inset: inset 0 0 20px rgba(0, 255, 255, 0.05);
  --shadow-evil-soft: 0 0 10px rgba(255, 51, 51, 0.2);
  --shadow-evil-medium: 0 0 20px rgba(255, 0, 0, 0.4);
  --shadow-evil-strong: 0 0 30px rgba(255, 0, 0, 0.8);

  /* Animation */
  --ease-default: ease;
  --ease-smooth: ease-in-out;
  --ease-out: ease-out;
  --ease-bounce: cubic-bezier(0.4, 0, 0.2, 1);

  --duration-instant: 0.1s;
  --duration-fast: 0.3s;
  --duration-normal: 0.5s;
  --duration-slow: 0.8s;
}
```

---

## Principes de design

1. **Esthétique Terminal/Cyber** - Polices monospace, texte uppercase, couleurs monochromes
2. **Dualité Good/Evil** - Mode cyan vs rouge avec override complet des styles
3. **Feeling CRT rétro** - Scanlines, grilles, effets de flicker et glitch
4. **Rythme émotionnel** - Durées d'animation adaptées au contexte (lent = réflexion, rapide = urgence)
5. **Hiérarchie claire** - Malgré les effets visuels, maintenir taille/couleur/position cohérents
6. **Performance** - Animations CSS (pas JS), effets basés sur transform, usage efficace des filtres

---

## Usage dans un nouveau projet

1. Copier les variables CSS dans votre fichier de styles global
2. Importer les keyframes nécessaires
3. Utiliser les classes utilitaires ou créer vos propres composants basés sur les patterns
4. Adapter le breakpoint responsive selon vos besoins

```css
/* Import minimal */
@import "./design-tokens.css";
@import "./animations.css";
```
