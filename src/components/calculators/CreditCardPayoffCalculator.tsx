import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, CreditCard, Calendar, TrendingDown, Banknote, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatDuration(months: number): string {
  if (months <= 0) return '0 months';
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const yearStr = years > 0 ? `${years} year${years !== 1 ? 's' : ''}` : '';
  const monthStr = remainingMonths > 0 ? `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : '';

  if (yearStr && monthStr) return `${yearStr} ${monthStr}`;
  return yearStr || monthStr;
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
  isInvalid: boolean;
}

function simulatePayoff(
  balance: number,
  annualRate: number,
  monthlyPayment: number,
  extraPayment: number
): PayoffResult {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonthlyPayment = monthlyPayment + extraPayment;
  const schedule: PayoffRow[] = [];
  
  let currentBalance = balance;
  let totalInterest = 0;
  let totalPaid = 0;
  let months = 0;

  // Safety check to prevent infinite loop if payment doesn't cover interest
  const firstMonthInterest = balance * monthlyRate;
  if (totalMonthlyPayment <= firstMonthInterest && annualRate > 0) {
    return {
      totalMonths: 0,
      totalInterest: 0,
      totalPaid: 0,
      schedule: [],
      isInvalid: true
    };
  }

  while (currentBalance > 0 && months < 600) { // Limit to 50 years to be safe
    months++;
    const interest = currentBalance * monthlyRate;
    let payment = Math.min(totalMonthlyPayment, currentBalance + interest);
    const principal = payment - interest;
    
    currentBalance = Math.max(0, currentBalance - principal);
    totalInterest += interest;
    totalPaid += payment;

    schedule.push({
      month: months,
      payment,
      interest,
      principal,
      balance: currentBalance
    });

    if (currentBalance <= 0) break;
  }

  return {
    totalMonths: months,
    totalInterest,
    totalPaid,
    schedule,
    isInvalid: false
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CreditCardPayoffCalculator() {
  const [balanceInput, setBalanceInput] = useState('');
  const [rateInput, setRateInput] = useState('');
  const [paymentInput, setPaymentInput] = useState('');
  const [extraInput, setExtraInput] = useState('');

  const [result, setResult] = useState<PayoffResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const b = parseFloat(balanceInput);
    const r = parseFloat(rateInput);
    const p = parseFloat(paymentInput);
    const e = parseFloat(extraInput) || 0;

    if (balanceInput.trim() === '' || isNaN(b) || b <= 0) errs.balance = 'Enter a valid balance greater than 0.';
    if (rateInput.trim() === '' || isNaN(r) || r < 0) errs.rate = 'Enter a valid interest rate (0 or more).';
    if (paymentInput.trim() === '' || isNaN(p) || p <= 0) errs.payment = 'Enter a valid monthly payment greater than 0.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const payoff = simulatePayoff(b, r, p, e);
    setResult(payoff);
  };

  const handleReset = () => {
    setBalanceInput('');
    setRateInput('');
    setPaymentInput('');
    setExtraInput('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Credit Card Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="balance">Credit Card Balance</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="balance"
                  type="number"
                  className="pl-7"
                  placeholder="e.g. 5000"
                  min="0"
                  step="0.01"
                  value={balanceInput}
                  onChange={(e) => { setBalanceInput(e.target.value); setErrors((prev) => ({ ...prev, balance: '' })); }}
                />
              </div>
              {errors.balance && <p className="text-xs text-destructive">{errors.balance}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 19.99"
                min="0"
                step="0.01"
                value={rateInput}
                onChange={(e) => { setRateInput(e.target.value); setErrors((prev) => ({ ...prev, rate: '' })); }}
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
                  placeholder="e.g. 200"
                  min="0"
                  step="0.01"
                  value={paymentInput}
                  onChange={(e) => { setPaymentInput(e.target.value); setErrors((prev) => ({ ...prev, payment: '' })); }}
                />
              </div>
              {errors.payment && <p className="text-xs text-destructive">{errors.payment}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="extra">Extra Monthly Payment <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="extra"
                  type="number"
                  className="pl-7"
                  placeholder="e.g. 50"
                  min="0"
                  step="0.01"
                  value={extraInput}
                  onChange={(e) => setExtraInput(e.target.value)}
                />
              </div>
            </div>
          </div>

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
      {result && result.isInvalid && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Payment is too low to reduce balance. Your interest each month is greater than or equal to your total monthly payment.
          </AlertDescription>
        </Alert>
      )}

      {result && !result.isInvalid && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight truncate">Payoff Time</p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight truncate">{formatDuration(result.totalMonths)}</p>
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
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
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
              <CardTitle className="text-base">Repayment Schedule</CardTitle>
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
