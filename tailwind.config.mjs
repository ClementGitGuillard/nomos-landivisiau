/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Palette Nomos
        noir: '#0A0A0A',        // fond principal sombre
        'noir-2': '#141414',    // variantes de sections / cards
        creme: '#fbf4f7',       // blanc cassé rosé (texte sur sombre, fonds clairs)
        gris: '#a4a2a2',        // texte secondaire
        'gris-clair': '#B5B5B5',// séparateurs, eyebrow, bordures
        blanc: '#ffffff',       // bandeau marques
      },
      fontFamily: {
        // Glacial Indifference -> auto-hébergée si fournie, sinon Jost (proche géométrique)
        logo: ['"Glacial Indifference"', 'Jost', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.25rem, 5.5vw, 4.5rem)',
        'h2': 'clamp(1.4rem, 2.5vw, 2.05rem)',
        'h3': 'clamp(1.15rem, 1.8vw, 1.5rem)',
        'eyebrow': '0.7rem',
      },
      letterSpacing: {
        'eyebrow': '0.32em',
        'wide2': '0.16em',
      },
      maxWidth: {
        'prose': '60ch',
      },
    },
  },
  plugins: [],
};
