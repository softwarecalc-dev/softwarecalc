import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Percent, Banknote, TrendingUp, DollarSign } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── Loan payment for a given monthly rate ────────────────────────────────────

function monthlyPayment(principal: number, monthlyRate: number, totalMonths: number): number {
  if (monthlyRate === 0) return principal / totalMonths;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

// ─── APR solver via binary search ─────────────────────────────────────────────
// Finds the monthly rate where payment(netLoan, rate, n) = targetPayment

function solveAPR(netLoan: number, targetPayment: number, totalMonths: number): number {
  if (netLoan <= 0) return 0;

  let lo = 0;
  let hi = 10; // upper bound: 1000% monthly — absurdly high, always enough
  const tolerance = 1e-9;

  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const pmt = monthlyPayment(netLoan, mid, totalMonths);
    if (Math.abs(pmt - targetPayment) < tolerance) return mid;
    if (pmt < targetPayment) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalcResult {
  apr: number;
  nominalRate: number;
  monthlyPmt: number;
  totalPayment: number;
  totalInterest: number;
  fees: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function APRCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [fees, setFees] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const la = parseFloat(loanAmount);
    const ir = parseFloat(interestRate);
    const ty = parseFloat(termYears);
    const fe = parseFloat(fees) || 0;

    if (loanAmount.trim() === '' || isNaN(la) || la <= 0) errs.loanAmount = 'Enter a valid loan amount greater than 0.';
    if (interestRate.trim() === '' || isNaN(ir) || ir < 0) errs.interestRate = 'Enter a valid interest rate (0 or more).';
    if (termYears.trim() === '' || isNaN(ty) || ty <= 0) errs.termYears = 'Enter a valid term in years.';
    if (fees.trim() !== '' && (isNaN(parseFloat(fees)) || parseFloat(fees) < 0)) errs.fees = 'Fees must be 0 or more.';
    if (!errs.loanAmount && !errs.fees && fe >= la) errs.fees = 'Fees must be less than the loan amount.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});

    const totalMonths = Math.round(ty * 12);
    const nominalMonthly = ir / 100 / 12;
    const pmt = monthlyPayment(la, nominalMonthly, totalMonths);
    const totalPmt = pmt * totalMonths;
    const totalInterest = totalPmt - la;

    let apr: number;
    if (fe <= 0) {
      apr = ir;
    } else {
      const netLoan = la - fe;
      const aprMonthly = solveAPR(netLoan, pmt, totalMonths);
      apr = aprMonthly * 12 * 100;
    }

    setResult({
      apr,
      nominalRate: ir,
      monthlyPmt: pmt,
      totalPayment: totalPmt,
      totalInterest,
      fees: fe,
    });
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setTermYears('');
    setFees('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">

      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Loan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="e.g. 20000"
                min="0"
                step="0.01"
                value={loanAmount}
                onChange={(e) => { setLoanAmount(e.target.value); setErrors((p) => ({ ...p, loanAmount: '' })); }}
              />
              {errors.loanAmount && <p className="text-xs text-destructive">{errors.loanAmount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                placeholder="e.g. 6"
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
                placeholder="e.g. 5"
                min="0"
                step="0.5"
                value={termYears}
                onChange={(e) => { setTermYears(e.target.value); setErrors((p) => ({ ...p, termYears: '' })); }}
              />
              {errors.termYears && <p className="text-xs text-destructive">{errors.termYears}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fees">
                Total Upfront Fees <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="fees"
                type="number"
                placeholder="e.g. 500"
                min="0"
                step="0.01"
                value={fees}
                onChange={(e) => { setFees(e.target.value); setErrors((p) => ({ ...p, fees: '' })); }}
              />
              {errors.fees && <p className="text-xs text-destructive">{errors.fees}</p>}
            </div>

          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <Percent className="w-4 h-4" />
              Calculate APR
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <Percent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">APR</p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight truncate">
                      {result.apr.toFixed(3)}%
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
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Monthly Payment</p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight truncate">
                      {formatNumber(result.monthlyPmt)}
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
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Total Payment</p>
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
                    <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Total Interest</p>
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
                APR includes both interest and fees, giving a more accurate picture of the true borrowing cost.
              </p>
              {result.fees > 0 ? (
                <p className="text-sm text-muted-foreground">
                  With fees of{' '}
                  <span className="font-semibold text-foreground">{formatNumber(result.fees)}</span>{' '}
                  included, your effective annual rate increases from{' '}
                  <span className="font-semibold text-foreground">{result.nominalRate.toFixed(3)}%</span>{' '}
                  to{' '}
                  <span className="font-semibold text-primary">{result.apr.toFixed(3)}%</span>.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No fees were entered, so the APR equals the nominal interest rate of{' '}
                  <span className="font-semibold text-foreground">{result.nominalRate.toFixed(3)}%</span>.
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
