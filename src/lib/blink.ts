import { createClient } from '@blinkdotnew/sdk';

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'blackjack-stats-app-t4xuxy3n',
  auth: { mode: 'headless' },
});
