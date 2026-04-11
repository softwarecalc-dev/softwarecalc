import { Card, CardContent } from '@/components/ui/card';
import { Dices } from 'lucide-react';

export function RandomCalculator() {
  return (
    <Card>
      <CardContent className="py-14 flex flex-col items-center gap-4 text-center">
        <div className="p-4 rounded-full bg-muted">
          <Dices className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2
          className="text-xl font-semibold"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Coming Soon
        </h2>
        <p className="text-muted-foreground max-w-sm">
          This tool is currently in development. Check back soon for random
          number generators, dice rollers, and probability simulators.
        </p>
      </CardContent>
    </Card>
  );
}
