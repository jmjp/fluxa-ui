import { Badge, Card, CardContent, CardHeader, CardTitle } from '@fluxa/ui';
import { Boxes, LayoutDashboard, PlugZap, Settings } from 'lucide-react';
import type { Plugin } from '@fluxa/shared';

interface PluginsListProps {
  plugins: Plugin[];
  error: string | null;
}

/**
 * Tela inicial do Admin UI (PRD §8.1): lista plugins instalados com
 * status, health, e capabilities. Em produção, cada item terá botoes
 * para ativar/desativar, fazer update, abrir healthcheck, etc.
 */
export function PluginsList({ plugins, error }: PluginsListProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-sky-100 bg-gradient-to-r from-sky-100 via-white to-white px-5 py-4"><div className="mx-auto flex max-w-6xl items-center justify-between"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white">F</span><div><h1 className="font-semibold">Fluxa Admin</h1><p className="text-xs text-muted-foreground">Configuração da plataforma</p></div></div><Badge variant="success">Sistema operacional</Badge></div></header>
      <div className="mx-auto grid max-w-6xl gap-8 p-5 md:grid-cols-[12rem_1fr] md:p-8">
        <aside className="flex gap-2 overflow-x-auto md:flex-col"><span className="flex items-center gap-2 rounded-lg bg-sky-100 px-3 py-2 text-sm font-medium text-sky-800"><PlugZap className="h-4 w-4" />Plugins</span><span className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground"><LayoutDashboard className="h-4 w-4" />Visão geral</span><span className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground"><Settings className="h-4 w-4" />Ajustes</span></aside>
        <main><header className="mb-6"><div className="flex items-center gap-2"><Boxes className="h-5 w-5 text-sky-600" /><h2 className="text-2xl font-semibold tracking-tight">Plugins</h2></div><p className="mt-1 text-sm text-muted-foreground">Status, capabilities e saúde das extensões instaladas.</p></header>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {plugins.length === 0 && !error && (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            Nenhum plugin instalado. Use a aba "Marketplace" ou faca upload
            de um plugin.yaml.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {plugins.map((p) => (
          <Card key={`${p.name}@${p.version}`} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {p.name} <span className="font-mono text-sm text-muted-foreground">@{p.version}</span>
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                  <Badge variant={p.healthy ? 'success' : 'destructive'}>
                    {p.healthy ? 'healthy' : 'unhealthy'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                runtime: <code>{p.runtime}</code>
                {p.entrypoint && <> · entrypoint: <code>{p.entrypoint}</code></>}
                {p.base_url && <> · base_url: <code>{p.base_url}</code></>}
              </div>
              {p.capabilities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.capabilities.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div></main></div>
    </div>
  );
}

function statusVariant(status: string): 'default' | 'secondary' | 'success' | 'warning' {
  switch (status) {
    case 'enabled':
      return 'success';
    case 'installed':
      return 'default';
    case 'disabled':
      return 'warning';
    default:
      return 'secondary';
  }
}
