import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Banknote, Calendar, TrendingDown } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatTimeSaved(months: number): string {
  if (months <= 0) return '0 months';
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} month${m !== 1 ? 's' : ''}`;
  if (m === 0) return `${y} year${y !== 1 ? 's' : ''}`;
  return `${y} year${y !== 1 ? 's' : ''} ${m} month${m !== 1 ? 's' : ''}`;
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatPayoffDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// ─── Core amortization ────────────────────────────────────────────────────────

interface AmortRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  numMonths: number;
  payoffDate: Date;
  schedule: AmortRow[];   // full schedule, used for tables
}

function calcLoan(
  financed: number,
  annualRate: number,
  termMonths: number,
): LoanResult | null {
  if (financed <= 0 || termMonths <= 0) return null;

  const r = annualRate / 100 / 12;
  let monthlyPayment: number;

  if (r === 0) {
    monthlyPayment = financed / termMonths;
  } else {
    monthlyPayment =
      (financed * r * Math.pow(1 + r, termMonths)) /
      (Math.pow(1 + r, termMonths) - 1);
  }

  const schedule: AmortRow[] = [];
  let balance = financed;

  for (let m = 1; m <= termMonths; m++) {
    const interestPmt = balance * r;
    const principalPmt = Math.min(monthlyPayment - interestPmt, balance);
    balance = Math.max(0, balance - principalPmt);
    schedule.push({
      month: m,
      payment: principalPmt + interestPmt,
      principal: principalPmt,
      interest: interestPmt,
      balance,
    });
    if (balance === 0) break;
  }

  const totalPayment = schedule.reduce((s, r) => s + r.payment, 0);
  const totalInterest = totalPayment - financed;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    numMonths: schedule.length,
    payoffDate: new Date(), // placeholder — set by caller
    schedule,
  };
}

function calcLoanWithExtra(
  financed: number,
  annualRate: number,
  termMonths: number,
  extra: number,
): LoanResult | null {
  if (financed <= 0 || termMonths <= 0 || extra <= 0) return null;

  const baseResult = calcLoan(financed, annualRate, termMonths);
  if (!baseResult) return null;

  const r = annualRate / 100 / 12;
  const payment = baseResult.monthlyPayment + extra;
  const schedule: AmortRow[] = [];
  let balance = financed;
  let m = 0;

  while (balance > 0 && m < termMonths * 2) {
    m++;
    const interestPmt = balance * r;
    const principalPmt = Math.min(payment - interestPmt, balance);
    balance = Math.max(0, balance - principalPmt);
    schedule.push({
      month: m,
      payment: principalPmt + interestPmt,
      principal: principalPmt,
      interest: interestPmt,
      balance,
    });
    if (balance === 0) break;
  }

  const totalPayment = schedule.reduce((s, r) => s + r.payment, 0);
  const totalInterest = totalPayment - financed;

  return {
    monthlyPayment: payment,
    totalPayment,
    totalInterest,
    numMonths: schedule.length,
    payoffDate: new Date(),
    schedule,
  };
}

// ─── Yearly summary helper ─────────────────────────────────────────────────────

interface YearSummary {
  year: number;
  principalPaid: number;
  interestPaid: number;
  endBalance: number;
}

function buildYearlySummary(schedule: AmortRow[]): YearSummary[] {
  const map: Record<number, YearSummary> = {};
  for (const row of schedule) {
    const yr = Math.ceil(row.month / 12);
    if (!map[yr]) map[yr] = { year: yr, principalPaid: 0, interestPaid: 0, endBalance: 0 };
    map[yr].principalPaid += row.principal;
    map[yr].interestPaid += row.interest;
    map[yr].endBalance = row.balance;
  }
  return Object.values(map).sort((a, b) => a.year - b.year);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [extraPayment, setExtraPayment] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [startDate, setStartDate] = useState('');

  const [result, setResult] = useState<LoanResult | null>(null);
  const [extraResult, setExtraResult] = useState<LoanResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFullAmort, setShowFullAmort] = useState(false);

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const la = parseFloat(loanAmount);
    const ir = parseFloat(interestRate);
    const ty = parseFloat(termYears);
    const dp = parseFloat(downPayment) || 0;
    const ep = parseFloat(extraPayment) || 0;

    if (loanAmount.trim() === '' || isNaN(la) || la <= 0) errs.loanAmount = 'Enter a valid loan amount greater than 0.';
    if (interestRate.trim() === '' || isNaN(ir) || ir < 0) errs.interestRate = 'Enter a valid interest rate (0 or more).';
    if (termYears.trim() === '' || isNaN(ty) || ty <= 0) errs.termYears = 'Enter a valid term in years.';
    if (!isNaN(dp) && dp >= la) errs.downPayment = 'Down payment must be less than the loan amount.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      setExtraResult(null);
      return;
    }

    setErrors({});

    const financed = Math.max(0, la - dp);
    const termMonths = Math.round(ty * 12);
    const start = startDate ? new Date(startDate + '-01') : new Date();

    const base = calcLoan(financed, ir, termMonths);
    if (base) base.payoffDate = addMonths(start, base.numMonths);
    setResult(base);

    if (ep > 0 && base) {
      const ex = calcLoanWithExtra(financed, ir, termMonths, ep);
      if (ex) ex.payoffDate = addMonths(start, ex.numMonths);
      setExtraResult(ex);
    } else {
      setExtraResult(null);
    }

    setShowFullAmort(false);
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setTermYears('');
    setExtraPayment('');
    setDownPayment('');
    setStartDate('');
    setResult(null);
    setExtraResult(null);
    setErrors({});
    setShowFullAmort(false);
  };

  const firstTwelve = result?.schedule.slice(0, 12) ?? [];
  const yearlySummary = result ? buildYearlySummary(result.schedule) : [];
  const displaySchedule = showFullAmort ? result?.schedule ?? [] : firstTwelve;

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
                min="1"
                step="1"
                value={termYears}
                onChange={(e) => { setTermYears(e.target.value); setErrors((p) => ({ ...p, termYears: '' })); }}
              />
              {errors.termYears && <p className="text-xs text-destructive">{errors.termYears}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">
                Start Date <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="startDate"
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="downPayment">
                Down Payment <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="downPayment"
                type="number"
                placeholder="e.g. 2000"
                min="0"
                step="0.01"
                value={downPayment}
                onChange={(e) => { setDownPayment(e.target.value); setErrors((p) => ({ ...p, downPayment: '' })); }}
              />
              {errors.downPayment && <p className="text-xs text-destructive">{errors.downPayment}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="extraPayment">
                Extra Monthly Payment  <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="extraPayment"
                type="number"
                placeholder="e.g. 100"
                min="0"
                step="0.01"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
              />
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

      {/* ── Primary Results ── */}
      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <Banknote className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Monthly Payment</p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight break-words">{formatCurrency(result.monthlyPayment)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <TrendingDown className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Total Payment</p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight break-words">{formatCurrency(result.totalPayment)}</p>
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
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Total Interest</p>
                    <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight break-words">{formatCurrency(result.totalInterest)}</p>
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
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Payoff Date</p>
                    <p className="text-lg sm:text-xl font-bold leading-tight break-words">{formatPayoffDate(result.payoffDate)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-muted">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm text-muted-foreground">
                This calculator uses a standard loan amortization formula commonly used for fixed-rate loans.
              </p>
            </CardContent>
          </Card>

          {/* ── Extra Payment Section ── */}
          {extraResult && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-base text-primary">With Extra Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">New Payoff Date</p>
                    <p className="text-xl font-bold text-primary">{formatPayoffDate(extraResult.payoffDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Interest Saved</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(result.totalInterest - extraResult.totalInterest)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Time Saved</p>
                    <p className="text-xl font-bold text-primary">{formatTimeSaved(result.numMonths - extraResult.numMonths)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Amortization Table (first 12 months) ── */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Amortization Schedule</CardTitle>
              {result.schedule.length > 12 && (
                <button
                  className="text-xs text-primary underline-offset-2 hover:underline"
                  onClick={() => setShowFullAmort((v) => !v)}
                >
                  {showFullAmort ? 'Show first 12 months' : `Show all ${result.schedule.length} months`}
                </button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Month</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Payment</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Principal</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Interest</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displaySchedule.map((row) => (
                      <tr key={row.month} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="px-4 py-2 text-muted-foreground">{row.month}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(row.payment)}</td>
                        <td className="px-4 py-2 text-right text-primary">{formatCurrency(row.principal)}</td>
                        <td className="px-4 py-2 text-right text-amber-600 dark:text-amber-400">{formatCurrency(row.interest)}</td>
                        <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* ── Yearly Summary ── */}
          {yearlySummary.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Yearly Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground">Year</th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">Principal Paid</th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">Interest Paid</th>
                        <th className="text-right px-4 py-2 font-medium text-muted-foreground">End Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlySummary.map((row) => (
                        <tr key={row.year} className="border-b last:border-0 hover:bg-muted/20">
                          <td className="px-4 py-2 text-muted-foreground">{row.year}</td>
                          <td className="px-4 py-2 text-right text-primary">{formatCurrency(row.principalPaid)}</td>
                          <td className="px-4 py-2 text-right text-amber-600 dark:text-amber-400">{formatCurrency(row.interestPaid)}</td>
                          <td className="px-4 py-2 text-right font-medium">{formatCurrency(row.endBalance)}</td>
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
