import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, ArrowRight } from 'lucide-react';

const UNITS = [
  { value: 'mm',  label: 'Millimeters (mm)',  toMeter: 0.001 },
  { value: 'cm',  label: 'Centimeters (cm)',  toMeter: 0.01 },
  { value: 'm',   label: 'Meters (m)',         toMeter: 1 },
  { value: 'km',  label: 'Kilometers (km)',    toMeter: 1000 },
  { value: 'in',  label: 'Inches (in)',        toMeter: 0.0254 },
  { value: 'ft',  label: 'Feet (ft)',          toMeter: 0.3048 },
  { value: 'yd',  label: 'Yards (yd)',         toMeter: 0.9144 },
  { value: 'mi',  label: 'Miles (mi)',         toMeter: 1609.344 },
] as const;

type UnitValue = typeof UNITS[number]['value'];

function convert(value: number, from: UnitValue, to: UnitValue): number {
  const fromFactor = UNITS.find((u) => u.value === from)!.toMeter;
  const toFactor   = UNITS.find((u) => u.value === to)!.toMeter;
  return (value * fromFactor) / toFactor;
}

function formatResult(n: number): string {
  if (!isFinite(n)) return '—';
  // Use up to 8 significant digits, trim trailing zeros
  return parseFloat(n.toPrecision(8)).toString();
}

export function LengthConverter() {
  const [input, setInput]   = useState('');
  const [from,  setFrom]    = useState<UnitValue>('m');
  const [to,    setTo]      = useState<UnitValue>('ft');

  const numericValue = parseFloat(input);
  const isValid      = input.trim() !== '' && !isNaN(numericValue);
  const result       = isValid ? convert(numericValue, from, to) : null;

  const handleReset = () => {
    setInput('');
    setFrom('m');
    setTo('ft');
  };

  const fromLabel = UNITS.find((u) => u.value === from)!.label;
  const toLabel   = UNITS.find((u) => u.value === to)!.label;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Convert Length</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Value input */}
          <div className="space-y-2">
            <Label htmlFor="length-value">Value</Label>
            <Input
              id="length-value"
              type="number"
              placeholder="e.g. 10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* From / To dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-unit">From</Label>
              <select
                id="from-unit"
                value={from}
                onChange={(e) => setFrom(e.target.value as UnitValue)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-unit">To</Label>
              <select
                id="to-unit"
                value={to}
                onChange={(e) => setTo(e.target.value as UnitValue)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset */}
          <div>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result — shown instantly when input is valid */}
      {result !== null && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">Result</p>
            <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
              <span>{input} <span className="text-muted-foreground font-normal text-sm">{from}</span></span>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-2xl font-bold text-primary">{formatResult(result)}</span>
              <span className="text-muted-foreground font-normal text-sm">{to}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {fromLabel} → {toLabel}
            </p>
          </CardContent>
        </Card>
      )}

      {input.trim() !== '' && !isValid && (
        <p className="text-sm text-destructive font-medium">Please enter a valid number.</p>
      )}
    </div>
  );
}
