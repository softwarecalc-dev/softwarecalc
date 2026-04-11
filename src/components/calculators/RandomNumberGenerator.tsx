import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Shuffle } from 'lucide-react';

export function RandomNumberGenerator() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ min?: string; max?: string }>({});

  const handleGenerate = () => {
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const errs: { min?: string; max?: string } = {};

    if (min.trim() === '' || isNaN(minVal)) errs.min = 'Enter a valid minimum number.';
    if (max.trim() === '' || isNaN(maxVal)) errs.max = 'Enter a valid maximum number.';
    if (!errs.min && !errs.max && minVal > maxVal) {
      errs.min = 'Min must be less than or equal to Max.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const randomNumber = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    setResult(randomNumber);
  };

  const handleReset = () => {
    setMin('1');
    setMax('100');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generator Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min">Minimum Value</Label>
              <Input
                id="min"
                type="number"
                placeholder="e.g. 1"
                value={min}
                onChange={(e) => { setMin(e.target.value); setErrors((prev) => ({ ...prev, min: undefined })); }}
              />
              {errors.min && <p className="text-xs text-destructive">{errors.min}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="max">Maximum Value</Label>
              <Input
                id="max"
                type="number"
                placeholder="e.g. 100"
                value={max}
                onChange={(e) => { setMax(e.target.value); setErrors((prev) => ({ ...prev, max: undefined })); }}
              />
              {errors.max && <p className="text-xs text-destructive">{errors.max}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleGenerate} className="gap-2">
              <Shuffle className="w-4 h-4" />
              Generate
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
          <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-2">Generated Number</p>
            <p className="text-6xl font-bold text-primary tracking-tighter">{result}</p>
            <p className="text-xs text-muted-foreground mt-4">
              Random integer between {min} and {max} (inclusive)
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
