import React from "react";

type User = { id: string; email: string; name?: string | null };
type AuthState = { user: User | null; token: string | null };

type AuthContextType = AuthState & {
  login: (payload: { user: User; token: string }) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "app-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    try {
      return JSON.parse(raw);
    } catch {
      return { user: null, token: null };
    }
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = React.useCallback(
    ({ user, token }: { user: User; token: string }) => {
      setState({ user, token });
    },
    []
  );

  const logout = React.useCallback(() => {
    setState({ user: null, token: null });
  }, []);

  const value: AuthContextType = { ...state, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
