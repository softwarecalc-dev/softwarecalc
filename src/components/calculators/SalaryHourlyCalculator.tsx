import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCcw, Banknote, Clock, Calculator } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SalaryHourlyCalculator() {
  const [mode, setMode] = useState<'yearlyToHourly' | 'hourlyToYearly'>('yearlyToHourly');
  const [amount, setAmount] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');

  const [result, setResult] = useState<{ hourly: number; yearly: number } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const val = parseFloat(amount);
    const hpw = parseFloat(hoursPerWeek);
    const wpy = parseFloat(weeksPerYear);

    if (amount.trim() === '' || isNaN(val) || val <= 0) {
      errs.amount = `Enter a valid ${mode === 'yearlyToHourly' ? 'salary' : 'hourly wage'} greater than 0.`;
    }
    if (hoursPerWeek.trim() === '' || isNaN(hpw) || hpw <= 0) {
      errs.hoursPerWeek = 'Enter valid hours per week greater than 0.';
    }
    if (weeksPerYear.trim() === '' || isNaN(wpy) || wpy <= 0) {
      errs.weeksPerYear = 'Enter valid weeks per year greater than 0.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});

    let hourly = 0;
    let yearly = 0;

    if (mode === 'yearlyToHourly') {
      yearly = val;
      hourly = val / (hpw * wpy);
    } else {
      hourly = val;
      yearly = val * hpw * wpy;
    }

    setResult({ hourly, yearly });
  };

  const handleReset = () => {
    setAmount('');
    setHoursPerWeek('40');
    setWeeksPerYear('52');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Salary & Hours Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs 
            value={mode} 
            onValueChange={(v) => {
              setMode(v as any);
              setResult(null);
              setErrors({});
            }} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="yearlyToHourly">Yearly to Hourly</TabsTrigger>
              <TabsTrigger value="hourlyToYearly">Hourly to Yearly</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">
                {mode === 'yearlyToHourly' ? 'Annual Salary' : 'Hourly Wage'}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-7"
                  placeholder={mode === 'yearlyToHourly' ? 'e.g. 60000' : 'e.g. 30'}
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setErrors((p) => ({ ...p, amount: '' })); }}
                />
              </div>
              {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">Hours per Week</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                placeholder="40"
                min="1"
                step="0.5"
                value={hoursPerWeek}
                onChange={(e) => { setHoursPerWeek(e.target.value); setErrors((p) => ({ ...p, hoursPerWeek: '' })); }}
              />
              {errors.hoursPerWeek && <p className="text-xs text-destructive">{errors.hoursPerWeek}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeksPerYear">Weeks per Year</Label>
              <Input
                id="weeksPerYear"
                type="number"
                placeholder="52"
                min="1"
                step="1"
                value={weeksPerYear}
                onChange={(e) => { setWeeksPerYear(e.target.value); setErrors((p) => ({ ...p, weeksPerYear: '' })); }}
              />
              {errors.weeksPerYear && <p className="text-xs text-destructive">{errors.weeksPerYear}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate} className="gap-2">
              <Calculator className="w-4 h-4" />
              Calculate
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className={mode === 'yearlyToHourly' ? 'border-primary/30 bg-primary/5' : ''}>
            <CardContent className="pt-5 pb-5 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className={`p-2 rounded-lg ${mode === 'yearlyToHourly' ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Clock className={`w-6 h-6 ${mode === 'yearlyToHourly' ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Hourly Wage</p>
                  <p className={`text-2xl font-bold ${mode === 'yearlyToHourly' ? 'text-primary' : ''}`}>
                    {formatCurrency(result.hourly)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={mode === 'hourlyToYearly' ? 'border-primary/30 bg-primary/5' : ''}>
            <CardContent className="pt-5 pb-5 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className={`p-2 rounded-lg ${mode === 'hourlyToYearly' ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Banknote className={`w-6 h-6 ${mode === 'hourlyToYearly' ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Yearly Salary Equivalent</p>
                  <p className={`text-2xl font-bold ${mode === 'hourlyToYearly' ? 'text-primary' : ''}`}>
                    {formatCurrency(result.yearly)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
