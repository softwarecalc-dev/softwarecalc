import { useState, useEffect, useCallback } from 'react';

export interface BlackjackSettings {
  allowSurrender: boolean;
  dealerHitsSoft17: boolean;
  doubleAfterSplit: boolean;
  numDecks: number;
  dealerWinsTies: boolean;
  defaultCardSuit: string;
}

export const DEFAULT_SETTINGS: BlackjackSettings = {
  allowSurrender: true,
  dealerHitsSoft17: false,
  doubleAfterSplit: true,
  numDecks: 8,
  dealerWinsTies: false,
  defaultCardSuit: '♠',
};

const STORAGE_KEY = 'blackjack-settings';

export function useBlackjackSettings() {
  const [settings, setSettings] = useState<BlackjackSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof BlackjackSettings>(
    key: K,
    value: BlackjackSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return { settings, updateSetting, resetSettings, defaults: DEFAULT_SETTINGS };
}
