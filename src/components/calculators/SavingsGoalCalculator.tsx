import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Target, TrendingUp, PiggyBank, DollarSign } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatMonths(totalMonths: number): string {
  if (totalMonths === 0) return '0 months';
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (y === 0) return `${m} month${m !== 1 ? 's' : ''}`;
  if (m === 0) return `${y} year${y !== 1 ? 's' : ''}`;
  return `${y} year${y !== 1 ? 's' : ''}, ${m} month${m !== 1 ? 's' : ''}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface MonthRow {
  month: number;
  contribution: number;
  interestEarned: number;
  balance: number;
}

interface CalcResult {
  totalMonths: number;
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  rows: MonthRow[];
  truncated: boolean;
}

const ROW_CAP = 120;

// ─── Core calculation ─────────────────────────────────────────────────────────

function calculate(
  goal: number,
  initial: number,
  monthly: number,
  annualRate: number,
): CalcResult | 'unreachable' {
  if (initial >= goal) {
    return {
      totalMonths: 0,
      finalBalance: initial,
      totalContributions: 0,
      totalInterest: 0,
      rows: [],
      truncated: false,
    };
  }

  // If no contribution and no interest, it's unreachable
  if (monthly <= 0 && annualRate <= 0) {
    return 'unreachable';
  }

  const monthlyRate = annualRate / 100 / 12;
  let balance = initial;
  let totalContributions = 0;
  let totalInterest = 0;
  const rows: MonthRow[] = [];
  let truncated = false;

  // Safety cap: 1200 months (100 years) to prevent infinite loops
  const MAX_MONTHS = 1200;

  for (let m = 1; m <= MAX_MONTHS; m++) {
    const interest = balance * monthlyRate;
    balance += interest;
    balance += monthly;
    totalContributions += monthly;
    totalInterest += interest;

    if (rows.length < ROW_CAP) {
      rows.push({
        month: m,
        contribution: monthly,
        interestEarned: interest,
        balance,
      });
    } else if (!truncated) {
      truncated = true;
    }

    if (balance >= goal) {
      return {
        totalMonths: m,
        finalBalance: balance,
        totalContributions,
        totalInterest,
        rows,
        truncated,
      };
    }
  }

  // If we hit the cap, still unreachable in practice
  return 'unreachable';
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SavingsGoalCalculator() {
  const [goal, setGoal] = useState('');
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');

  const [result, setResult] = useState<CalcResult | 'unreachable' | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const g = parseFloat(goal);
    const i = parseFloat(initial) || 0;
    const m = parseFloat(monthly) || 0;
    const r = parseFloat(rate) || 0;

    if (goal.trim() === '' || isNaN(g) || g <= 0) errs.goal = 'Enter a savings goal greater than 0.';
    if (initial.trim() !== '' && (isNaN(parseFloat(initial)) || parseFloat(initial) < 0)) errs.initial = 'Enter a valid initial savings amount (0 or more).';
    if (monthly.trim() !== '' && (isNaN(parseFloat(monthly)) || parseFloat(monthly) < 0)) errs.monthly = 'Enter a valid monthly contribution (0 or more).';
    if (rate.trim() !== '' && (isNaN(parseFloat(rate)) || parseFloat(rate) < 0)) errs.rate = 'Enter a valid interest rate (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculate(g, i, m, r));
  };

  const handleReset = () => {
    setGoal('');
    setInitial('');
    setMonthly('');
    setRate('');
    setResult(null);
    setErrors({});
  };

  const hasResult = result !== null && result !== 'unreachable';

  return (
    <div className="space-y-6">

      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Savings Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="goal">Savings Goal</Label>
              <Input
                id="goal"
                type="number"
                placeholder="e.g. 10000"
                min="0"
                step="0.01"
                value={goal}
                onChange={(e) => { setGoal(e.target.value); setErrors((p) => ({ ...p, goal: '' })); }}
              />
              {errors.goal && <p className="text-xs text-destructive">{errors.goal}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="initial">
                Initial Savings <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="initial"
                type="number"
                placeholder="e.g. 1000"
                min="0"
                step="0.01"
                value={initial}
                onChange={(e) => { setInitial(e.target.value); setErrors((p) => ({ ...p, initial: '' })); }}
              />
              {errors.initial && <p className="text-xs text-destructive">{errors.initial}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly Contribution</Label>
              <Input
                id="monthly"
                type="number"
                placeholder="e.g. 200"
                min="0"
                step="0.01"
                value={monthly}
                onChange={(e) => { setMonthly(e.target.value); setErrors((p) => ({ ...p, monthly: '' })); }}
              />
              {errors.monthly && <p className="text-xs text-destructive">{errors.monthly}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">
                Annual Interest Rate (%) <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 4"
                min="0"
                step="0.01"
                value={rate}
                onChange={(e) => { setRate(e.target.value); setErrors((p) => ({ ...p, rate: '' })); }}
              />
              {errors.rate && <p className="text-xs text-destructive">{errors.rate}</p>}
            </div>

          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <Target className="w-4 h-4" />
              Calculate
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Unreachable message ── */}
      {result === 'unreachable' && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="pt-5 pb-5">
            <p className="text-sm font-medium text-destructive">
              Goal cannot be reached with current inputs. Add a monthly contribution or an interest rate to continue growing your balance.
            </p>
          </CardContent>
        </Card>
      )}

      {/* ── Summary Results ── */}
      {hasResult && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Time to Reach Goal</p>
                    <p className="text-lg sm:text-xl font-bold text-primary leading-tight break-words mt-0.5">
                      {(result as CalcResult).totalMonths === 0 ? 'Already reached' : formatMonths((result as CalcResult).totalMonths)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Final Balance</p>
                    <p className="text-lg sm:text-xl font-bold leading-tight break-words mt-0.5">{formatNumber((result as CalcResult).finalBalance)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <PiggyBank className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Total Contributions</p>
                    <p className="text-lg sm:text-xl font-bold leading-tight break-words mt-0.5">{formatNumber((result as CalcResult).totalContributions)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Total Interest Earned</p>
                    <p className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 leading-tight break-words mt-0.5">{formatNumber((result as CalcResult).totalInterest)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Monthly breakdown table ── */}
          {(result as CalcResult).rows.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {(result as CalcResult).truncated && (
                  <p className="text-xs text-muted-foreground px-4 pt-4 pb-2">
                    Showing first {ROW_CAP} months. Full path is {formatMonths((result as CalcResult).totalMonths)}.
                  </p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground">Month</th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">Contribution</th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">Interest Earned</th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">Total Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(result as CalcResult).rows.map((row) => (
                        <tr key={row.month} className="border-b last:border-0 hover:bg-muted/20">
                          <td className="px-4 py-2 text-muted-foreground">{row.month}</td>
                          <td className="px-4 py-2 text-right text-primary">{formatNumber(row.contribution)}</td>
                          <td className="px-4 py-2 text-right text-amber-600 dark:text-amber-400">{formatNumber(row.interestEarned)}</td>
                          <td className="px-4 py-2 text-right font-medium">{formatNumber(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
