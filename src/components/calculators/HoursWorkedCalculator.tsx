import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Clock, DollarSign } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function HoursWorkedCalculator() {
  // Section 1: Work Shift
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hourlyRate1, setHourlyRate1] = useState('');
  const [shiftResult, setShiftResult] = useState<{ hours: number; earnings: number } | null>(null);
  const [shiftErrors, setShiftErrors] = useState<{ startTime?: string; endTime?: string; hourlyRate?: string }>({});

  // Section 2: Total Hours
  const [totalHours, setTotalHours] = useState('');
  const [hourlyRate2, setHourlyRate2] = useState('');
  const [totalResult, setTotalResult] = useState<{ earnings: number } | null>(null);
  const [totalErrors, setTotalErrors] = useState<{ totalHours?: string; hourlyRate?: string }>({});

  const handleCalculateShift = () => {
    const errs: typeof shiftErrors = {};
    if (!startTime) errs.startTime = 'Required';
    if (!endTime) errs.endTime = 'Required';
    
    const rate = parseFloat(hourlyRate1);
    if (hourlyRate1 && (isNaN(rate) || rate < 0)) errs.hourlyRate = 'Invalid rate';

    if (Object.keys(errs).length > 0) {
      setShiftErrors(errs);
      setShiftResult(null);
      return;
    }

    setShiftErrors({});
    
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    let startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;
    
    // Handle overnight shifts
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }
    
    const diffMinutes = endMinutes - startMinutes;
    const hours = diffMinutes / 60;
    const earnings = rate ? hours * rate : 0;
    
    setShiftResult({ hours, earnings });
  };

  const handleCalculateTotal = () => {
    const errs: typeof totalErrors = {};
    const h = parseFloat(totalHours);
    const r = parseFloat(hourlyRate2);
    
    if (totalHours.trim() === '' || isNaN(h) || h < 0) errs.totalHours = 'Invalid hours';
    if (hourlyRate2.trim() === '' || isNaN(r) || r < 0) errs.hourlyRate = 'Invalid rate';

    if (Object.keys(errs).length > 0) {
      setTotalErrors(errs);
      setTotalResult(null);
      return;
    }

    setTotalErrors({});
    setTotalResult({ earnings: h * r });
  };

  const handleResetShift = () => {
    setStartTime('');
    setEndTime('');
    setHourlyRate1('');
    setShiftResult(null);
    setShiftErrors({});
  };

  const handleResetTotal = () => {
    setTotalHours('');
    setHourlyRate2('');
    setTotalResult(null);
    setTotalErrors({});
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: Work Shift Calculator */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Work Shift Calculator
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  placeholder="09:00"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  onClick={(e) => { try { (e.target as HTMLInputElement).showPicker?.(); } catch {} }}
                  onFocus={(e) => { try { (e.target as HTMLInputElement).showPicker?.(); } catch {} }}
                />
                {shiftErrors.startTime && <p className="text-xs text-destructive">{shiftErrors.startTime}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  placeholder="17:00"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  onClick={(e) => { try { (e.target as HTMLInputElement).showPicker?.(); } catch {} }}
                  onFocus={(e) => { try { (e.target as HTMLInputElement).showPicker?.(); } catch {} }}
                />
                {shiftErrors.endTime && <p className="text-xs text-destructive">{shiftErrors.endTime}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate1">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate1"
                  type="number"
                  placeholder="e.g. 25"
                  value={hourlyRate1}
                  onChange={(e) => setHourlyRate1(e.target.value)}
                />
                {shiftErrors.hourlyRate && <p className="text-xs text-destructive">{shiftErrors.hourlyRate}</p>}
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCalculateShift}>Calculate Shift</Button>
              <Button variant="outline" onClick={handleResetShift} className="gap-2">
                <RefreshCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {shiftResult && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-primary/30 bg-primary/5 text-center">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Hours Worked</p>
                <p className="text-2xl font-bold text-primary">{formatNumber(shiftResult.hours)} hrs</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Shift Earnings</p>
                <p className="text-2xl font-bold">${formatNumber(shiftResult.earnings)}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <hr className="border-muted" />

      {/* SECTION 2: Total Hours Calculator */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Total Hours Calculator
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalHours">Total Hours Worked</Label>
                <Input
                  id="totalHours"
                  type="number"
                  placeholder="e.g. 40"
                  value={totalHours}
                  onChange={(e) => setTotalHours(e.target.value)}
                />
                {totalErrors.totalHours && <p className="text-xs text-destructive">{totalErrors.totalHours}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate2">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate2"
                  type="number"
                  placeholder="e.g. 25"
                  value={hourlyRate2}
                  onChange={(e) => setHourlyRate2(e.target.value)}
                />
                {totalErrors.hourlyRate && <p className="text-xs text-destructive">{totalErrors.hourlyRate}</p>}
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCalculateTotal}>Calculate Total</Button>
              <Button variant="outline" onClick={handleResetTotal} className="gap-2">
                <RefreshCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {totalResult && (
          <Card className="border-primary/30 bg-primary/5 text-center max-w-sm mx-auto">
            <CardContent className="py-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Earnings</p>
              <p className="text-3xl font-bold text-primary">${formatNumber(totalResult.earnings)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {totalHours} hrs × ${hourlyRate2}/hr
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
