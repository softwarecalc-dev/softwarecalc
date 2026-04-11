import { useState } from 'react';
import { HandAnalyzer } from '../HandAnalyzer';
import { StrategyChart } from '../StrategyChart';
import { SettingsPage } from '../SettingsPage';
import { Button } from '../ui/button';
import { useBlackjackSettings } from '../../hooks/useBlackjackSettings';
import { useUserSettingsSync } from '../../hooks/useUserSettingsSync';

type Tab = 'analyzer' | 'strategy' | 'settings';

export function BlackjackCalculator() {
  const [currentTab, setCurrentTab] = useState<Tab>('analyzer');
  const { settings, updateSetting, setSettings } = useBlackjackSettings();

  useUserSettingsSync(settings, setSettings);

  return (
    <>
      {/* Tab bar */}
      <div className="flex gap-1 sm:gap-2 border-b mb-6">
        {(['analyzer', 'strategy', 'settings'] as Tab[]).map((tab) => (
          <Button
            key={tab}
            variant={currentTab === tab ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentTab(tab)}
            className="text-xs sm:text-sm px-3 sm:px-4 rounded-b-none capitalize"
          >
            {tab === 'analyzer' ? 'Hand Analyzer' : tab === 'strategy' ? 'Strategy Chart' : 'Settings'}
          </Button>
        ))}
      </div>

      {/* Tab content */}
      {currentTab === 'analyzer' && <HandAnalyzer settings={settings} />}
      {currentTab === 'strategy' && <StrategyChart settings={settings} />}
      {currentTab === 'settings' && <SettingsPage settings={settings} updateSetting={updateSetting} />}

      {/* Rule summary */}
      <p className="mt-6 text-center text-xs text-muted-foreground border-t pt-4">
        {settings.numDecks} deck{settings.numDecks > 1 ? 's' : ''}, dealer{' '}
        {settings.dealerHitsSoft17 ? 'hits' : 'stands'} on soft 17
        {settings.doubleAfterSplit ? ', double after split' : ''}
        {settings.allowSurrender ? ', surrender allowed' : ''}
        {settings.dealerWinsTies ? ', dealer wins ties' : ''}.&nbsp;
        For entertainment purposes only.
      </p>
    </>
  );
}
