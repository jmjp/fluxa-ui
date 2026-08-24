'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button, Input, Label } from '@fluxa/ui';
import { AuthShell } from '@/components/auth-shell';
import { authRequest } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter(); const [error, setError] = useState(''); const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const email = String(form.get('email') ?? '').trim(); const password = String(form.get('password') ?? ''); if (!email || !password) { setError('Informe seu e-mail e senha.'); return; } setPending(true); setError(''); try { await authRequest('login', { email, password }); router.replace('/'); router.refresh(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível entrar.'); } finally { setPending(false); } }
  return <AuthShell title="Boas-vindas de volta" subtitle="Entre para acompanhar suas conversas."><form className="mt-8 space-y-5" onSubmit={submit}><div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" autoComplete="email" placeholder="voce@empresa.com" /></div><div className="space-y-2"><div className="flex justify-between"><Label htmlFor="password">Senha</Label><span className="text-xs text-muted-foreground">Mínimo de 8 caracteres</span></div><Input id="password" name="password" type="password" autoComplete="current-password" /></div>{error && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<Button className="w-full" size="lg" disabled={pending}>{pending ? 'Entrando…' : 'Entrar'}</Button></form><p className="mt-7 text-center text-sm text-muted-foreground">Ainda não tem acesso? <Link className="font-medium text-primary hover:underline" href="/register">Cadastre-se</Link></p></AuthShell>;
}
