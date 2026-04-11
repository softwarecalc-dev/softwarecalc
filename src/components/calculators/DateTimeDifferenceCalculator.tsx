import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Calendar, Clock } from 'lucide-react';

export function DateTimeDifferenceCalculator() {
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [result, setResult] = useState<{
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    breakdown: { years: number; days: number; hours: number; minutes: number };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDifference = () => {
    if (!startDateTime || !endDateTime) {
      setError('Please select both start and end date/time.');
      setResult(null);
      return;
    }

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError('Invalid date or time selected.');
      setResult(null);
      return;
    }

    const diffMs = end.getTime() - start.getTime();
    
    // Support negative differences but usually users want positive
    const absDiffMs = Math.abs(diffMs);
    
    const msPerMinute = 1000 * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const totalMinutes = diffMs / msPerMinute;
    const totalHours = diffMs / msPerHour;
    const totalDays = diffMs / msPerDay;

    // Breakdown
    const absTotalDays = Math.abs(totalDays);
    const years = Math.floor(absTotalDays / 365);
    const days = Math.floor(absTotalDays % 365);
    const hours = Math.floor((absDiffMs % msPerDay) / msPerHour);
    const minutes = Math.floor((absDiffMs % msPerHour) / msPerMinute);

    setError(null);
    setResult({
      totalDays,
      totalHours,
      totalMinutes,
      breakdown: { years, days, hours, minutes }
    });
  };

  const handleReset = () => {
    setStartDateTime('');
    setEndDateTime('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDateTime" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Start Date & Time
              </Label>
              <Input
                id="startDateTime"
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDateTime" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                End Date & Time
              </Label>
              <Input
                id="endDateTime"
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <div className="flex gap-3">
            <Button onClick={calculateDifference} className="flex-1 sm:flex-none">
              Calculate Difference
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
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Detailed Breakdown</p>
                <p className="text-3xl font-bold text-primary">
                  {result.breakdown.years > 0 && `${result.breakdown.years} years, `}
                  {result.breakdown.days} days, {result.breakdown.hours} hours, {result.breakdown.minutes} minutes
                </p>
                {result.totalMinutes < 0 && (
                  <p className="text-xs text-destructive font-medium mt-2">Note: End date is before start date.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Days</p>
                <p className="text-xl font-bold">{result.totalDays.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Hours</p>
                <p className="text-xl font-bold">{result.totalHours.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Minutes</p>
                <p className="text-xl font-bold">{Math.floor(result.totalMinutes).toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}