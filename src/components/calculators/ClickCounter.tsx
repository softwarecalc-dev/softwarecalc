import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

export function ClickCounter() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [aps, setAps] = useState(0);
  const [apm, setApm] = useState(0);
  const timestamps = useRef<number[]>([]);
  const decayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recalculate = (ts: number[]) => {
    const now = Date.now();
    const apsCount = ts.filter((t) => now - t <= 1000).length;
    const apmCount = ts.filter((t) => now - t <= 60000).length;
    setAps(apsCount);
    setApm(apmCount);
  };

  const handleClick = () => {
    const now = Date.now();
    timestamps.current = [...timestamps.current.filter((t) => now - t <= 60000), now];
    setTotalClicks((c) => c + 1);
    recalculate(timestamps.current);

    if (decayTimer.current) clearTimeout(decayTimer.current);
    decayTimer.current = setTimeout(() => {
      recalculate(timestamps.current);
    }, 1100);
  };

  const handleReset = () => {
    if (decayTimer.current) clearTimeout(decayTimer.current);
    timestamps.current = [];
    setTotalClicks(0);
    setAps(0);
    setApm(0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <button
            onClick={handleClick}
            className="w-full py-10 rounded-xl text-2xl font-bold bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-transform select-none"
          >
            Click!
          </button>

          <div className="flex justify-end">
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-5 text-center">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Clicks</p>
            <p className="text-3xl font-bold text-primary">{totalClicks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-5 text-center">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">APS (last 1 second)</p>
            <p className="text-3xl font-bold">{aps}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-5 text-center">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">APM (last 60 seconds)</p>
            <p className="text-3xl font-bold">{apm}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
