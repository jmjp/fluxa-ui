import { Badge, Card, CardContent, CardHeader, CardTitle } from '@fluxa/ui';
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
    <div className="container py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Plugins</h1>
        <p className="text-sm text-muted-foreground">
          Plugins instalados no core Fluxa. Status, capabilities e saude.
        </p>
      </header>

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

      <div className="grid gap-3">
        {plugins.map((p) => (
          <Card key={`${p.name}@${p.version}`}>
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
      </div>
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
