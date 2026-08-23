import { createClient } from '@fluxa/shared/api';
import { PluginsList } from '@/components/plugins-list';
import type { Plugin } from '@fluxa/shared';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const apiURL = process.env.NEXT_PUBLIC_FLUXA_API_URL ?? 'http://127.0.0.1:8080';
  const client = createClient(apiURL);

  let plugins: Plugin[] = [];
  let error: string | null = null;
  try {
    plugins = await client.listPlugins();
  } catch (e) {
    error = e instanceof Error ? e.message : 'falha ao carregar plugins';
  }

  return <PluginsList plugins={plugins} error={error} />;
}
