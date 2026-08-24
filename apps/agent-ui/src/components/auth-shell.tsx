import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

export function AuthShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  return (
    <main className="grid min-h-screen bg-slate-50 md:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white md:flex md:flex-col md:justify-between lg:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,.35),_transparent_42%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,.38),_transparent_45%)]" />
        <div className="relative flex items-center gap-2 text-xl font-semibold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15"><Sparkles className="h-5 w-5" /></span>Fluxa</div>
        <div className="relative max-w-md"><p className="mb-4 text-sm font-medium text-sky-200">Atendimento que flui</p><h1 className="text-4xl font-semibold leading-tight lg:text-5xl">Uma conversa de cada vez. Com todo o contexto.</h1><p className="mt-6 text-base leading-7 text-slate-300">Organize filas, acompanhe cada etapa e ofereça respostas que fazem diferença.</p></div>
        <p className="relative text-sm text-slate-400">Fluxa · Central de atendimento</p>
      </section>
      <section className="flex min-h-screen items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md"><div className="mb-10 md:hidden"><div className="flex items-center gap-2 text-xl font-semibold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="h-5 w-5" /></span>Fluxa</div></div><h2 className="text-3xl font-semibold tracking-tight">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>{children}</div>
      </section>
    </main>
  );
}
