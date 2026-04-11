import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const FREQUENCY_OPTIONS = [
  { label: 'Annually', value: 1 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 },
] as const;

type FrequencyValue = 1 | 12 | 365;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrencyShort(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return formatCurrency(value);
}

interface ChartPoint {
  year: number;
  contributions: number;
  totalValue: number;
}

function calcGrowth(
  principal: number,
  monthlyContrib: number,
  annualRate: number,
  years: number,
  frequency: FrequencyValue,
  annualContribIncrease: number,
): ChartPoint[] {
  const n = frequency;
  const r = annualRate / 100;
  const g = annualContribIncrease / 100; // escalation rate
  const points: ChartPoint[] = [];

  // Simulate month-by-month to correctly handle per-year contribution escalation
  // and arbitrary compounding frequencies.
  const periodsPerYear = n;
  const rPerPeriod = r / periodsPerYear;
  const monthsPerPeriod = 12 / periodsPerYear;

  let balance = principal;
  let totalContributions = principal;

  // Year 0 snapshot
  points.push({ year: 0, contributions: Math.round(totalContributions), totalValue: Math.round(balance) });

  for (let yr = 1; yr <= years; yr++) {
    // Monthly contribution for this year, escalated from year 1
    const monthlyThisYear = monthlyContrib * Math.pow(1 + g, yr - 1);
    // Annualised contribution for this year
    const annualContribThisYear = monthlyThisYear * 12;
    // Per-compounding-period contribution for this year
    const periodicContrib = annualContribThisYear / periodsPerYear;

    for (let p = 0; p < periodsPerYear; p++) {
      balance = balance * (1 + rPerPeriod) + periodicContrib;
    }

    totalContributions += annualContribThisYear;

    points.push({
      year: yr,
      contributions: Math.round(totalContributions),
      totalValue: Math.round(balance),
    });
  }

  return points;
}

const DEFAULT_STATE = {
  principal: '',
  monthlyContrib: '',
  contribIncrease: '0',
  rate: '',
  years: '',
  frequency: 12 as FrequencyValue,
};

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(DEFAULT_STATE.principal);
  const [monthlyContrib, setMonthlyContrib] = useState(DEFAULT_STATE.monthlyContrib);
  const [contribIncrease, setContribIncrease] = useState(DEFAULT_STATE.contribIncrease);
  const [rate, setRate] = useState(DEFAULT_STATE.rate);
  const [years, setYears] = useState(DEFAULT_STATE.years);
  const [frequency, setFrequency] = useState<FrequencyValue>(DEFAULT_STATE.frequency);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    if (isNaN(p) || p < 0) errs.principal = 'Enter a valid initial investment (0 or more).';
    if (isNaN(r) || r < 0) errs.rate = 'Interest rate must be 0 or greater.';
    if (isNaN(y) || y <= 0 || !Number.isInteger(y)) errs.years = 'Enter a whole number of years greater than 0.';
    return errs;
  };

  const chartData = useMemo<ChartPoint[] | null>(() => {
    const p = parseFloat(principal);
    const mc = parseFloat(monthlyContrib) || 0;
    const ci = Math.max(0, parseFloat(contribIncrease) || 0);
    const r = parseFloat(rate);
    const y = parseInt(years, 10);
    if (isNaN(p) || p < 0 || isNaN(r) || r < 0 || isNaN(y) || y <= 0) return null;
    return calcGrowth(p, mc, r, y, frequency, ci);
  }, [principal, monthlyContrib, contribIncrease, rate, years, frequency]);

  const summary = chartData ? chartData[chartData.length - 1] : null;
  const totalInterest = summary ? summary.totalValue - summary.contributions : null;

  const handleCalculate = () => {
    const errs = validate();
    setErrors(errs);
  };

  const handleReset = () => {
    setPrincipal(DEFAULT_STATE.principal);
    setMonthlyContrib(DEFAULT_STATE.monthlyContrib);
    setContribIncrease(DEFAULT_STATE.contribIncrease);
    setRate(DEFAULT_STATE.rate);
    setYears(DEFAULT_STATE.years);
    setFrequency(DEFAULT_STATE.frequency);
    setErrors({});
  };

  const hasValidData = chartData !== null && summary !== null;

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Investment ($)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="e.g. 10000"
                min="0"
                value={principal}
                onChange={(e) => { setPrincipal(e.target.value); setErrors((prev) => ({ ...prev, principal: '' })); }}
              />
              {errors.principal && <p className="text-xs text-destructive">{errors.principal}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly Contribution ($) <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input
                id="monthly"
                type="number"
                placeholder="e.g. 500"
                min="0"
                value={monthlyContrib}
                onChange={(e) => setMonthlyContrib(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contribIncrease">Annual Contribution Increase (%) <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input
                id="contribIncrease"
                type="number"
                placeholder="e.g. 3"
                min="0"
                step="0.1"
                value={contribIncrease}
                onChange={(e) => {
                  const val = e.target.value;
                  // Prevent negative values
                  if (val === '' || parseFloat(val) >= 0) setContribIncrease(val);
                }}
              />
              <p className="text-xs text-muted-foreground">Increase monthly contributions by this % each year.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 7"
                min="0"
                step="0.01"
                value={rate}
                onChange={(e) => { setRate(e.target.value); setErrors((prev) => ({ ...prev, rate: '' })); }}
              />
              {errors.rate && <p className="text-xs text-destructive">{errors.rate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Number of Years</Label>
              <Input
                id="years"
                type="number"
                placeholder="e.g. 20"
                min="1"
                step="1"
                value={years}
                onChange={(e) => { setYears(e.target.value); setErrors((prev) => ({ ...prev, years: '' })); }}
              />
              {errors.years && <p className="text-xs text-destructive">{errors.years}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Compounding Frequency</Label>
              <div className="flex gap-2 flex-wrap">
                {FREQUENCY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFrequency(opt.value)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      frequency === opt.value
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

      {/* Results */}
      {hasValidData && summary && totalInterest !== null && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Final Value</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(summary.totalValue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <PiggyBank className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Contributions</p>
                    <p className="text-2xl font-bold">{formatCurrency(summary.contributions)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Interest Earned</p>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Investment Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData!}
                    margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#209250" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#209250" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="colorContrib" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="year"
                      tickFormatter={(v) => `Yr ${v}`}
                      tick={{ fontSize: 11 }}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      tickFormatter={formatCurrencyShort}
                      tick={{ fontSize: 11 }}
                      width={60}
                      className="text-muted-foreground"
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        formatCurrency(value),
                        name === 'totalValue' ? 'Total Value' : 'Contributions',
                      ]}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{
                        borderRadius: '8px',
                        fontSize: '13px',
                      }}
                    />
                    <Legend
                      formatter={(value) =>
                        value === 'totalValue' ? 'Total Value' : 'Contributions'
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="contributions"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      fill="url(#colorContrib)"
                      dot={false}
                    />
                    <Area
                      type="monotone"
                      dataKey="totalValue"
                      stroke="#209250"
                      strokeWidth={2.5}
                      fill="url(#colorValue)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
