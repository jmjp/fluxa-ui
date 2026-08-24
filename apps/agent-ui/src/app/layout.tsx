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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="no-store" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  );
}
