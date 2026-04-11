import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Percent, Banknote, TrendingDown } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── Core Calculation ─────────────────────────────────────────────────────────

interface RateResult {
  annualRate: number;
  totalPaid: number;
  totalInterest: number;
}

/**
 * Simulates a loan at a given monthly rate and returns the final balance
 * after `termMonths` payments of `monthlyPayment`.
 */
function simulateBalance(
  loanAmount: number,
  monthlyRate: number,
  monthlyPayment: number,
  termMonths: number
): number {
  let balance = loanAmount;
  for (let m = 0; m < termMonths; m++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;
    if (balance <= 0) break;
  }
  return balance;
}

/**
 * Iterative binary-search approach to find the monthly rate that makes the
 * final balance ≈ 0 after the full term.
 */
function estimateInterestRate(
  loanAmount: number,
  monthlyPayment: number,
  termYears: number
): RateResult | null {
  const termMonths = termYears * 12;
  const minPaymentNeeded = loanAmount / termMonths; // zero-rate minimum

  // If payment can't even repay principal, impossible
  if (monthlyPayment <= minPaymentNeeded && monthlyPayment * termMonths <= loanAmount) {
    // More accurate: at rate=0, balance after term = loanAmount - payment*months
    const balanceAtZero = loanAmount - monthlyPayment * termMonths;
    if (balanceAtZero >= loanAmount * 0.001) return null;
  }

  let low = 0;           // monthly rate lower bound
  let high = 5 / 12;    // monthly rate upper bound (500% annual — extreme safety ceiling)
  const TOLERANCE = 0.01;
  const MAX_ITER = 200;

  // Quick check: at rate=0, does the payment cover the loan at all?
  const balanceAtZeroRate = simulateBalance(loanAmount, 0, monthlyPayment, termMonths);
  if (balanceAtZeroRate > TOLERANCE) {
    // Payment is genuinely too low to repay the loan even at 0% interest
    return null;
  }

  // Binary search
  let monthlyRate = (low + high) / 2;
  for (let i = 0; i < MAX_ITER; i++) {
    const balance = simulateBalance(loanAmount, monthlyRate, monthlyPayment, termMonths);

    if (Math.abs(balance) <= TOLERANCE) break;

    if (balance > 0) {
      // Rate too low — payment doesn't cover enough interest
      low = monthlyRate;
    } else {
      // Rate too high — payment overpays
      high = monthlyRate;
    }
    monthlyRate = (low + high) / 2;
  }

  const annualRate = monthlyRate * 12 * 100;
  const totalPaid = monthlyPayment * termMonths;
  const totalInterest = totalPaid - loanAmount;

  return { annualRate, totalPaid, totalInterest };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InterestRateCalculator() {
  const [loanInput, setLoanInput] = useState('');
  const [paymentInput, setPaymentInput] = useState('');
  const [yearsInput, setYearsInput] = useState('');

  const [result, setResult] = useState<RateResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tooLowError, setTooLowError] = useState('');

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const loan = parseFloat(loanInput);
    const payment = parseFloat(paymentInput);
    const years = parseFloat(yearsInput);

    if (loanInput.trim() === '' || isNaN(loan) || loan <= 0) errs.loan = 'Enter a valid loan amount greater than 0.';
    if (paymentInput.trim() === '' || isNaN(payment) || payment <= 0) errs.payment = 'Enter a valid monthly payment greater than 0.';
    if (yearsInput.trim() === '' || isNaN(years) || years <= 0) errs.years = 'Enter a valid loan term in years.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      setTooLowError('');
      return;
    }

    setErrors({});
    setTooLowError('');

    const estimate = estimateInterestRate(loan, payment, years);

    if (!estimate) {
      setTooLowError('Payment is too low to repay this loan. Increase the monthly payment or shorten the loan term.');
      setResult(null);
      return;
    }

    setResult(estimate);
  };

  const handleReset = () => {
    setLoanInput('');
    setPaymentInput('');
    setYearsInput('');
    setResult(null);
    setErrors({});
    setTooLowError('');
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
              <Label htmlFor="loan">Loan Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="loan"
                  type="number"
                  className="pl-7"
                  placeholder="e.g. 20000"
                  min="0"
                  step="0.01"
                  value={loanInput}
                  onChange={(e) => { setLoanInput(e.target.value); setErrors((p) => ({ ...p, loan: '' })); setTooLowError(''); }}
                />
              </div>
              {errors.loan && <p className="text-xs text-destructive">{errors.loan}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment">Monthly Payment</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="payment"
                  type="number"
                  className="pl-7"
                  placeholder="e.g. 400"
                  min="0"
                  step="0.01"
                  value={paymentInput}
                  onChange={(e) => { setPaymentInput(e.target.value); setErrors((p) => ({ ...p, payment: '' })); setTooLowError(''); }}
                />
              </div>
              {errors.payment && <p className="text-xs text-destructive">{errors.payment}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Loan Term (Years)</Label>
              <Input
                id="years"
                type="number"
                placeholder="e.g. 5"
                min="1"
                step="1"
                value={yearsInput}
                onChange={(e) => { setYearsInput(e.target.value); setErrors((p) => ({ ...p, years: '' })); setTooLowError(''); }}
              />
              {errors.years && <p className="text-xs text-destructive">{errors.years}</p>}
            </div>
          </div>

          {tooLowError && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{tooLowError}</p>
          )}

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <Percent className="w-4 h-4" />
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                  <Percent className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Estimated Interest Rate</p>
                  <p className="text-lg sm:text-2xl font-bold text-primary leading-tight truncate">{result.annualRate.toFixed(2)}%</p>
                  <p className="text-xs text-muted-foreground">Annual (APR approx.)</p>
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
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Total Paid</p>
                  <p className="text-lg sm:text-2xl font-bold leading-tight truncate">{formatCurrency(result.totalPaid)}</p>
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
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Total Interest Paid</p>
                  <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight truncate">{formatCurrency(result.totalInterest)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
