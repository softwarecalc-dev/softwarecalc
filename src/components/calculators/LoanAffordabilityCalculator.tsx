import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Info } from 'lucide-react';

interface Result {
  loanAmount: number;
  maxMonthlyPayment: number;
  disposableIncome: number;
  dtiRatio: number;
  dtiStatus: 'Comfortable' | 'Moderate' | 'Stretched';
}

function calcLoan(
  income: number,
  expenses: number,
  annualRate: number,
  years: number,
  dtiPct: number,
): Result {
  const disposable = income - expenses;
  const maxPayment = income * (dtiPct / 100);
  const affordablePayment = Math.min(disposable, maxPayment);

  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const loanAmount =
    monthlyRate === 0
      ? affordablePayment * months
      : affordablePayment * (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate;

  const actualDti = (maxPayment / income) * 100;
  const dtiStatus: Result['dtiStatus'] =
    actualDti <= 28 ? 'Comfortable' : actualDti <= 35 ? 'Moderate' : 'Stretched';

  return {
    loanAmount: Math.max(0, loanAmount),
    maxMonthlyPayment: Math.max(0, affordablePayment),
    disposableIncome: disposable,
    dtiRatio: dtiPct,
    dtiStatus,
  };
}

const DTI_REFERENCE = [
  { label: 'Comfortable',    range: 'Below 28%', color: 'text-emerald-600' },
  { label: 'Moderate',       range: '28% – 35%', color: 'text-yellow-600'  },
  { label: 'Stretched',      range: 'Above 35%', color: 'text-red-500'     },
];

export function LoanAffordabilityCalculator() {
  const [income,   setIncome]   = useState('');
  const [expenses, setExpenses] = useState('');
  const [rate,     setRate]     = useState('');
  const [years,    setYears]    = useState('');
  const [dti,      setDti]      = useState('35');
  const [result,   setResult]   = useState<Result | null>(null);
  const [errors,   setErrors]   = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const inc  = parseFloat(income);
    const exp  = parseFloat(expenses);
    const r    = parseFloat(rate);
    const y    = parseFloat(years);
    const d    = parseFloat(dti);

    if (!income   || isNaN(inc) || inc <= 0)          errs.income   = 'Required — must be > 0';
    if (!expenses || isNaN(exp) || exp < 0)            errs.expenses = 'Required — must be ≥ 0';
    if (!rate     || isNaN(r)  || r  <= 0)             errs.rate     = 'Required — must be > 0';
    if (!years    || isNaN(y)  || y  <= 0)             errs.years    = 'Required — must be > 0';
    if (!dti      || isNaN(d)  || d  <= 0 || d > 100) errs.dti      = 'Enter a % between 1–100';
    if (!errs.income && !errs.expenses && inc <= exp)  errs.expenses = 'Expenses must be less than income';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calcLoan(inc, exp, r, y, d));
  };

  const handleReset = () => {
    setIncome(''); setExpenses(''); setRate(''); setYears(''); setDti('35');
    setResult(null); setErrors({});
  };

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const statusColor =
    result?.dtiStatus === 'Comfortable' ? 'text-emerald-600'
    : result?.dtiStatus === 'Moderate'  ? 'text-yellow-600'
    : 'text-red-500';

  const statusCardClass =
    result?.dtiStatus === 'Comfortable' ? 'border-emerald-500/20 bg-emerald-500/5'
    : result?.dtiStatus === 'Moderate'  ? 'border-yellow-500/20 bg-yellow-500/5'
    : 'border-red-500/20 bg-red-500/5';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Loan Affordability Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">

          {/* Row 1 — Income & Expenses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="la-income">Monthly Net Income</Label>
              <Input
                id="la-income"
                type="number"
                placeholder="e.g. 4000"
                value={income}
                onChange={(e) => { setIncome(e.target.value); setErrors({}); }}
                className={errors.income ? 'border-destructive' : ''}
              />
              {errors.income && <p className="text-xs text-destructive">{errors.income}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="la-expenses">Monthly Expenses</Label>
              <Input
                id="la-expenses"
                type="number"
                placeholder="e.g. 1500"
                value={expenses}
                onChange={(e) => { setExpenses(e.target.value); setErrors({}); }}
                className={errors.expenses ? 'border-destructive' : ''}
              />
              {errors.expenses && <p className="text-xs text-destructive">{errors.expenses}</p>}
            </div>
          </div>

          {/* Row 2 — Rate, Term, DTI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="la-rate">Annual Interest Rate (%)</Label>
              <Input
                id="la-rate"
                type="number"
                step="0.1"
                placeholder="e.g. 5.5"
                value={rate}
                onChange={(e) => { setRate(e.target.value); setErrors({}); }}
                className={errors.rate ? 'border-destructive' : ''}
              />
              {errors.rate && <p className="text-xs text-destructive">{errors.rate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="la-years">Loan Term (years)</Label>
              <Input
                id="la-years"
                type="number"
                placeholder="e.g. 20"
                value={years}
                onChange={(e) => { setYears(e.target.value); setErrors({}); }}
                className={errors.years ? 'border-destructive' : ''}
              />
              {errors.years && <p className="text-xs text-destructive">{errors.years}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="la-dti">Max Debt-to-Income (%)</Label>
              <Input
                id="la-dti"
                type="number"
                step="1"
                placeholder="e.g. 35"
                value={dti}
                onChange={(e) => { setDti(e.target.value); setErrors({}); }}
                className={errors.dti ? 'border-destructive' : ''}
              />
              {errors.dti && <p className="text-xs text-destructive">{errors.dti}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="px-8">Calculate</Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Maximum Loan Amount
              </p>
              <p className="text-3xl font-bold text-primary">${fmt(result.loanAmount)}</p>
              <p className="text-xs text-muted-foreground mt-2">based on affordable monthly payment</p>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Max Monthly Payment
              </p>
              <p className="text-3xl font-bold text-primary">${fmt(result.maxMonthlyPayment)}</p>
              <p className="text-xs text-muted-foreground mt-2">lower of disposable income or DTI cap</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Disposable Income
              </p>
              <p className="text-3xl font-bold text-blue-600">${fmt(result.disposableIncome)}</p>
              <p className="text-xs text-muted-foreground mt-2">income minus monthly expenses</p>
            </CardContent>
          </Card>

          <Card className={statusCardClass}>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Debt-to-Income Status
              </p>
              <p className={`text-3xl font-bold ${statusColor}`}>{result.dtiStatus}</p>
              <p className="text-xs text-muted-foreground mt-2">DTI set at {result.dtiRatio}% of income</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reference table — always visible */}
      <Card className="border-muted bg-muted/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            Debt-to-Income Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            <div className="grid grid-cols-2 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div>Status</div>
              <div className="text-right">DTI Range</div>
            </div>
            {DTI_REFERENCE.map((row) => (
              <div key={row.label} className="grid grid-cols-2 py-3 text-sm items-center">
                <div className={`font-medium ${row.color}`}>{row.label}</div>
                <div className="text-right font-mono text-muted-foreground">{row.range}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
            The maximum loan amount is estimated using a standard annuity formula. Results are
            indicative — actual borrowing capacity depends on your credit score, lender criteria,
            and other obligations. Consult a financial adviser before making borrowing decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
