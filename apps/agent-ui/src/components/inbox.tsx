'use client';

import { useState, type FormEvent } from 'react';
import { ChevronLeft, Info, Menu, MoreHorizontal, SendHorizontal, Users } from 'lucide-react';
import { Badge, Button, Dialog, DialogContent, DialogTitle, DialogTrigger, Input } from '@fluxa/ui';
import type { Agent, Conversation, WorkflowStep } from '@fluxa/shared';
import { ConversationList } from './conversation-list';
import { StepPluginPanel } from './step-plugin-panel';
import { ManualControls } from './manual-controls';

interface InboxProps { initialConversations: Conversation[]; initialAgents: Agent[]; error: string | null; }
const workflowSteps: WorkflowStep[] = ['triagem', 'cartoes', 'fatura', 'avaliação'].map((id) => ({ id, name: id, transitions: [] }));

export function Inbox({ initialConversations, initialAgents, error }: InboxProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0]?.id ?? null);
  const [composer, setComposer] = useState('');
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [mobileContextOpen, setMobileContextOpen] = useState(false);
  const selected = conversations.find((item) => item.id === selectedId);
  const online = initialAgents.filter((agent) => agent.status === 'online').length;
  const transition = (toStepId: string) => selected && setConversations((items) => items.map((item) => item.id === selected.id ? { ...item, current_step_id: toStepId } : item));
  const send = (event: FormEvent) => { event.preventDefault(); setComposer(''); };
  const detailPanel = selected && <StepPluginPanel conversation={selected} currentStep={workflowSteps.find((step) => step.id === selected.current_step_id) ?? workflowSteps[0]!} onTransition={transition} />;

  return (
    <div className="h-dvh overflow-hidden bg-slate-50 text-slate-900">
      <header className="flex h-16 items-center justify-between border-b border-sky-100 bg-gradient-to-r from-sky-100 via-white to-white px-4 md:px-5">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white shadow-sm">F</span><div><h1 className="text-base font-semibold">Fluxa</h1><p className="text-xs text-muted-foreground">Central de atendimento</p></div></div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="hidden sm:inline-flex"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white" />{online} online</Badge>
          <Dialog open={mobileListOpen} onOpenChange={setMobileListOpen}>
            <DialogTrigger asChild><Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5" /><span className="sr-only">Abrir conversas</span></Button></DialogTrigger>
            <DialogContent className="bottom-0 left-0 top-auto h-[82dvh] w-full max-w-none translate-x-0 translate-y-0 rounded-b-none p-0">
              <DialogTitle className="border-b px-5 py-4 text-base">Conversas</DialogTitle>
              <ConversationList conversations={conversations} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setMobileListOpen(false); }} />
            </DialogContent>
          </Dialog>
        </div>
      </header>
      {error && <div className="border-b border-destructive/20 bg-destructive/10 px-4 py-2 text-sm text-destructive">Não foi possível atualizar todos os dados: {error}</div>}
      <div className="grid h-[calc(100dvh-4rem)] min-h-0 md:grid-cols-[17rem_minmax(0,1fr)] lg:grid-cols-[18rem_minmax(0,1fr)_22rem]">
        <aside className="hidden min-h-0 border-r bg-white md:flex md:flex-col">
          <div className="border-b px-4 py-4"><div className="flex items-center justify-between"><h2 className="font-semibold">Conversas</h2><span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">{conversations.length}</span></div><p className="mt-1 text-xs text-muted-foreground">Sua fila de atendimento</p></div>
          <ConversationList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} />
        </aside>
        {selected ? (
          <main className="flex min-w-0 flex-col bg-white">
            <header className="flex items-center justify-between border-b px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2"><Button variant="ghost" size="icon" className="-ml-2 md:hidden" onClick={() => setMobileListOpen(true)}><ChevronLeft className="h-5 w-5" /><span className="sr-only">Voltar às conversas</span></Button><div className="min-w-0"><h2 className="truncate text-sm font-semibold">{selected.customer_ref}</h2><p className="truncate text-xs text-muted-foreground">{selected.channel} · etapa {selected.current_step_id ?? 'triagem'}</p></div></div>
              <div className="flex items-center gap-1"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileContextOpen(true)}><Info className="h-4 w-4" /><span className="sr-only">Ver detalhes</span></Button><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Mais ações</span></Button></div>
            </header>
            <div className="flex-1 space-y-5 overflow-y-auto bg-[linear-gradient(135deg,#f8fbff,#fff)] p-4 sm:p-6">
              <p className="mx-auto w-fit rounded-full bg-slate-100 px-3 py-1 text-xs text-muted-foreground">Conversa iniciada</p>
              <div className="flex max-w-[85%] gap-2"><span className="mt-5 h-7 w-7 shrink-0 rounded-full bg-sky-500" /><div><p className="mb-1 text-xs text-muted-foreground">{selected.customer_ref}</p><div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-slate-100">Olá! Como posso ajudar?</div></div></div>
              <div className="ml-auto max-w-[85%]"><p className="mb-1 text-right text-xs text-muted-foreground">Atendente</p><div className="rounded-2xl rounded-tr-sm bg-sky-600 px-4 py-3 text-sm text-white shadow-sm">Olá! Vou verificar isso para você.</div></div>
              <p className="pt-2 text-center text-xs text-muted-foreground">As mensagens completas serão sincronizadas pela API.</p>
            </div>
            <ManualControls steps={workflowSteps.map((step) => String(step.id))} currentStepId={selected.current_step_id} onTransition={transition} />
            <form onSubmit={send} className="flex gap-2 border-t bg-white p-3"><Input value={composer} onChange={(event) => setComposer(event.target.value)} placeholder="Escreva uma resposta…" /><Button size="icon" type="submit" aria-label="Enviar mensagem"><SendHorizontal className="h-4 w-4" /></Button></form>
          </main>
        ) : <main className="grid place-items-center bg-white p-8 text-center"><div><Users className="mx-auto h-12 w-12 text-sky-200" /><h2 className="mt-4 font-semibold">Selecione uma conversa</h2><p className="mt-1 text-sm text-muted-foreground">Escolha uma conversa para ver seus detalhes.</p></div></main>}
        {detailPanel && <aside className="hidden min-h-0 overflow-y-auto border-l bg-slate-50 lg:block"><div className="border-b bg-white px-4 py-4"><h2 className="font-semibold">Contexto da conversa</h2><p className="mt-1 text-xs text-muted-foreground">Ferramentas e próxima etapa</p></div>{detailPanel}</aside>}
      </div>
      {detailPanel && <Dialog open={mobileContextOpen} onOpenChange={setMobileContextOpen}><DialogContent className="bottom-0 left-0 top-auto max-h-[80dvh] w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-b-none"><DialogTitle>Contexto da conversa</DialogTitle>{detailPanel}</DialogContent></Dialog>}
    </div>
  );
}
