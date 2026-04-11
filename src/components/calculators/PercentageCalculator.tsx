import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function PercentageCalculator() {
  // Section 1: What is X% of Y?
  const [s1X, setS1X] = useState('');
  const [s1Y, setS1Y] = useState('');
  const [s1Result, setS1Result] = useState<number | null>(null);

  // Section 2: X is what percent of Y?
  const [s2X, setS2X] = useState('');
  const [s2Y, setS2Y] = useState('');
  const [s2Result, setS2Result] = useState<number | null>(null);

  // Section 3: Increase Y by X%
  const [s3X, setS3X] = useState('');
  const [s3Y, setS3Y] = useState('');
  const [s3Result, setS3Result] = useState<number | null>(null);

  // Section 4: Decrease Y by X%
  const [s4X, setS4X] = useState('');
  const [s4Y, setS4Y] = useState('');
  const [s4Result, setS4Result] = useState<number | null>(null);

  // Section 5: Percentage change from A to B
  const [s5A, setS5A] = useState('');
  const [s5B, setS5B] = useState('');
  const [s5Result, setS5Result] = useState<number | null>(null);

  const formatNumber = (num: number) => {
    return Number(num.toFixed(4)).toString();
  };

  const handleS1 = () => {
    const x = parseFloat(s1X);
    const y = parseFloat(s1Y);
    if (!isNaN(x) && !isNaN(y)) {
      setS1Result((x / 100) * y);
    } else {
      setS1Result(null);
    }
  };

  const handleS2 = () => {
    const x = parseFloat(s2X);
    const y = parseFloat(s2Y);
    if (!isNaN(x) && !isNaN(y) && y !== 0) {
      setS2Result((x / y) * 100);
    } else {
      setS2Result(null);
    }
  };

  const handleS3 = () => {
    const x = parseFloat(s3X);
    const y = parseFloat(s3Y);
    if (!isNaN(x) && !isNaN(y)) {
      setS3Result(y + (x / 100) * y);
    } else {
      setS3Result(null);
    }
  };

  const handleS4 = () => {
    const x = parseFloat(s4X);
    const y = parseFloat(s4Y);
    if (!isNaN(x) && !isNaN(y)) {
      setS4Result(y - (x / 100) * y);
    } else {
      setS4Result(null);
    }
  };

  const handleS5 = () => {
    const a = parseFloat(s5A);
    const b = parseFloat(s5B);
    if (!isNaN(a) && !isNaN(b) && a !== 0) {
      setS5Result(((b - a) / Math.abs(a)) * 100);
    } else {
      setS5Result(null);
    }
  };

  const resetAll = () => {
    setS1X(''); setS1Y(''); setS1Result(null);
    setS2X(''); setS2Y(''); setS2Result(null);
    setS3X(''); setS3Y(''); setS3Result(null);
    setS4X(''); setS4Y(''); setS4Result(null);
    setS5A(''); setS5B(''); setS5Result(null);
  };

  return (
    <div className="space-y-8">
      {/* Action Buttons */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={resetAll} className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          Reset All
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Section 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What is X% of Y?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 space-y-2 w-full">
                <Label>Percent (X)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 15"
                  value={s1X}
                  onChange={(e) => setS1X(e.target.value)}
                />
              </div>
              <span className="pb-2 hidden sm:block">% of</span>
              <div className="flex-1 space-y-2 w-full">
                <Label>Value (Y)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 200"
                  value={s1Y}
                  onChange={(e) => setS1Y(e.target.value)}
                />
              </div>
              <Button onClick={handleS1} className="w-full sm:w-auto">Calculate</Button>
            </div>
            {s1Result !== null && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-muted-foreground mb-1">Result:</p>
                <p className="text-2xl font-bold text-primary">
                  {s1X}% of {s1Y} is {formatNumber(s1Result)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Formula: ({s1X} / 100) × {s1Y} = {formatNumber(s1Result)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">X is what percent of Y?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 space-y-2 w-full">
                <Label>Value (X)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 30"
                  value={s2X}
                  onChange={(e) => setS2X(e.target.value)}
                />
              </div>
              <span className="pb-2 hidden sm:block">is what % of</span>
              <div className="flex-1 space-y-2 w-full">
                <Label>Total (Y)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 80"
                  value={s2Y}
                  onChange={(e) => setS2Y(e.target.value)}
                />
              </div>
              <Button onClick={handleS2} className="w-full sm:w-auto">Calculate</Button>
            </div>
            {s2Result !== null && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-muted-foreground mb-1">Result:</p>
                <p className="text-2xl font-bold text-primary">
                  {s2X} is {formatNumber(s2Result)}% of {s2Y}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Formula: ({s2X} / {s2Y}) × 100 = {formatNumber(s2Result)}%
                </p>
              </div>
            )}
            {s2Y === '0' && <p className="text-sm text-destructive font-medium">Denominator cannot be zero.</p>}
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Increase Y by X%</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 space-y-2 w-full">
                <Label>Initial Value (Y)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 200"
                  value={s3Y}
                  onChange={(e) => setS3Y(e.target.value)}
                />
              </div>
              <span className="pb-2 hidden sm:block">increase by</span>
              <div className="flex-1 space-y-2 w-full">
                <Label>Percent (X)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 15"
                  value={s3X}
                  onChange={(e) => setS3X(e.target.value)}
                />
              </div>
              <span className="pb-2 hidden sm:block">%</span>
              <Button onClick={handleS3} className="w-full sm:w-auto">Calculate</Button>
            </div>
            {s3Result !== null && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-muted-foreground mb-1">Result:</p>
                <p className="text-2xl font-bold text-primary">
                  {s3Y} increased by {s3X}% is {formatNumber(s3Result)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Formula: {s3Y} + ({s3X} / 100) × {s3Y} = {formatNumber(s3Result)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Decrease Y by X%</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 space-y-2 w-full">
                <Label>Initial Value (Y)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 200"
                  value={s4Y}
                  onChange={(e) => setS4Y(e.target.value)}
                />
              </div>
              <span className="pb-2 hidden sm:block">decrease by</span>
              <div className="flex-1 space-y-2 w-full">
                <Label>Percent (X)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 15"
                  value={s4X}
                  onChange={(e) => setS4X(e.target.value)}
                />
              </div>
              <span className="pb-2 hidden sm:block">%</span>
              <Button onClick={handleS4} className="w-full sm:w-auto">Calculate</Button>
            </div>
            {s4Result !== null && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-muted-foreground mb-1">Result:</p>
                <p className="text-2xl font-bold text-primary">
                  {s4Y} decreased by {s4X}% is {formatNumber(s4Result)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Formula: {s4Y} - ({s4X} / 100) × {s4Y} = {formatNumber(s4Result)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Percentage change from A to B</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 space-y-2 w-full">
                <Label>From (A)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={s5A}
                  onChange={(e) => setS5A(e.target.value)}
                />
              </div>
              <span className="pb-2 hidden sm:block">to</span>
              <div className="flex-1 space-y-2 w-full">
                <Label>To (B)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 70"
                  value={s5B}
                  onChange={(e) => setS5B(e.target.value)}
                />
              </div>
              <Button onClick={handleS5} className="w-full sm:w-auto">Calculate</Button>
            </div>
            {s5Result !== null && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-muted-foreground mb-1">Result:</p>
                <p className="text-2xl font-bold text-primary">
                  {s5Result > 0 ? 'Increase' : s5Result < 0 ? 'Decrease' : 'No Change'} of {Math.abs(s5Result).toFixed(2)}%
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Formula: (({s5B} - {s5A}) / |{s5A}|) × 100 = {formatNumber(s5Result)}%
                </p>
              </div>
            )}
            {s5A === '0' && <p className="text-sm text-destructive font-medium">Initial value (A) cannot be zero for percentage change.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
