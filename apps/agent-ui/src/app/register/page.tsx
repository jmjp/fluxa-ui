'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button, Input, Label } from '@fluxa/ui';
import { AuthShell } from '@/components/auth-shell';
import { authRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  const router = useRouter(); const [error, setError] = useState(''); const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get('name') ?? '').trim(); const email = String(form.get('email') ?? '').trim(); const password = String(form.get('password') ?? ''); const confirmation = String(form.get('confirmation') ?? ''); if (!name || !email || !password) { setError('Preencha todos os campos.'); return; } if (password.length < 8) { setError('Sua senha precisa ter ao menos 8 caracteres.'); return; } if (password !== confirmation) { setError('As senhas não coincidem.'); return; } setPending(true); setError(''); try { await authRequest('register', { name, email, password }); router.replace('/'); router.refresh(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível criar a conta.'); } finally { setPending(false); } }
  return <AuthShell title="Crie sua conta" subtitle="Comece a organizar seu atendimento hoje."><form className="mt-8 space-y-4" onSubmit={submit}><div className="space-y-2"><Label htmlFor="name">Nome</Label><Input id="name" name="name" autoComplete="name" placeholder="Seu nome" /></div><div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" autoComplete="email" placeholder="voce@empresa.com" /></div><div className="space-y-2"><Label htmlFor="password">Senha</Label><Input id="password" name="password" type="password" autoComplete="new-password" /></div><div className="space-y-2"><Label htmlFor="confirmation">Confirme sua senha</Label><Input id="confirmation" name="confirmation" type="password" autoComplete="new-password" /></div>{error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<Button className="w-full" size="lg" disabled={pending}>{pending ? 'Criando conta…' : 'Criar conta'}</Button></form><p className="mt-7 text-center text-sm text-muted-foreground">Já tem uma conta? <Link className="font-medium text-primary hover:underline" href="/login">Entrar</Link></p></AuthShell>;
}
