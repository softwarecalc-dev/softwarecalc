import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Calculator } from 'lucide-react';

export function RatioCalculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<{
    simplified1: number;
    simplified2: number;
    ratio: string;
  } | null>(null);

  const getGcd = (a: number, b: number): number => {
    return b === 0 ? a : getGcd(b, a % b);
  };

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);

    if (isNaN(a) || isNaN(b) || a < 0 || b < 0) {
      return;
    }

    if (a === 0 && b === 0) {
      setResult({
        simplified1: 0,
        simplified2: 0,
        ratio: '0 : 0',
      });
      return;
    }

    const common = getGcd(a, b);
    const s1 = a / common;
    const s2 = b / common;

    setResult({
      simplified1: s1,
      simplified2: s2,
      ratio: `${s1} : ${s2}`,
    });
  };

  const reset = () => {
    setNum1('');
    setNum2('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ratio Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="num1">First Number</Label>
              <Input
                id="num1"
                type="number"
                placeholder="e.g. 20"
                min="0"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="num2">Second Number</Label>
              <Input
                id="num2"
                type="number"
                placeholder="e.g. 30"
                min="0"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1">
              Calculate
            </Button>
            <Button variant="outline" onClick={reset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Simplified Ratio
              </p>
              <p className="text-3xl font-bold text-primary">{result.ratio}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                A : B Format
              </p>
              <p className="text-3xl font-bold">{result.simplified1} to {result.simplified2}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
