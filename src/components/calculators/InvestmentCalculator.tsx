import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, TrendingUp, Coins, Banknote, LineChart } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── Core Simulation ─────────────────────────────────────────────────────────

interface GrowthRow {
  month: number;
  totalContributions: number;
  interestEarned: number;
  balance: number;
}

interface InvestmentResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  schedule: GrowthRow[];
}

function simulateInvestment(
  initial: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
): InvestmentResult {
  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = years * 12;
  const schedule: GrowthRow[] = [];
  
  let currentBalance = initial;
  let totalContributions = initial;

  for (let m = 1; m <= totalMonths; m++) {
    currentBalance += monthlyContribution;
    totalContributions += monthlyContribution;
    
    const interestThisMonth = currentBalance * monthlyRate;
    currentBalance += interestThisMonth;
    
    const totalInterest = currentBalance - totalContributions;

    schedule.push({
      month: m,
      totalContributions,
      interestEarned: totalInterest,
      balance: currentBalance
    });
  }

  return {
    finalBalance: currentBalance,
    totalContributions,
    totalInterest: currentBalance - totalContributions,
    schedule
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InvestmentCalculator() {
  const [initialInput, setInitialInput] = useState('');
  const [contributionInput, setContributionInput] = useState('');
  const [returnInput, setReturnInput] = useState('');
  const [yearsInput, setYearsInput] = useState('');

  const [result, setResult] = useState<InvestmentResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const initial = parseFloat(initialInput) || 0;
    const contribution = parseFloat(contributionInput) || 0;
    const rate = parseFloat(returnInput) || 0;
    const years = parseInt(yearsInput);

    if (initialInput.trim() !== '' && (isNaN(initial) || initial < 0)) errs.initial = 'Enter a valid initial investment.';
    if (contributionInput.trim() !== '' && (isNaN(contribution) || contribution < 0)) errs.contribution = 'Enter a valid monthly contribution.';
    if (returnInput.trim() !== '' && (isNaN(rate) || rate < 0)) errs.rate = 'Enter a valid annual return.';
    if (isNaN(years) || years <= 0) errs.years = 'Enter a valid period in years (greater than 0).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const simulation = simulateInvestment(initial, contribution, rate, years);
    setResult(simulation);
  };

  const handleReset = () => {
    setInitialInput('');
    setContributionInput('');
    setReturnInput('');
    setYearsInput('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initial">Initial Investment</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="initial"
                  type="number"
                  className="pl-7"
                  placeholder="e.g. 5000"
                  min="0"
                  step="0.01"
                  value={initialInput}
                  onChange={(e) => { setInitialInput(e.target.value); setErrors((prev) => ({ ...prev, initial: '' })); }}
                />
              </div>
              {errors.initial && <p className="text-xs text-destructive">{errors.initial}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contribution">Monthly Contribution</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="contribution"
                  type="number"
                  className="pl-7"
                  placeholder="e.g. 200"
                  min="0"
                  step="0.01"
                  value={contributionInput}
                  onChange={(e) => { setContributionInput(e.target.value); setErrors((prev) => ({ ...prev, contribution: '' })); }}
                />
              </div>
              {errors.contribution && <p className="text-xs text-destructive">{errors.contribution}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Annual Return (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 7"
                min="0"
                step="0.01"
                value={returnInput}
                onChange={(e) => { setReturnInput(e.target.value); setErrors((prev) => ({ ...prev, rate: '' })); }}
              />
              {errors.rate && <p className="text-xs text-destructive">{errors.rate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Investment Period (Years)</Label>
              <Input
                id="years"
                type="number"
                placeholder="e.g. 10"
                min="1"
                step="1"
                value={yearsInput}
                onChange={(e) => { setYearsInput(e.target.value); setErrors((prev) => ({ ...prev, years: '' })); }}
              />
              {errors.years && <p className="text-xs text-destructive">{errors.years}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Calculate
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Results ── */}
      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <LineChart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Final Balance</p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight truncate">{formatCurrency(result.finalBalance)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <Coins className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Total Contributions</p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight truncate">{formatCurrency(result.totalContributions)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <Banknote className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Interest Earned</p>
                    <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight truncate">{formatCurrency(result.totalInterest)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Growth Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Month</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Contributions</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Interest Earned</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.month} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="px-4 py-2 text-muted-foreground">{row.month}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(row.totalContributions)}</td>
                        <td className="px-4 py-2 text-right text-amber-600 dark:text-amber-400">{formatCurrency(row.interestEarned)}</td>
                        <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
