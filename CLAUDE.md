# NOMOS Landivisiau — CLAUDE.md projet

> Site **one-page** signé Agence Clément. Univers `clients-reels`.
> NDD validé (pas encore acheté) : **nomos-landivisiau.fr**. Travail en **local** d'abord,
> déploiement Cloudflare plus tard (après validation fidélité maquette par Clément).

## Brief
Galerie d'art de vivre **Nomos par Kéruzec-Méar**, 5 rue Saint-Guenal, 29400 Landivisiau.
Design, création contemporaine, art appliqué. Fondateur : **Lucky Méar** (joaillier · peintre · fondateur),
filiation maison Kéruzec-Méar depuis 1920. Objectif du site : reproduire **avec exactitude** la maquette
validée (`Maquette NOMOS v1.pdf`), univers haut de gamme, sombre, minimal, galerie.

- Tél : **02 98 69 34 90** · Horaires : mardi–samedi 10h-12h / 14h-19h (fermé dim. + lundi).
- Réseaux : [Instagram](https://www.instagram.com/nomos.par.keruzecmear/) · [LinkedIn](https://www.linkedin.com/in/lucky-m%C3%A9ar-575699b1/)
- Contact = **téléphone uniquement** ou venue en boutique. **Pas d'email, pas de formulaire** (décision Clément, fidèle à la maquette). Ne jamais ajouter de `mailto:`.

## Charte graphique
- Couleurs : `#0A0A0A` (noir, fond principal) · `#fbf4f7` (crème rosé, texte/clair) · `#a4a2a2` (gris) ·
  `#B5B5B5` (gris clair — eyebrow/bordures ET **fond clair des sections « En ce moment » + « Partenariats »**,
  texte foncé `#0A0A0A` dessus) · `#ffffff` (bandeau marques, fond blanc).
- Polices : **Glacial Indifference** UNIQUEMENT pour le wordmark « NOMOS » (header, hero, footer, carte
  contact). **Tous les titres ET le corps = Inter.** Glacial auto-hébergée en woff2 dans `public/fonts/`
  (convertie depuis les OTF fournis). ⚠️ Ne jamais remettre Glacial sur les titres.
- Logo = monogramme KM blanc fourni (`Logo NOMOS blanc.png` → `public/logo.png`, tel quel).
  Favicon = ce monogramme placé sur fond `#0A0A0A` (sinon invisible sur onglet clair).

## Structure (one-page, ordre maquette)
Header (monogramme + « NOMOS » seul, pas de sous-titre ni adresse) · Hero **image paysage complète**
(plafonné `max-h-[90svh]` → tient dans la fenêtre sans scroll ; lockup logo NOMOS/par/KERUZEC-MEAR en
bas-gauche, adresse en bas-droite) · Bandeau marques (fond **blanc**, logos teintés sombre uniforme) ·
Manifeste · **Sélection** (carousel 7 catégories, défile au clic) · Le Lieu · **En ce moment** (fond clair
`#B5B5B5`, texte centré foncé, **images paysage** : rangée haute 3 col `sm:h-[280px]` [gauche 1 img · centre
2 images **égales** `grid-rows-2` brindille + niche vases · droite 1 img] puis rangée basse 2 grandes images
`sm:h-[390px]` : bougies MAD ET LEN · poteries) · L'Histoire · bandeau Objet|Matière|Émotion · Fondateur ·
**Partenariats** (fond clair `#B5B5B5`, texte foncé) · bloc coordonnées (carte 4 cellules à filets) + carte
Landivisiau · Footer signé.

> **Wordmark KERUZEC-MEAR** : en capitales **sans accents** (hero + carte contact), fidèle à la maquette.
> Le footer garde « par Kéruzec-Méar » en casse titre avec accents (orthographe propre du nom).

> Hero, Contact & « En ce moment » : reproduits d'après les captures maquette fournies par Clément.
> Sélection : disposition actuelle validée telle quelle.

### Règle de dimensionnement images/texte côte à côte (validée)
Le **texte pilote la hauteur**, pas l'image (sinon référence circulaire → image qui déborde).
- **Fondateur** & **Le Lieu**/**Histoire** : image en `absolute inset-0` dans un conteneur `lg:aspect-auto`
  → l'image se cale pile sur la hauteur du bloc texte voisin. Lucky : `object-top` (tête non coupée).
- **Partenariats** : exception → image **carrée** (`aspect-square`, fidèle maquette), colonne rétrécie
  (`lg:grid-cols-[0.82fr_1fr]`, `lg:items-start`) ; dépasse un peu le texte court, choix validé Clément.
- **Contact** : `max-w-4xl` + `md:grid-cols-2`, carte = `<img class="block w-full">` (poster portrait
  entier, **jamais object-cover/contain** → pas de crop ni de bandes blanches) ; la carte 4 cellules
  `flex-1` se cale sur la hauteur du poster.
- Bordures images : `ring-inset ring-[3px] ring-[#a4a2a2]/25` (filet gris discret).
- Texte couleurs : « Pas pour ce qu'ils décorent. » = gris ; « Venir chez Nomos… » = crème ;
  « En ce moment » paragraphe = `#3b3a3a`. Texture section OBJET|MATIÈRE = `opacity-50`.

## Infos légales (Pappers, SIREN 314318395)
Éditeur : **BIJOUTERIE KERUZEC MEAR** (enseigne Nomos), **SARL** capital 7 622,45 €. Siège social :
**4 rue de l'Église, 29400 Landivisiau** (≠ boutique Nomos 5 rue Saint-Guenal). SIRET siège
314 318 395 00014 · RCS Brest 314 318 395 · APE 47.77Z · TVA FR58314318395 · Gérant **Lucky Méar**.
→ intégrées dans `/mentions-legales` (noindex).

## Points à finaliser avant mise en ligne
1. **Photo Luminaires** : la vignette Sélection utilise temporairement la photo de soufflage de verre
   (`selection-luminaires-*.webp`) — à remplacer par une vraie photo de luminaire (Clément fournira plus tard).
2. Mise en ligne : acheter NDD → DNS OVH → Cloudflare Pages → SSL Always-HTTPS → désactiver blocage AI bots
   → remplacer `pages.dev` dans robots.txt → GSC + sitemap-index.

## Commandes
- Dev : `npm run dev` · Build : `npm run build`
- Retraiter les images : `node scripts/prepare-assets.mjs` (lit les dossiers sources, écrit `public/`).
  Les sources originales (PDF, dossiers « VISUELS produits », « en ce moment », « marques distribuées »,
  photos) restent en racine — **ne pas supprimer**.

## Journal des skills
### [BUILD initial] — 2026-05-26 (✅)
Site one-page construit en reproduction fidèle de la maquette validée. Scaffolding technique repris de
coat-amis-charpente (Astro+Tailwind, sitemaps, middleware, _headers, robots). 21 images converties WebP
(<500 Ko), 8 logos marques uniformisés en teinte sombre sur transparent. Schema `HomeGoodsStore`, OG +
Twitter, llms.txt. Vérifié visuellement desktop + mobile (preview), 0 erreur console. Non déployé.

### [SVELTIA CMS + Déploiement] — 2026-05-26 (✅)
**Extraction contenu** : `src/data/home.json` (toutes sections : héro, manifeste, sélection, lieu, en ce moment, histoire, fondateur, partenariats, contact, marques). `index.astro` rebranché pour importer du JSON.
**Sveltia CMS** : `public/admin/index.html` (CDN) + `public/admin/config.yml` (collections éditables, `local_backend: true`).
**Déploiement** : `.github/workflows/deploy.yml` (GitHub Actions → wrangler pages deploy), secrets Actions posés.
**Repo GitHub** : `ClementGitGuillard/nomos-landivisiau` (privé), code pushé branche main.
**Cloudflare Pages** : projet `nomos-landivisiau` (Direct Upload).
**Build** : `npm run build` ✅ 0 erreur, 2 pages générées.
**À faire** : configurer DNS (OVH nameservers → Cloudflare) + domaine personnalisé Pages + SSL Always HTTPS + désactiver blocage AI bots + remplacer pages.dev dans robots.txt.
