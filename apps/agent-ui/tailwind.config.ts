import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/shared/src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // --- Design tokens (Fluxa / Material 3) — monocromático (Linear/Vercel) ---
        // Acento quase-preto; toda a ênfase vem de preenchimento/peso. Cores de status
        // funcionais (success/warning/error/online/away/offline) são mantidas.
        background: '#f8f8f9',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Brand / action (near-black accent)
        primary: {
          DEFAULT: '#17171a',
          foreground: '#ffffff',
        },
        'on-primary': '#ffffff',
        'accent-soft': 'rgba(23, 23, 26, 0.08)',
        'primary-container': '#2a2a2e',
        'on-primary-container': '#f2f2f3',
        'primary-fixed': '#eaeaec',
        'on-primary-fixed': '#17171a',
        'primary-fixed-dim': '#d2d2d6',
        'primary-fixed-variant': '#2a2a2e',
        'on-primary-fixed-variant': '#f2f2f3',
        'inverse-primary': '#d2d2d6',

        // Secondary (neutral gray)
        secondary: {
          DEFAULT: '#56565c',
          foreground: '#ffffff',
        },
        'on-secondary': '#ffffff',
        'secondary-container': '#ececee',
        'on-secondary-container': '#2a2a2e',
        'secondary-fixed': '#eaeaec',
        'on-secondary-fixed': '#17171a',
        'secondary-fixed-dim': '#d6d6d9',
        'on-secondary-fixed-variant': '#4a4a50',

        // Tertiary (neutral gray)
        tertiary: '#56565c',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#3a3a40',
        'on-tertiary-container': '#f2f2f3',
        'tertiary-fixed': '#eaeaec',
        'on-tertiary-fixed': '#17171a',
        'tertiary-fixed-dim': '#d6d6d9',
        'on-tertiary-fixed-variant': '#4a4a50',

        // Surfaces (neutral whites/grays, no blue tint)
        surface: '#f8f8f9',
        'on-surface': '#17171a',
        'surface-variant': '#e7e7e9',
        'on-surface-variant': '#4b4b52',
        'surface-dim': '#dcdcde',
        'surface-bright': '#f8f8f9',
        'surface-container': '#ececee',
        'surface-container-low': '#f4f4f5',
        'surface-container-lowest': '#ffffff',
        'surface-container-high': '#e7e7e9',
        'surface-container-highest': '#e2e2e4',
        'surface-tint': '#dcdcde',
        'surface-border': '#e8e8e9',
        'inverse-surface': '#1a1a1c',
        'inverse-on-surface': '#fafafa',

        // Outline (neutral gray)
        outline: '#7a7a82',
        'outline-variant': '#d9d9dc',

        // Semantic — status funcionais mantidos
        'on-background': '#17171a',
        error: '#EF4444',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        success: '#10B981',
        warning: '#F59E0B',
        online: '#22C55E',
        away: '#FACC15',
        offline: '#94A3B8',

        // Channels (→ neutros; canal deixa de ser cor de marca)
        webchat: '#7a7a82',
        whatsapp: '#2a2a2e',

        // --- shadcn primitives (kept for @fluxa/ui Kit + auth pages) ---
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      // Type-scale stops (Inter body / JetBrains Mono code)
      fontSize: {
        'headline-sm': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'code-sm': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '600' }],
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'headline-sm': ['Inter'],
        'body-md': ['Inter'],
        'headline-md': ['Inter'],
        'body-lg': ['Inter'],
        'label-md': ['Inter'],
        'code-sm': ['JetBrains Mono', 'ui-monospace', 'monospace'],
        'headline-lg-mobile': ['Inter'],
        'headline-lg': ['Inter'],
      },

      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },

      spacing: {
        'margin-page': '24px',
        gutter: '16px',
        unit: '4px',
        'sidebar-width': '320px',
        'node-gap': '40px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
