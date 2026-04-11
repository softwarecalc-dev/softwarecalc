import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Banknote, TrendingDown, Calendar } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (remaining === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} year${years !== 1 ? 's' : ''} ${remaining} month${remaining !== 1 ? 's' : ''}`;
}

// ─── Core Simulation ─────────────────────────────────────────────────────────

interface PayoffRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

interface PayoffResult {
  totalMonths: number;
  totalInterest: number;
  totalPaid: number;
  schedule: PayoffRow[];
}

function simulateDebtPayoff(
  debt: number,
  annualRate: number,
  monthlyPayment: number
): PayoffResult {
  const monthlyRate = annualRate / 100 / 12;
  const schedule: PayoffRow[] = [];
  let balance = debt;
  let totalInterest = 0;

  while (balance > 0 && schedule.length < 600) {
    const interest = balance * monthlyRate;
    const payment = Math.min(monthlyPayment, balance + interest);
    const principal = payment - interest;
    balance = Math.max(0, balance - principal);
    totalInterest += interest;

    schedule.push({
      month: schedule.length + 1,
      payment,
      interest,
      principal,
      balance,
    });

    if (balance <= 0) break;
  }

  return {
    totalMonths: schedule.length,
    totalInterest,
    totalPaid: schedule.reduce((sum, r) => sum + r.payment, 0),
    schedule,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DebtPayoffCalculator() {
  const [debtInput, setDebtInput] = useState('');
  const [rateInput, setRateInput] = useState('');
  const [paymentInput, setPaymentInput] = useState('');

  const [result, setResult] = useState<PayoffResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tooLowError, setTooLowError] = useState('');

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const debt = parseFloat(debtInput);
    const rate = parseFloat(rateInput);
    const payment = parseFloat(paymentInput);

    if (debtInput.trim() === '' || isNaN(debt) || debt <= 0) errs.debt = 'Enter a valid total debt greater than 0.';
    if (rateInput.trim() === '' || isNaN(rate) || rate <= 0) errs.rate = 'Enter a valid annual interest rate greater than 0.';
    if (paymentInput.trim() === '' || isNaN(payment) || payment <= 0) errs.payment = 'Enter a valid monthly payment greater than 0.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      setTooLowError('');
      return;
    }

    setErrors({});

    const monthlyInterest = debt * (rate / 100 / 12);
    if (payment <= monthlyInterest) {
      setTooLowError(
        `Your monthly payment of ${formatCurrency(payment)} does not cover the first month's interest of ${formatCurrency(monthlyInterest)}. Increase your payment to reduce the balance.`
      );
      setResult(null);
      return;
    }

    setTooLowError('');
    setResult(simulateDebtPayoff(debt, rate, payment));
  };

  const handleReset = () => {
    setDebtInput('');
    setRateInput('');
    setPaymentInput('');
    setResult(null);
    setErrors({});
    setTooLowError('');
  };

  return (
    <div className="space-y-6">
      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Debt Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debt">Total Debt</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="debt"
                  type="number"
                  className="pl-7"
                  placeholder="e.g. 10000"
                  min="0"
                  step="0.01"
                  value={debtInput}
                  onChange={(e) => { setDebtInput(e.target.value); setErrors((p) => ({ ...p, debt: '' })); setTooLowError(''); }}
                />
              </div>
              {errors.debt && <p className="text-xs text-destructive">{errors.debt}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 18"
                min="0"
                step="0.01"
                value={rateInput}
                onChange={(e) => { setRateInput(e.target.value); setErrors((p) => ({ ...p, rate: '' })); setTooLowError(''); }}
              />
              {errors.rate && <p className="text-xs text-destructive">{errors.rate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment">Monthly Payment</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="payment"
                  type="number"
                  className="pl-7"
                  placeholder="e.g. 300"
                  min="0"
                  step="0.01"
                  value={paymentInput}
                  onChange={(e) => { setPaymentInput(e.target.value); setErrors((p) => ({ ...p, payment: '' })); setTooLowError(''); }}
                />
              </div>
              {errors.payment && <p className="text-xs text-destructive">{errors.payment}</p>}
            </div>
          </div>

          {tooLowError && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{tooLowError}</p>
          )}

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <Banknote className="w-4 h-4" />
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
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Months to Payoff</p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight truncate">{formatMonths(result.totalMonths)}</p>
                    <p className="text-xs text-muted-foreground">{result.totalMonths} months total</p>
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

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <Banknote className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Total Amount Paid</p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight truncate">{formatCurrency(result.totalPaid)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payoff Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Month</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Payment</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Interest</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Principal</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.month} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="px-4 py-2 text-muted-foreground">{row.month}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(row.payment)}</td>
                        <td className="px-4 py-2 text-right text-amber-600 dark:text-amber-400">{formatCurrency(row.interest)}</td>
                        <td className="px-4 py-2 text-right text-primary">{formatCurrency(row.principal)}</td>
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
