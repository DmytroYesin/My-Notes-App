import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredValue, removeStoredValue, setStoredValue } from './sessionStorage';

type AuthContextValue = {
  session: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SESSION_KEY = 'auth.session';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const storedSession = await getStoredValue(SESSION_KEY);
        if (isMounted) {
          setSession(storedSession);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      signIn: async (token: string) => {
        await setStoredValue(SESSION_KEY, token);
        setSession(token);
      },
      signOut: async () => {
        await removeStoredValue(SESSION_KEY);
        setSession(null);
      },
    }),
    [isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

