import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, TrendingUp, PiggyBank, Sparkles, Clock } from 'lucide-react';

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
  age: number;
  contributionsThisYear: number;
  growthThisYear: number;
  endBalance: number;
}

interface CalcResult {
  finalBalance: number;
  totalContributions: number;
  totalGrowth: number;
  yearsUntilRetirement: number;
  retirementAge: number;
  inflationAdjusted: number | null;
  inflationRate: number;
  rows: YearRow[];
}

const ROW_CAP = 120;

// ─── Core calculation ─────────────────────────────────────────────────────────

function calculate(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  inflationRate: number,
): CalcResult {
  const yearsUntilRetirement = retirementAge - currentAge;
  const totalMonths = yearsUntilRetirement * 12;
  const monthlyRate = annualReturn / 100 / 12;

  let balance = currentSavings;
  let totalContributions = 0;
  const rows: YearRow[] = [];

  for (let y = 1; y <= Math.min(yearsUntilRetirement, ROW_CAP); y++) {
    const balanceStartOfYear = balance;
    let yearContrib = 0;
    let yearGrowth = 0;

    for (let m = 0; m < 12; m++) {
      const growth = balance * monthlyRate;
      balance += growth;
      balance += monthlyContribution;
      yearContrib += monthlyContribution;
      yearGrowth += growth;
      totalContributions += monthlyContribution;
    }

    rows.push({
      year: y,
      age: currentAge + y,
      contributionsThisYear: yearContrib,
      growthThisYear: yearGrowth,
      endBalance: balance,
    });
  }

  // If years > ROW_CAP, continue without storing rows
  if (yearsUntilRetirement > ROW_CAP) {
    const remainingMonths = totalMonths - ROW_CAP * 12;
    for (let m = 0; m < remainingMonths; m++) {
      balance += balance * monthlyRate + monthlyContribution;
      totalContributions += monthlyContribution;
    }
  }

  const totalGrowth = balance - currentSavings - totalContributions;

  const inflationAdjusted =
    inflationRate > 0
      ? balance / Math.pow(1 + inflationRate / 100, yearsUntilRetirement)
      : null;

  return {
    finalBalance: balance,
    totalContributions,
    totalGrowth,
    yearsUntilRetirement,
    retirementAge,
    inflationAdjusted,
    inflationRate,
    rows,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const ca = parseInt(currentAge, 10);
    const ra = parseInt(retirementAge, 10);
    const cs = parseFloat(currentSavings) || 0;
    const mc = parseFloat(monthlyContribution) || 0;
    const ar = parseFloat(annualReturn) || 0;
    const ir = parseFloat(inflationRate) || 0;

    if (currentAge.trim() === '' || isNaN(ca) || ca < 0 || !Number.isInteger(ca)) errs.currentAge = 'Enter a valid current age (whole number).';
    if (retirementAge.trim() === '' || isNaN(ra) || ra < 0 || !Number.isInteger(ra)) errs.retirementAge = 'Enter a valid retirement age (whole number).';
    if (!errs.currentAge && !errs.retirementAge && ra <= ca) errs.retirementAge = 'Retirement age must be greater than current age.';
    if (currentSavings.trim() !== '' && (isNaN(parseFloat(currentSavings)) || parseFloat(currentSavings) < 0)) errs.currentSavings = 'Enter a valid savings amount (0 or more).';
    if (monthlyContribution.trim() !== '' && (isNaN(parseFloat(monthlyContribution)) || parseFloat(monthlyContribution) < 0)) errs.monthlyContribution = 'Enter a valid contribution (0 or more).';
    if (annualReturn.trim() !== '' && (isNaN(parseFloat(annualReturn)) || parseFloat(annualReturn) < 0)) errs.annualReturn = 'Enter a valid return rate (0 or more).';
    if (inflationRate.trim() !== '' && (isNaN(parseFloat(inflationRate)) || parseFloat(inflationRate) < 0 || parseFloat(inflationRate) > 100)) errs.inflationRate = 'Inflation rate must be between 0 and 100.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculate(ca, ra, cs, mc, ar, ir));
  };

  const handleReset = () => {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentSavings('');
    setMonthlyContribution('');
    setAnnualReturn('');
    setInflationRate('');
    setResult(null);
    setErrors({});
  };

  const truncated = result && result.yearsUntilRetirement > ROW_CAP;

  return (
    <div className="space-y-6">

      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Retirement Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                type="number"
                placeholder="e.g. 30"
                min="0"
                step="1"
                value={currentAge}
                onChange={(e) => { setCurrentAge(e.target.value); setErrors((p) => ({ ...p, currentAge: '' })); }}
              />
              {errors.currentAge && <p className="text-xs text-destructive">{errors.currentAge}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                placeholder="e.g. 65"
                min="0"
                step="1"
                value={retirementAge}
                onChange={(e) => { setRetirementAge(e.target.value); setErrors((p) => ({ ...p, retirementAge: '' })); }}
              />
              {errors.retirementAge && <p className="text-xs text-destructive">{errors.retirementAge}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentSavings">
                Current Savings <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="currentSavings"
                type="number"
                placeholder="e.g. 10000"
                min="0"
                step="0.01"
                value={currentSavings}
                onChange={(e) => { setCurrentSavings(e.target.value); setErrors((p) => ({ ...p, currentSavings: '' })); }}
              />
              {errors.currentSavings && <p className="text-xs text-destructive">{errors.currentSavings}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">
                Monthly Contribution <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="e.g. 500"
                min="0"
                step="0.01"
                value={monthlyContribution}
                onChange={(e) => { setMonthlyContribution(e.target.value); setErrors((p) => ({ ...p, monthlyContribution: '' })); }}
              />
              {errors.monthlyContribution && <p className="text-xs text-destructive">{errors.monthlyContribution}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualReturn">
                Expected Annual Return (%) <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="annualReturn"
                type="number"
                placeholder="e.g. 7"
                min="0"
                step="0.01"
                value={annualReturn}
                onChange={(e) => { setAnnualReturn(e.target.value); setErrors((p) => ({ ...p, annualReturn: '' })); }}
              />
              {errors.annualReturn && <p className="text-xs text-destructive">{errors.annualReturn}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="inflationRate">
                Annual Inflation Rate (%) <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="inflationRate"
                type="number"
                placeholder="e.g. 2.5"
                min="0"
                max="100"
                step="0.01"
                value={inflationRate}
                onChange={(e) => { setInflationRate(e.target.value); setErrors((p) => ({ ...p, inflationRate: '' })); }}
              />
              {errors.inflationRate && <p className="text-xs text-destructive">{errors.inflationRate}</p>}
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

      {/* ── Summary Cards ── */}
      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">
                      Retirement Balance
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight truncate">
                      {formatNumber(result.finalBalance)}
                    </p>
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
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">
                      Total Contributions
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight truncate">
                      {formatNumber(result.totalContributions)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">
                      Total Growth
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight truncate">
                      {formatNumber(result.totalGrowth)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">
                      Years Until Retirement
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight truncate">
                      {result.yearsUntilRetirement} {result.yearsUntilRetirement === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* ── Inflation-adjusted highlight ── */}
          {result.inflationAdjusted !== null && (
            <Card className="border-primary/20">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight mb-1">
                      Inflation-Adjusted Value at Retirement
                    </p>
                    <p className="text-xl font-bold text-primary leading-tight break-words">
                      {formatNumber(result.inflationAdjusted)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Equivalent purchasing power in today's money at {result.inflationRate}% annual inflation over {result.yearsUntilRetirement} years.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Insight note ── */}
          <Card className="border-muted">
  <CardContent className="pt-4 pb-4 space-y-1">
    <p className="text-sm text-muted-foreground">
      At your current savings pace, your projected retirement balance is{' '}
      <span className="font-semibold text-foreground">
        {formatNumber(result.finalBalance)}
      </span>{' '}
      by age{' '}
      <span className="font-semibold text-foreground">
        {result.retirementAge}
      </span>.
    </p>

    <p className="text-sm text-muted-foreground">
      You will contribute approximately{' '}
      <span className="font-semibold text-foreground">
        {formatNumber(result.totalContributions)}
      </span>{' '}
      and earn about{' '}
      <span className="font-semibold text-foreground">
        {formatNumber(result.totalGrowth)}
      </span>{' '}
      in investment growth.
    </p>

    {result.inflationAdjusted !== null && (
      <p className="text-sm text-muted-foreground">
        Adjusted for {result.inflationRate}% annual inflation, this corresponds to roughly{' '}
        <span className="font-semibold text-foreground">
          {formatNumber(result.inflationAdjusted)}
        </span>{' '}
        in today's purchasing power.
      </p>
    )}
  </CardContent>
</Card>

          {/* ── Year-by-year table ── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Year-by-Year Projection</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {truncated && (
                <p className="text-xs text-muted-foreground px-4 pt-4 pb-2">
                  Showing first {ROW_CAP} years. Final balance at retirement: {formatNumber(result.finalBalance)}.
                </p>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Year</th>
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Age</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Contributions</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Growth</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">End Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row) => (
                      <tr key={row.year} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="px-4 py-2 text-muted-foreground">{row.year}</td>
                        <td className="px-4 py-2 text-muted-foreground">{row.age}</td>
                        <td className="px-4 py-2 text-right text-primary">{formatNumber(row.contributionsThisYear)}</td>
                        <td className="px-4 py-2 text-right text-amber-600 dark:text-amber-400">{formatNumber(row.growthThisYear)}</td>
                        <td className="px-4 py-2 text-right font-medium">{formatNumber(row.endBalance)}</td>
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
