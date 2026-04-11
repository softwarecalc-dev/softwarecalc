import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Calendar } from 'lucide-react';

export function DaysUntilDateCalculator() {
  const [targetDate, setTargetDate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDays = () => {
    if (!targetDate) {
      setError('Please select a target date.');
      setResult(null);
      return;
    }

    const target = new Date(targetDate);

    if (isNaN(target.getTime())) {
      setError('Invalid date selected.');
      setResult(null);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffMs = target.getTime() - today.getTime();
    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.round(diffMs / msPerDay);

    setError(null);
    setResult(totalDays);
  };

  const handleReset = () => {
    setTargetDate('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="targetDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              Target Date
            </Label>
            <Input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full"
            />
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <div className="flex gap-3">
            <Button onClick={calculateDays} className="flex-1 sm:flex-none">
              Calculate
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Days Remaining</p>
              <p className="text-3xl font-bold text-primary">
                {result === 0 ? 'Today!' : `${Math.abs(result)} days`}
              </p>
              {result < 0 && (
                <p className="text-xs text-destructive font-medium mt-2">Note: That date has already passed.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
