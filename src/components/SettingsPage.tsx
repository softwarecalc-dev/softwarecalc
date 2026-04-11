import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlackjackSettings } from '@/hooks/useBlackjackSettings';
import { Settings2, Info, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SettingsPageProps {
  settings: BlackjackSettings;
  updateSetting: <K extends keyof BlackjackSettings>(key: K, value: BlackjackSettings[K]) => void;
}

const RULE_EXPLANATIONS: Record<string, string> = {
  allowSurrender: "Surrender allows you to forfeit the hand early and lose only half your bet. Recommended only for very weak hands like 16 vs dealer's 10.",
  dealerHitsSoft17: "When enabled, the dealer must draw another card when holding a soft 17 (Ace + 6). This rule slightly increases the house edge.",
  doubleAfterSplit: "When enabled, you may double your bet after splitting pairs. This can increase your potential winnings but requires a larger bankroll.",
  dealerWinsTies: "When enabled, if both player and dealer have the same total, the dealer wins instead of it being a push (tie). This significantly increases the house edge.",
};

const SUIT_OPTIONS = [
  { value: '♠', label: 'Spades', icon: '♠' },
  { value: '♥', label: 'Hearts', icon: '♥' },
  { value: '♦', label: 'Diamonds', icon: '♦' },
  { value: '♣', label: 'Clubs', icon: '♣' },
];

export function SettingsPage({ settings, updateSetting }: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            <span className="text-primary">Blackjack</span> Settings
          </h1>
          <p className="text-muted-foreground text-lg">
            Customize game rules to get accurate recommendations
          </p>
        </div>

        {/* Rule Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5" />
              Table Rules
            </CardTitle>
            <CardDescription>
              Click the ? icon next to each rule for more information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Allow Surrender */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="allow-surrender" className="text-base font-medium">
                  Allow Surrender
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground text-xs cursor-help">
                        ?
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{RULE_EXPLANATIONS.allowSurrender}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                id="allow-surrender"
                checked={settings.allowSurrender}
                onCheckedChange={(checked) => updateSetting('allowSurrender', checked)}
              />
            </div>

            {/* Dealer hits on soft 17 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="dealer-soft-17" className="text-base font-medium">
                  Dealer Hits on Soft 17
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground text-xs cursor-help">
                        ?
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{RULE_EXPLANATIONS.dealerHitsSoft17}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                id="dealer-soft-17"
                checked={settings.dealerHitsSoft17}
                onCheckedChange={(checked) => updateSetting('dealerHitsSoft17', checked)}
              />
            </div>

            {/* Double after split */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="double-after-split" className="text-base font-medium">
                  Double After Split
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground text-xs cursor-help">
                        ?
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{RULE_EXPLANATIONS.doubleAfterSplit}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                id="double-after-split"
                checked={settings.doubleAfterSplit}
                onCheckedChange={(checked) => updateSetting('doubleAfterSplit', checked)}
              />
            </div>

            {/* Dealer wins ties */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="dealer-wins-ties" className="text-base font-medium">
                  Dealer Wins Ties
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground text-xs cursor-help">
                        ?
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{RULE_EXPLANATIONS.dealerWinsTies}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                id="dealer-wins-ties"
                checked={settings.dealerWinsTies}
                onCheckedChange={(checked) => updateSetting('dealerWinsTies', checked)}
              />
            </div>

            {/* Number of decks */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="num-decks" className="text-base font-medium">
                  Number of Decks
                </Label>
              </div>
              <Select
                value={settings.numDecks.toString()}
                onValueChange={(value) => updateSetting('numDecks', parseInt(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Deck</SelectItem>
                  <SelectItem value="2">2 Decks</SelectItem>
                  <SelectItem value="4">4 Decks</SelectItem>
                  <SelectItem value="6">6 Decks</SelectItem>
                  <SelectItem value="8">8 Decks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Display Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default Card Suit */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="default-suit" className="text-base font-medium">
                  Default Card Suit
                </Label>
              </div>
              <Select
                value={settings.defaultCardSuit}
                onValueChange={(value) => updateSetting('defaultCardSuit', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUIT_OPTIONS.map((suit) => (
                    <SelectItem key={suit.value} value={suit.value}>
                      <span className="flex items-center gap-2">
                        <span className={suit.value === '♥' || suit.value === '♦' ? 'text-red-600' : ''}>
                          {suit.icon}
                        </span>
                        {suit.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Current Rules Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Surrender:</span>
                <span className="font-medium">{settings.allowSurrender ? 'Allowed' : 'Not Allowed'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dealer:</span>
                <span className="font-medium">{settings.dealerHitsSoft17 ? 'Hits on Soft 17' : 'Stands on Soft 17'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Double after split:</span>
                <span className="font-medium">{settings.doubleAfterSplit ? 'Allowed' : 'Not Allowed'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tie breaker:</span>
                <span className="font-medium">{settings.dealerWinsTies ? 'Dealer wins' : 'Push'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Decks:</span>
                <span className="font-medium">{settings.numDecks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Card suit:</span>
                <span className="font-medium">{settings.defaultCardSuit}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
