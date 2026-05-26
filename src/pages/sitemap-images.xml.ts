import type { APIRoute } from 'astro';

const SITE = 'https://nomos-landivisiau.fr';

const images: { loc: string; title: string; caption: string }[] = [
  { loc: '/hero-galerie-art-de-vivre-nomos-landivisiau.webp', title: 'Galerie Nomos par Kéruzec-Méar à Landivisiau', caption: "Showroom de la galerie d'art de vivre Nomos" },
  { loc: '/le-lieu-boutique-galerie-nomos-landivisiau.webp', title: 'Intérieur de la boutique Nomos à Landivisiau', caption: 'Volume et matières de la galerie Nomos' },
  { loc: '/selection-vaisselle-nomos-landivisiau.webp', title: 'Vaisselle — sélection Nomos', caption: 'Vaisselle de créateurs distribuée chez Nomos' },
  { loc: '/selection-mobilier-nomos-landivisiau.webp', title: 'Mobilier — sélection Nomos', caption: 'Mobilier design distribué chez Nomos' },
  { loc: '/selection-pieces-uniques-nomos-landivisiau.webp', title: 'Pièces uniques — sélection Nomos', caption: 'Pièces uniques de la galerie Nomos' },
  { loc: '/selection-luminaires-nomos-landivisiau.webp', title: 'Luminaires — sélection Nomos', caption: 'Luminaires de créateurs distribués chez Nomos' },
  { loc: '/selection-design-nomos-landivisiau.webp', title: 'Design — sélection Nomos', caption: 'Objets de design distribués chez Nomos' },
  { loc: '/selection-decoration-nomos-landivisiau.webp', title: 'Décoration — sélection Nomos', caption: 'Objets de décoration de la galerie Nomos' },
  { loc: '/selection-fragrance-nomos-landivisiau.webp', title: 'Fragrance — sélection Nomos', caption: 'Fragrances et bougies distribuées chez Nomos' },
  { loc: '/fondateur-lucky-mear-joaillier-peintre-nomos.webp', title: 'Lucky Méar, fondateur de Nomos', caption: 'Lucky Méar, joaillier, peintre et fondateur' },
  { loc: '/histoire-place-eglise-landivisiau-nomos.webp', title: "Place de l'Église à Landivisiau", caption: 'La maison Kéruzec-Méar à Landivisiau' },
  { loc: '/partenariats-professionnels-interieur-nomos-landivisiau.webp', title: "Partenariats professionnels de l'intérieur", caption: 'Accompagnement des architectes et décorateurs par Nomos' },
];

export const GET: APIRoute = () => {
  const imgs = images
    .map((i) => `    <image:image>
      <image:loc>${SITE}${i.loc}</image:loc>
      <image:title>${i.title}</image:title>
      <image:caption>${i.caption}</image:caption>
    </image:image>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/</loc>
${imgs}
  </url>
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' },
  });
};
