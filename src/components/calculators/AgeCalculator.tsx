import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Calendar } from 'lucide-react';

function getTodayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [asOf, setAsOf] = useState(getTodayString());
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalMonths: number;
    totalDays: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    if (!dob) {
      setError('Please enter your date of birth.');
      setResult(null);
      return;
    }

    const birth = new Date(dob);
    const target = asOf ? new Date(asOf) : new Date();

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
      setError('Invalid date entered.');
      setResult(null);
      return;
    }

    if (birth > target) {
      setError('Date of birth cannot be in the future.');
      setResult(null);
      return;
    }

    // Accurate calendar-based age calculation
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      // Days remaining from last month
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total months lived
    const totalMonths = years * 12 + months;

    // Total days lived
    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / msPerDay);

    setError(null);
    setResult({ years, months, days, totalMonths, totalDays });
  };

  const handleReset = () => {
    setDob('');
    setAsOf(getTodayString());
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                max={asOf || getTodayString()}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="asOf" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Calculate Age On Date
              </Label>
              <Input
                id="asOf"
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <div className="flex gap-3">
            <Button onClick={calculate} className="flex-1 sm:flex-none">
              Calculate Age
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="py-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Age</p>
                <p className="text-3xl font-bold text-primary">
                  {result.years} years, {result.months} months, {result.days} days
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Months Lived</p>
                <p className="text-xl font-bold">{result.totalMonths.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Days Lived</p>
                <p className="text-xl font-bold">{result.totalDays.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
