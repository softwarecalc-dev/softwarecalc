import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return parseFloat(n.toFixed(2)).toString();
}

export function SquareFootageCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [area, setArea] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ length?: string; width?: string }>({});

  const handleCalculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const errs: { length?: string; width?: string } = {};

    if (length.trim() === '' || isNaN(l) || l < 0) errs.length = 'Enter a valid length (0 or more).';
    if (width.trim() === '' || isNaN(w) || w < 0) errs.width = 'Enter a valid width (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setArea(null);
      return;
    }

    setErrors({});
    setArea(l * w);
  };

  const handleReset = () => {
    setLength('');
    setWidth('');
    setArea(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dimensions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                placeholder="e.g. 10"
                min="0"
                step="0.01"
                value={length}
                onChange={(e) => { setLength(e.target.value); setErrors((p) => ({ ...p, length: undefined })); }}
              />
              {errors.length && <p className="text-xs text-destructive">{errors.length}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                placeholder="e.g. 10"
                min="0"
                step="0.01"
                value={width}
                onChange={(e) => { setWidth(e.target.value); setErrors((p) => ({ ...p, width: undefined })); }}
              />
              {errors.width && <p className="text-xs text-destructive">{errors.width}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate}>Calculate</Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {area !== null && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Area</p>
            <p className="text-2xl font-bold text-primary">{formatNumber(area)} sq ft</p>
            <p className="text-xs text-muted-foreground mt-2">
              {length} × {width}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
