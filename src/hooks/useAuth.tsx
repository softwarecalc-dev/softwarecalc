import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: null;
  isLoading: false;
  isAuthenticated: false;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: null,
        isLoading: false,
        isAuthenticated: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
