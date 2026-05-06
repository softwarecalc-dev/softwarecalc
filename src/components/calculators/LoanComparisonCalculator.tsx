import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Info, Trophy } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoanInputs {
  amount: string;
  rate: string;
  years: string;
}

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

type LoanErrors = Partial<Record<keyof LoanInputs, string>>;

// ─── Calculation ──────────────────────────────────────────────────────────────

function calcLoan(amount: number, annualRate: number, years: number): LoanResult {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const monthlyPayment =
    monthlyRate === 0
      ? amount / months
      : (amount * (monthlyRate * factor)) / (factor - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - amount;
  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
  };
}

function validateLoan(inputs: LoanInputs, prefix: string): LoanErrors {
  const errs: LoanErrors = {};
  const a = parseFloat(inputs.amount);
  const r = parseFloat(inputs.rate);
  const y = parseFloat(inputs.years);
  if (!inputs.amount || isNaN(a) || a <= 0) errs.amount = 'Required — must be > 0';
  if (!inputs.rate   || isNaN(r) || r <= 0) errs.rate   = 'Required — must be > 0';
  if (!inputs.years  || isNaN(y) || y <= 0) errs.years  = 'Required — must be > 0';
  return errs;
}

// ─── Sub-component: loan input panel ─────────────────────────────────────────

interface LoanPanelProps {
  label: string;
  id: string;
  inputs: LoanInputs;
  errors: LoanErrors;
  onChange: (field: keyof LoanInputs, value: string) => void;
}

function LoanPanel({ label, id, inputs, errors, onChange }: LoanPanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-base border-b pb-2">{label}</h3>

      <div className="space-y-2">
        <Label htmlFor={`${id}-amount`}>Loan Amount</Label>
        <Input
          id={`${id}-amount`}
          type="number"
          placeholder="e.g. 200000"
          value={inputs.amount}
          onChange={(e) => onChange('amount', e.target.value)}
          className={errors.amount ? 'border-destructive' : ''}
        />
        {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-rate`}>Annual Interest Rate (%)</Label>
        <Input
          id={`${id}-rate`}
          type="number"
          step="0.1"
          placeholder="e.g. 4.5"
          value={inputs.rate}
          onChange={(e) => onChange('rate', e.target.value)}
          className={errors.rate ? 'border-destructive' : ''}
        />
        {errors.rate && <p className="text-xs text-destructive">{errors.rate}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-years`}>Loan Term (years)</Label>
        <Input
          id={`${id}-years`}
          type="number"
          placeholder="e.g. 25"
          value={inputs.years}
          onChange={(e) => onChange('years', e.target.value)}
          className={errors.years ? 'border-destructive' : ''}
        />
        {errors.years && <p className="text-xs text-destructive">{errors.years}</p>}
      </div>
    </div>
  );
}

// ─── Sub-component: result stat cards ────────────────────────────────────────

interface ResultPanelProps {
  label: string;
  result: LoanResult;
  isCheaper: boolean;
}

