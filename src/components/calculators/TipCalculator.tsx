import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState('');
  const [people, setPeople] = useState('');
  const [result, setResult] = useState<{
    tipAmount: number;
    totalBill: number;
    perPerson: number;
  } | null>(null);

  const calculate = () => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercent);
    const p = Math.max(1, parseInt(people) || 1);

    if (isNaN(b) || b < 0 || isNaN(t) || t < 0) {
      return;
    }

    const tipAmount = b * (t / 100);
    const totalBill = b + tipAmount;
    const perPerson = totalBill / p;

    setResult({
      tipAmount,
      totalBill,
      perPerson,
    });
  };

  const reset = () => {
    setBill('');
    setTipPercent('');
    setPeople('');
    setResult(null);
  };

  const format = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bill">Bill Amount ($)</Label>
              <Input
                id="bill"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tip">Tip (%)</Label>
              <Input
                id="tip"
                type="number"
                placeholder="15"
                min="0"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="people">Number of People</Label>
              <Input
                id="people"
                type="number"
                placeholder="1"
                min="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={calculate} className="flex-1">Calculate</Button>
            <Button variant="outline" onClick={reset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Tip Amount</p>
              <p className="text-2xl font-bold text-primary">{format(result.tipAmount)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Bill</p>
              <p className="text-2xl font-bold">{format(result.totalBill)}</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Per Person</p>
              <p className="text-2xl font-bold text-primary">{format(result.perPerson)}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
