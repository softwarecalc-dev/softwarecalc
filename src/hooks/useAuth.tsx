import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { blink } from '../lib/blink';
import { BlackjackSettings } from './useBlackjackSettings';

interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  premiumStatus: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface UserSettings {
  id: string;
  userId: string;
  settings: BlackjackSettings;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  loadUserSettings: () => Promise<BlackjackSettings | null>;
  saveUserSettings: (settings: BlackjackSettings) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((authState) => {
      if (authState.user) {
        setState({
          user: {
            id: authState.user.id,
            email: authState.user.email || '',
            emailVerified: authState.user.emailVerified || false,
            premiumStatus: (authState.user.metadata as any)?.premiumStatus || false,
            createdAt: (authState.user.metadata as any)?.createdAt || new Date().toISOString(),
          },
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await blink.auth.signInWithEmail(email, password);
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    await blink.auth.signUp({
      email,
      password,
      metadata: {
        premiumStatus: false,
        createdAt: new Date().toISOString(),
      },
    });
    // Send verification email after signup
    await blink.auth.sendEmailVerification();
  }, []);

  const logout = useCallback(async () => {
    await blink.auth.signOut();
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await blink.auth.sendPasswordResetEmail(email);
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    await blink.auth.confirmPasswordReset(token, password);
  }, []);

  const verifyEmail = useCallback(async (token: string) => {
    await blink.auth.verifyEmail(token);
  }, []);

  const sendEmailVerification = useCallback(async () => {
    await blink.auth.sendEmailVerification();
  }, []);

  const loadUserSettings = useCallback(async (): Promise<BlackjackSettings | null> => {
    if (!state.isAuthenticated || !state.user) return null;
    try {
      const settings = await blink.db.userSettings.list({
        where: { userId: state.user.id },
      });
      if (settings && settings.length > 0 && settings[0].settings) {
        return settings[0].settings as BlackjackSettings;
      }
      return null;
    } catch (e) {
      console.error('Failed to load user settings:', e);
      return null;
    }
  }, [state.isAuthenticated, state.user?.id]);

  const saveUserSettings = useCallback(async (settings: BlackjackSettings) => {
    if (!state.isAuthenticated || !state.user) return;
    try {
      // Check if settings exist
      const existing = await blink.db.userSettings.list({
        where: { userId: state.user.id },
      });
      
      if (existing && existing.length > 0) {
        // Update existing
        await blink.db.userSettings.update(existing[0].id, {
          settings: JSON.stringify(settings),
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Create new
        await blink.db.userSettings.create({
          userId: state.user.id,
          settings: JSON.stringify(settings),
        });
      }
    } catch (e) {
      console.error('Failed to save user settings:', e);
      // Silently fail - settings will still work locally
    }
  }, [state.isAuthenticated, state.user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        sendEmailVerification,
        loadUserSettings,
        saveUserSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