function ResultPanel({ label, result, isCheaper }: ResultPanelProps) {
  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-3">
      <h3 className={`font-semibold text-base border-b pb-2 flex items-center gap-2 ${isCheaper ? 'text-emerald-600' : ''}`}>
        {isCheaper && <Trophy className="w-4 h-4" />}
        {label}
        {isCheaper && <span className="text-xs font-normal text-muted-foreground">(cheaper)</span>}
      </h3>

      <Card className={isCheaper ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-primary/30 bg-primary/5'}>
        <CardContent className="pt-4 pb-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Monthly Payment</p>
          <p className={`text-2xl font-bold ${isCheaper ? 'text-emerald-600' : 'text-primary'}`}>
            ${fmt(result.monthlyPayment)}
          </p>
        </CardContent>
      </Card>

      <Card className={isCheaper ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-primary/30 bg-primary/5'}>
        <CardContent className="pt-4 pb-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Payment</p>
          <p className={`text-2xl font-bold ${isCheaper ? 'text-emerald-600' : 'text-primary'}`}>
            ${fmt(result.totalPayment)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 pb-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-orange-500">${fmt(result.totalInterest)}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const EMPTY: LoanInputs = { amount: '', rate: '', years: '' };

export function LoanComparisonCalculator() {
  const [loan1, setLoan1] = useState<LoanInputs>({ ...EMPTY });
  const [loan2, setLoan2] = useState<LoanInputs>({ ...EMPTY });
  const [errors1, setErrors1] = useState<LoanErrors>({});
  const [errors2, setErrors2] = useState<LoanErrors>({});
  const [results, setResults] = useState<{ r1: LoanResult; r2: LoanResult } | null>(null);

  const updateLoan1 = (field: keyof LoanInputs, value: string) => {
    setLoan1((p) => ({ ...p, [field]: value }));
    setErrors1((p) => ({ ...p, [field]: undefined }));
  };
  const updateLoan2 = (field: keyof LoanInputs, value: string) => {
    setLoan2((p) => ({ ...p, [field]: value }));
    setErrors2((p) => ({ ...p, [field]: undefined }));
  };

  const handleCalculate = () => {
    const e1 = validateLoan(loan1, 'loan1');
    const e2 = validateLoan(loan2, 'loan2');
    setErrors1(e1);
    setErrors2(e2);

    if (Object.keys(e1).length > 0 || Object.keys(e2).length > 0) {
      setResults(null);
      return;
    }

    const r1 = calcLoan(parseFloat(loan1.amount), parseFloat(loan1.rate), parseFloat(loan1.years));
    const r2 = calcLoan(parseFloat(loan2.amount), parseFloat(loan2.rate), parseFloat(loan2.years));
    setResults({ r1, r2 });
  };

  const handleReset = () => {
    setLoan1({ ...EMPTY });
    setLoan2({ ...EMPTY });
    setErrors1({});
    setErrors2({});
    setResults(null);
  };

  const loan1IsCheaper = results ? results.r1.totalPayment <= results.r2.totalPayment : false;
  const cheaperLabel   = loan1IsCheaper ? 'Loan 1' : 'Loan 2';
  const savings        = results
    ? Math.abs(results.r1.totalPayment - results.r2.totalPayment)
    : 0;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Input card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Loan Comparison Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <LoanPanel
              label="Loan 1"
              id="l1"
              inputs={loan1}
              errors={errors1}
              onChange={updateLoan1}
            />
            <LoanPanel
              label="Loan 2"
              id="l2"
              inputs={loan2}
              errors={errors2}
              onChange={updateLoan2}
            />
          </div>

          <div className="flex gap-3 pt-1 border-t">
            <Button onClick={handleCalculate} className="px-8">Compare Loans</Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Per-loan stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ResultPanel label="Loan 1" result={results.r1} isCheaper={loan1IsCheaper} />
            <ResultPanel label="Loan 2" result={results.r2} isCheaper={!loan1IsCheaper} />
          </div>

          {/* Cheaper loan summary */}
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3 mb-1">
                <Trophy className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Cheaper Loan
                </p>
              </div>
              <p className="text-3xl font-bold text-emerald-600">{cheaperLabel}</p>
              <p className="text-xs text-muted-foreground mt-2">
                saves ${fmt(savings)} in total payments compared to the other option
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {/* Reference table — always visible */}
      <Card className="border-muted bg-muted/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            How the comparison works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            <div className="grid grid-cols-2 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div>Metric</div>
              <div className="text-right">What it means</div>
            </div>
            {[
              { label: 'Monthly Payment', desc: 'Fixed amount owed each month' },
              { label: 'Total Payment',   desc: 'Principal + all interest paid over full term' },
              { label: 'Total Interest',  desc: 'Cost of borrowing above the original amount' },
              { label: 'Cheaper Loan',    desc: 'Loan with the lower total payment overall' },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-2 py-3 text-sm items-center gap-4">
                <div className="font-medium">{row.label}</div>
                <div className="text-right text-muted-foreground">{row.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
            Calculations use the standard annuity formula assuming a fixed interest rate and equal
            monthly payments. Results do not account for fees, insurance, variable rates, or early
            repayment charges. Consult a financial adviser before making borrowing decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
