import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Wallet, TrendingDown, Banknote, Percent } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── Types ────────────────────────────────────────────────────────────────────

type PayPeriod = 'yearly' | 'monthly';

interface BreakdownRow {
  period: string;
  gross: number;
  tax: number;
  net: number;
}

interface CalcResult {
  netSalary: number;
  taxAmount: number;
  grossSalary: number;
  effectiveTaxRate: number;
  yearlyNet: number;
  monthlyNet: number;
  payPeriod: PayPeriod;
  rows: BreakdownRow[];
}

// ─── Core calculation ─────────────────────────────────────────────────────────

function calculate(gross: number, taxRate: number, payPeriod: PayPeriod): CalcResult {
  const taxAmount = gross * (taxRate / 100);
  const netSalary = gross - taxAmount;

  const yearlyNet = payPeriod === 'yearly' ? netSalary : netSalary * 12;
  const monthlyNet = payPeriod === 'yearly' ? netSalary / 12 : netSalary;
  const yearlyGross = payPeriod === 'yearly' ? gross : gross * 12;
  const yearlyTax = payPeriod === 'yearly' ? taxAmount : taxAmount * 12;
  const monthlyGross = payPeriod === 'yearly' ? gross / 12 : gross;
  const monthlyTax = payPeriod === 'yearly' ? taxAmount / 12 : taxAmount;

  const rows: BreakdownRow[] = [];

  if (payPeriod === 'yearly') {
    // 12 monthly rows
    for (let m = 1; m <= 12; m++) {
      const date = new Date(2024, m - 1, 1);
      const monthName = date.toLocaleString('en-US', { month: 'long' });
      rows.push({ period: monthName, gross: monthlyGross, tax: monthlyTax, net: monthlyNet });
    }
  } else {
    // 12-month projection from monthly input
    for (let m = 1; m <= 12; m++) {
      const date = new Date(2024, m - 1, 1);
      const monthName = date.toLocaleString('en-US', { month: 'long' });
      rows.push({ period: monthName, gross: gross, tax: taxAmount, net: netSalary });
    }
    // Add yearly totals row
    rows.push({ period: 'Annual Total', gross: yearlyGross, tax: yearlyTax, net: yearlyNet });
  }

  return {
    netSalary,
    taxAmount,
    grossSalary: gross,
    effectiveTaxRate: taxRate,
    yearlyNet,
    monthlyNet,
    payPeriod,
    rows,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

const PAY_PERIODS: { label: string; value: PayPeriod }[] = [
  { label: 'Yearly', value: 'yearly' },
  { label: 'Monthly', value: 'monthly' },
];

export function SalaryAfterTaxCalculator() {
  const [grossSalary, setGrossSalary] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('yearly');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const g = parseFloat(grossSalary);
    const r = parseFloat(taxRate);

    if (grossSalary.trim() === '' || isNaN(g) || g < 0) errs.grossSalary = 'Enter a valid gross salary (0 or more).';
    if (taxRate.trim() === '' || isNaN(r) || r < 0 || r > 100) errs.taxRate = 'Tax rate must be between 0 and 100.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculate(g, r, payPeriod));
  };

  const handleReset = () => {
    setGrossSalary('');
    setTaxRate('');
    setPayPeriod('yearly');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">

      {/* ── Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Salary Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="grossSalary">Gross Salary</Label>
              <Input
                id="grossSalary"
                type="number"
                placeholder="e.g. 50000"
                min="0"
                step="0.01"
                value={grossSalary}
                onChange={(e) => { setGrossSalary(e.target.value); setErrors((p) => ({ ...p, grossSalary: '' })); }}
              />
              {errors.grossSalary && <p className="text-xs text-destructive">{errors.grossSalary}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                placeholder="e.g. 20"
                min="0"
                max="100"
                step="0.01"
                value={taxRate}
                onChange={(e) => { setTaxRate(e.target.value); setErrors((p) => ({ ...p, taxRate: '' })); }}
              />
              {errors.taxRate && <p className="text-xs text-destructive">{errors.taxRate}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Pay Period</Label>
              <div className="flex gap-2 flex-wrap">
                {PAY_PERIODS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPayPeriod(opt.value)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      payPeriod === opt.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <Wallet className="w-4 h-4" />
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
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">
                      Net Salary ({result.payPeriod === 'yearly' ? 'Yearly' : 'Monthly'})
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight break-words">
                      {formatNumber(result.netSalary)}
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
                      Tax Amount
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 leading-tight break-words">
                      {formatNumber(result.taxAmount)}
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
                      Gross Salary
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight break-words">
                      {formatNumber(result.grossSalary)}
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
                      Effective Tax Rate
                    </p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight break-words">
                      {result.effectiveTaxRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* ── Period context ── */}
          {result.payPeriod === 'yearly' && (
            <Card className="border-muted">
              <CardContent className="pt-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  Monthly net take-home: <span className="font-semibold text-foreground">{formatNumber(result.monthlyNet)}</span>
                </p>
              </CardContent>
            </Card>
          )}
          {result.payPeriod === 'monthly' && (
            <Card className="border-muted">
              <CardContent className="pt-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  Yearly net take-home: <span className="font-semibold text-foreground">{formatNumber(result.yearlyNet)}</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── Breakdown table ── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {result.payPeriod === 'yearly' ? 'Monthly Breakdown' : '12-Month Projection'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Period</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Gross Salary</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Tax Amount</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Net Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b last:border-0 hover:bg-muted/20 ${
                          row.period === 'Annual Total' ? 'font-semibold bg-muted/10' : ''
                        }`}
                      >
                        <td className="px-4 py-2 text-muted-foreground">{row.period}</td>
                        <td className="px-4 py-2 text-right">{formatNumber(row.gross)}</td>
                        <td className="px-4 py-2 text-right text-amber-600 dark:text-amber-400">{formatNumber(row.tax)}</td>
                        <td className="px-4 py-2 text-right text-primary font-medium">{formatNumber(row.net)}</td>
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
