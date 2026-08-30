import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fluxa Agent',
  description: 'Painel do atendente do Fluxa',
  other: {
    'app-version': process.env.NEXT_PUBLIC_BUILD_TIME ?? new Date().toISOString(),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="light" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="no-store" />
        {/* Google Fonts — Inter (corpo), JetBrains Mono (código), Material Symbols (ícones) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
