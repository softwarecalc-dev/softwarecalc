import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, TrendingDown, Percent, Calendar, DollarSign } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface YearRow {
  year: number;
  adjustedValue: number;
  valueLost: number;
}

interface CalcResult {
  futureValue: number;
  totalValueLost: number;
  inflationRate: number;
  timePeriod: number;
  initialAmount: number;
  rows: YearRow[];
}

const ROW_CAP = 120;

// ─── Core calculation ─────────────────────────────────────────────────────────

function calculate(initial: number, rate: number, years: number): CalcResult {
  if (years === 0) {
    return {
      futureValue: initial,
      totalValueLost: 0,
      inflationRate: rate,
      timePeriod: 0,
      initialAmount: initial,
      rows: [],
    };
  }

  const inflationRate = rate / 100;
  let currentValue = initial;
  const rows: YearRow[] = [];

  for (let y = 1; y <= Math.min(years, ROW_CAP); y++) {
    currentValue = currentValue / (1 + inflationRate);
    rows.push({
      year: y,
      adjustedValue: currentValue,
      valueLost: initial - currentValue,
    });
  }

  // If years > ROW_CAP, continue calculation without storing rows
  if (years > ROW_CAP) {
    for (let y = ROW_CAP + 1; y <= years; y++) {
      currentValue = currentValue / (1 + inflationRate);
    }
  }

  return {
    futureValue: currentValue,
    totalValueLost: initial - currentValue,
    inflationRate: rate,
    timePeriod: years,
    initialAmount: initial,
    rows,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InflationCalculator() {
  const [initialAmount, setInitialAmount] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const a = parseFloat(initialAmount);
    const r = parseFloat(inflationRate);
    const y = parseInt(years, 10);

    if (initialAmount.trim() === '' || isNaN(a) || a < 0) errs.initialAmount = 'Enter a valid amount (0 or more).';
    if (inflationRate.trim() === '' || isNaN(r) || r < 0 || r > 100) errs.inflationRate = 'Inflation rate must be between 0 and 100.';
    if (years.trim() === '' || isNaN(y) || y < 0 || !Number.isInteger(y)) errs.years = 'Enter a valid number of years (whole number, 0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculate(a, r, y));
  };

  const handleReset = () => {
    setInitialAmount('');
    setInflationRate('');
    setYears('');
    setResult(null);
    setErrors({});
  };

  const truncated = result && result.timePeriod > ROW_CAP;

  const purchasingPowerLostPercent =
    result && result.initialAmount > 0
      ? (result.totalValueLost / result.initialAmount) * 100
      : 0;

  return (
    <div className="space-y-6">

      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Inflation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="space-y-2">
              <Label htmlFor="initialAmount">Initial Amount</Label>
              <Input
                id="initialAmount"
                type="number"
                placeholder="e.g. 10000"
                min="0"
                step="0.01"
                value={initialAmount}
                onChange={(e) => { setInitialAmount(e.target.value); setErrors((p) => ({ ...p, initialAmount: '' })); }}
              />
              {errors.initialAmount && <p className="text-xs text-destructive">{errors.initialAmount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="inflationRate">Annual Inflation Rate (%)</Label>
              <Input
                id="inflationRate"
                type="number"
                placeholder="e.g. 3"
                min="0"
                max="100"
                step="0.01"
                value={inflationRate}
                onChange={(e) => { setInflationRate(e.target.value); setErrors((p) => ({ ...p, inflationRate: '' })); }}
              />
              {errors.inflationRate && <p className="text-xs text-destructive">{errors.inflationRate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Time (Years)</Label>
              <Input
                id="years"
                type="number"
                placeholder="e.g. 10"
                min="0"
                step="1"
                value={years}
                onChange={(e) => { setYears(e.target.value); setErrors((p) => ({ ...p, years: '' })); }}
              />
              {errors.years && <p className="text-xs text-destructive">{errors.years}</p>}
            </div>

          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <TrendingDown className="w-4 h-4" />
              Calculate
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Summary Cards ── */}
      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Future Value (Adjusted for Inflation)
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight break-words">
                      {formatNumber(result.futureValue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Total Value Lost
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight break-words">
                      {formatNumber(result.totalValueLost)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <Percent className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Inflation Rate
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight break-words">
                      {result.inflationRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Time Period
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight break-words">
                      {result.timePeriod} {result.timePeriod === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* ── Context note ── */}
          {result.timePeriod > 0 && (
            <Card className="border-muted">
              <CardContent className="pt-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{formatNumber(result.initialAmount)}</span> today will have the purchasing power of{' '}
                  <span className="font-semibold text-foreground">{formatNumber(result.futureValue)}</span> in{' '}
                  {result.timePeriod} {result.timePeriod === 1 ? 'year' : 'years'} at {result.inflationRate}% annual inflation.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  That means your money loses approximately {purchasingPowerLostPercent.toFixed(2)}% of its purchasing power over this period.
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── Purchasing Power Over Time table ── */}
          {result.rows.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Purchasing Power Over Time</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {truncated && (
                  <p className="text-xs text-muted-foreground px-4 pt-4 pb-2">
                    Showing first {ROW_CAP} years. Final adjusted value after {result.timePeriod} years: {formatNumber(result.futureValue)}.
                  </p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground">Year</th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">Adjusted Value</th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">Value Lost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row) => (
                        <tr key={row.year} className="border-b last:border-0 hover:bg-muted/20">
                          <td className="px-4 py-2 text-muted-foreground">{row.year}</td>
                          <td className="px-4 py-2 text-right text-primary font-medium">{formatNumber(row.adjustedValue)}</td>
                          <td className="px-4 py-2 text-right text-amber-600 dark:text-amber-400">{formatNumber(row.valueLost)}</td>
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
