import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Home, Banknote, TrendingUp, Percent } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalcResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  downPaymentPct: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const hp = parseFloat(homePrice);
    const dp = parseFloat(downPayment) || 0;
    const ir = parseFloat(interestRate);
    const ty = parseFloat(termYears);

    if (homePrice.trim() === '' || isNaN(hp) || hp <= 0) errs.homePrice = 'Enter a valid home price greater than 0.';
    if (downPayment.trim() !== '' && (isNaN(parseFloat(downPayment)) || parseFloat(downPayment) < 0)) errs.downPayment = 'Down payment must be 0 or more.';
    if (!errs.homePrice && !errs.downPayment && dp >= hp) errs.downPayment = 'Down payment must be less than the home price.';
    if (interestRate.trim() === '' || isNaN(ir) || ir < 0) errs.interestRate = 'Enter a valid interest rate (0 or more).';
    if (termYears.trim() === '' || isNaN(ty) || ty <= 0) errs.termYears = 'Enter a valid loan term in years.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});

    const loanAmount = hp - dp;
    const totalMonths = Math.round(ty * 12);
    const monthlyRate = ir / 100 / 12;

    let monthly: number;
    if (monthlyRate === 0) {
      monthly = loanAmount / totalMonths;
    } else {
      monthly =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalPmt = monthly * totalMonths;
    const downPaymentPct = hp > 0 ? (dp / hp) * 100 : 0;

    setResult({
      loanAmount,
      monthlyPayment: monthly,
      totalPayment: totalPmt,
      totalInterest: totalPmt - loanAmount,
      downPaymentPct,
    });
  };

  const handleReset = () => {
    setHomePrice('');
    setDownPayment('');
    setInterestRate('');
    setTermYears('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">

      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mortgage Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="homePrice">Home Price</Label>
              <Input
                id="homePrice"
                type="number"
                placeholder="e.g. 300000"
                min="0"
                step="0.01"
                value={homePrice}
                onChange={(e) => { setHomePrice(e.target.value); setErrors((p) => ({ ...p, homePrice: '' })); }}
              />
              {errors.homePrice && <p className="text-xs text-destructive">{errors.homePrice}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="downPayment">
                Down Payment <span className="text-muted-foreground text-xs">(optional, default 0)</span>
              </Label>
              <Input
                id="downPayment"
                type="number"
                placeholder="e.g. 60000"
                min="0"
                step="0.01"
                value={downPayment}
                onChange={(e) => { setDownPayment(e.target.value); setErrors((p) => ({ ...p, downPayment: '' })); }}
              />
              {errors.downPayment && <p className="text-xs text-destructive">{errors.downPayment}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                placeholder="e.g. 6.5"
                min="0"
                step="0.01"
                value={interestRate}
                onChange={(e) => { setInterestRate(e.target.value); setErrors((p) => ({ ...p, interestRate: '' })); }}
              />
              {errors.interestRate && <p className="text-xs text-destructive">{errors.interestRate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="termYears">Loan Term (Years)</Label>
              <Input
                id="termYears"
                type="number"
                placeholder="e.g. 30"
                min="1"
                step="1"
                value={termYears}
                onChange={(e) => { setTermYears(e.target.value); setErrors((p) => ({ ...p, termYears: '' })); }}
              />
              {errors.termYears && <p className="text-xs text-destructive">{errors.termYears}</p>}
            </div>

          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <Home className="w-4 h-4" />
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
          {/* Row 1: primary + loan amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <Card className="border-primary/30 bg-primary/5 lg:col-span-1">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Monthly Payment
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight truncate">
                      {formatNumber(result.monthlyPayment)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <Banknote className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Loan Amount
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight truncate">
                      {formatNumber(result.loanAmount)}
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
                      Down Payment %
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight truncate">
                      {result.downPaymentPct.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Row 2: totals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Total Payment
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight truncate">
                      {formatNumber(result.totalPayment)}
                    </p>
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
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Total Interest
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight truncate">
                      {formatNumber(result.totalInterest)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

{/* ── Insight note ── */}
<Card className="border-muted">
  <CardContent className="pt-4 pb-4 space-y-1">
    <p className="text-sm text-muted-foreground">
      Your estimated monthly mortgage payment is{' '}
      <span className="font-semibold text-foreground">{formatNumber(result.monthlyPayment)}</span>{' '}
      on a loan amount of{' '}
      <span className="font-semibold text-foreground">{formatNumber(result.loanAmount)}</span>.
    </p>
    <p className="text-sm text-muted-foreground">
      Over the full term you will pay{' '}
      <span className="font-semibold text-foreground">{formatNumber(result.totalInterest)}</span>{' '}
      in interest — bringing the total cost to{' '}
      <span className="font-semibold text-foreground">{formatNumber(result.totalPayment)}</span>.
    </p>
    {result.downPaymentPct < 20 && result.downPaymentPct > 0 && (
      <p className="text-sm text-muted-foreground">
 Your down payment is{' '}
<span className="font-semibold text-foreground">{result.downPaymentPct.toFixed(1)}%</span>{' '}
of the home price.{' '}
<span className="font-semibold text-foreground">
  This is below the commonly recommended 20% threshold,
</span>{' '}
so many lenders may require private mortgage insurance (PMI).
      </p>
    )}

    {/* NEW LINE 👇 */}
    <p className="text-sm text-muted-foreground">
      A 20% down payment on this property would be{' '}
      <span className="font-semibold text-foreground">{formatNumber(homePrice * 0.2)}</span>.
    </p>

  </CardContent>
</Card>
        </>
      )}
    </div>
  );
}
