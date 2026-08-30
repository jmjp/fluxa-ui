'use client';

import { useState } from 'react';
import { cn } from '@fluxa/ui';

function Switch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      aria-label={label}
      className={cn(
        'relative h-[23px] w-10 shrink-0 rounded-full transition-colors',
        on ? 'bg-primary' : 'bg-surface-border',
      )}
    >
      <span
        className={cn(
          'absolute left-0.5 top-0.5 h-[19px] w-[19px] rounded-full bg-surface-container-lowest shadow-sm transition-transform',
          on && 'translate-x-[17px]',
        )}
      />
    </button>
  );
}

function SettingRow({ title, description, control }: { title: string; description: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-surface-border px-[18px] py-3.5 last:border-b-0">
      <div className="min-w-0">
        <div className="text-[13px] font-medium text-on-surface">{title}</div>
        <div className="mt-0.5 text-[12px] text-outline">{description}</div>
      </div>
      {control}
    </div>
  );
}

export function ConfigView() {
  const [channels, setChannels] = useState({ whatsapp: true, telegram: true, webchat: true });
  const [alerts, setAlerts] = useState({ queue: true, priority: false });
  const [prefs, setPrefs] = useState({ presence: true });

  return (
    <div className="h-full overflow-auto bg-background px-7 py-6">
      <h1 className="text-[24px] font-bold tracking-tight text-on-surface">Configurações</h1>
      <p className="mb-6 mt-1 text-[13px] text-outline">Canais conectados, alertas e preferências de atendimento.</p>

      {/* Canais conectados */}
      <div className="mb-4 overflow-hidden rounded-xl border border-surface-border bg-surface-container-lowest">
        <div className="border-b border-surface-border bg-surface-container-low px-[18px] py-3.5 text-[13px] font-semibold text-on-surface">
          Canais conectados
        </div>
        <SettingRow
          title="WhatsApp Business"
          description="Número vinculado e operacional"
          control={
            <Switch on={channels.whatsapp} label="WhatsApp" onToggle={() => setChannels((s) => ({ ...s, whatsapp: !s.whatsapp }))} />
          }
        />
        <SettingRow
          title="Telegram"
          description="Bot configurado e recebendo mensagens"
          control={<Switch on={channels.telegram} label="Telegram" onToggle={() => setChannels((s) => ({ ...s, telegram: !s.telegram }))} />}
        />
        <SettingRow
          title="Webchat"
          description="Widget do site da empresa"
          control={<Switch on={channels.webchat} label="Webchat" onToggle={() => setChannels((s) => ({ ...s, webchat: !s.webchat }))} />}
        />
      </div>

      {/* Alertas de atendimento */}
      <div className="mb-4 overflow-hidden rounded-xl border border-surface-border bg-surface-container-lowest">
        <div className="border-b border-surface-border bg-surface-container-low px-[18px] py-3.5 text-[13px] font-semibold text-on-surface">
          Alertas de atendimento
        </div>
        <SettingRow
          title="Avisar quando a fila exceder 5 minutos"
          description="Notificação por canal interno + som"
          control={<Switch on={alerts.queue} label="Alerta de fila" onToggle={() => setAlerts((s) => ({ ...s, queue: !s.queue }))} />}
        />
        <SettingRow
          title="Solicitar prioridade manual"
          description="Marcar conversas como P1 antes de pegar"
          control={<Switch on={alerts.priority} label="Prioridade manual" onToggle={() => setAlerts((s) => ({ ...s, priority: !s.priority }))} />}
        />
      </div>

      {/* Preferências do agente */}
      <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-container-lowest">
        <div className="border-b border-surface-border bg-surface-container-low px-[18px] py-3.5 text-[13px] font-semibold text-on-surface">
          Preferências do agente
        </div>
        <SettingRow
          title="Modo de presença padrão"
          description="Começar o expediente como online"
          control={<Switch on={prefs.presence} label="Presença padrão" onToggle={() => setPrefs((s) => ({ ...s, presence: !s.presence }))} />}
        />
        <SettingRow
          title="Idioma da interface"
          description="Português (Brasil)"
          control={
            <button className="rounded-lg border border-surface-border px-3 py-1.5 text-[12px] font-medium text-on-surface transition-colors hover:border-primary">
              Alterar
            </button>
          }
        />
      </div>
    </div>
  );
}
