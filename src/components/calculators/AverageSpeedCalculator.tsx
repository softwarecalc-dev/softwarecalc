import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function AverageSpeedCalculator() {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);

    if (isNaN(d) || isNaN(t)) {
      setError('Please enter valid numbers for both fields.');
      setResult(null);
      return;
    }
    if (t <= 0) {
      setError('Time must be greater than zero.');
      setResult(null);
      return;
    }

    setError(null);
    setResult(d / t);
  };

  const handleReset = () => {
    setDistance('');
    setTime('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance">Distance</Label>
              <Input
                id="distance"
                type="number"
                placeholder="e.g. 150"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="number"
                placeholder="e.g. 2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <div className="flex gap-3">
            <Button onClick={calculate} className="flex-1 sm:flex-none">
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
          <CardContent className="py-6 text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">
              Average Speed
            </p>
            <p className="text-3xl font-bold text-primary">
              {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} distance units per time unit
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
