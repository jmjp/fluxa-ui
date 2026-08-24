'use client';
import { useEffect, useState } from 'react';
import { clearToken, getCurrentAgent, getToken, type AuthAgent } from '@/lib/auth';

export function useAuth() {
  const [agent, setAgent] = useState<AuthAgent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setIsLoading(false); return; }
    getCurrentAgent(token).then(setAgent).catch(clearToken).finally(() => setIsLoading(false));
  }, []);

  return { agent, isLoading, logout: clearToken };
}
