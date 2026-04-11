import { useEffect, useRef } from 'react';
import { useAuth } from './useAuth';
import { BlackjackSettings, DEFAULT_SETTINGS } from './useBlackjackSettings';

export function useUserSettingsSync(settings: BlackjackSettings, setSettings: (s: BlackjackSettings) => void) {
  const { isAuthenticated, loadUserSettings, saveUserSettings } = useAuth();
  const isFirstLoad = useRef(true);
  const previousSettingsRef = useRef<BlackjackSettings>(settings);

  // Load user settings when authenticated (on first login)
  useEffect(() => {
    if (isAuthenticated && isFirstLoad.current) {
      isFirstLoad.current = false;
      loadUserSettings().then((userSettings) => {
        if (userSettings) {
          setSettings(userSettings);
        }
      });
    }
  }, [isAuthenticated, loadUserSettings, setSettings]);

  // Save user settings when changed (only if authenticated)
  useEffect(() => {
    // Skip the first load to avoid overwriting with stale localStorage data
    if (isFirstLoad.current) return;
    
    // Only save if authenticated and settings actually changed
    if (isAuthenticated && previousSettingsRef.current !== settings) {
      previousSettingsRef.current = settings;
      // Debounce the save
      const timeoutId = setTimeout(() => {
        saveUserSettings(settings);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [settings, isAuthenticated, saveUserSettings]);

  // Mark first load as complete after initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      isFirstLoad.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, []);
}
