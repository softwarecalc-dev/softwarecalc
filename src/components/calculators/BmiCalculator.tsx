import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obesity (Class I)';
  if (bmi < 40) return 'Obesity (Class II)';
  return 'Extreme Obesity (Class III)';
}

const BMI_RANGES = [
  { label: 'Underweight', range: 'Below 18.5', color: 'text-blue-500' },
  { label: 'Normal weight', range: '18.5 – 24.9', color: 'text-emerald-500' },
  { label: 'Overweight', range: '25 – 29.9', color: 'text-yellow-600' },
  { label: 'Obesity (Class I)', range: '30 – 34.9', color: 'text-orange-500' },
  { label: 'Obesity (Class II)', range: '35 – 39.9', color: 'text-orange-600' },
  { label: 'Extreme Obesity (Class III)', range: '40 and above', color: 'text-red-600' },
];

export function BmiCalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  
  // Metric state
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');
  
  // Imperial state
  const [weightLb, setWeightLb] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');

  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    let bmiValue = 0;
    const errs: Record<string, string> = {};

    if (unitSystem === 'metric') {
      const w = parseFloat(weightKg);
      const h = parseFloat(heightCm);
      if (!weightKg || isNaN(w) || w <= 0) errs.weightKg = 'Required';
      if (!heightCm || isNaN(h) || h <= 0) errs.heightCm = 'Required';

      if (Object.keys(errs).length === 0) {
        const heightInMeters = h / 100;
        bmiValue = w / (heightInMeters * heightInMeters);
      }
    } else {
      const wLb = parseFloat(weightLb);
      const hFt = parseFloat(heightFt) || 0;
      const hIn = parseFloat(heightIn) || 0;

      if (!weightLb || isNaN(wLb) || wLb <= 0) errs.weightLb = 'Required';
      if ((!heightFt && !heightIn) || (hFt <= 0 && hIn <= 0)) errs.height = 'Required';

      if (Object.keys(errs).length === 0) {
        const weightInKg = wLb * 0.453592;
        const totalInches = (hFt * 12) + hIn;
        const heightInMeters = totalInches * 0.0254;
        bmiValue = weightInKg / (heightInMeters * heightInMeters);
      }
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult({ bmi: bmiValue, category: getBmiCategory(bmiValue) });
  };

  const handleReset = () => {
    setWeightKg('');
    setHeightCm('');
    setWeightLb('');
    setHeightFt('');
    setHeightIn('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            BMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={unitSystem} onValueChange={(val) => setUnitSystem(val as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="metric">Metric</TabsTrigger>
              <TabsTrigger value="imperial">Imperial</TabsTrigger>
            </TabsList>
            
            <TabsContent value="metric" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height-cm">Height (cm)</Label>
                  <Input
                    id="height-cm"
                    type="number"
                    placeholder="e.g. 175"
                    value={heightCm}
                    onChange={(e) => { setHeightCm(e.target.value); setErrors({}); }}
                    className={errors.heightCm ? "border-destructive" : ""}
                  />
                  {errors.heightCm && <p className="text-xs text-destructive">{errors.heightCm}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-kg">Weight (kg)</Label>
                  <Input
                    id="weight-kg"
                    type="number"
                    placeholder="e.g. 70"
                    value={weightKg}
                    onChange={(e) => { setWeightKg(e.target.value); setErrors({}); }}
                    className={errors.weightKg ? "border-destructive" : ""}
                  />
                  {errors.weightKg && <p className="text-xs text-destructive">{errors.weightKg}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="imperial" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Height</Label>
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                      <Input
                        type="number"
                        placeholder="ft"
                        value={heightFt}
                        onChange={(e) => { setHeightFt(e.target.value); setErrors({}); }}
                        className={errors.height ? "border-destructive" : ""}
                      />
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">Feet</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <Input
                        type="number"
                        placeholder="in"
                        value={heightIn}
                        onChange={(e) => { setHeightIn(e.target.value); setErrors({}); }}
                        className={errors.height ? "border-destructive" : ""}
                      />
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">Inches</span>
                    </div>
                  </div>
                  {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-lb">Weight (lb)</Label>
                  <Input
                    id="weight-lb"
                    type="number"
                    placeholder="e.g. 154"
                    value={weightLb}
                    onChange={(e) => { setWeightLb(e.target.value); setErrors({}); }}
                    className={errors.weightLb ? "border-destructive" : ""}
                  />
                  {errors.weightLb && <p className="text-xs text-destructive">{errors.weightLb}</p>}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleCalculate} className="px-8">Calculate</Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">BMI Value</p>
              <p className="text-3xl font-bold text-primary">{result.bmi.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                kg / m²
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">BMI Category</p>
              <p className="text-2xl font-bold">{result.category}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Based on WHO guidelines
              </p>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1 border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Healthy BMI Range</p>
              <p className="text-2xl font-bold text-emerald-600">18.5 – 24.9</p>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                Normal weight
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* BMI Reference Section - Always Visible */}
      <Card className="border-muted bg-muted/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            BMI Weight Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            <div className="grid grid-cols-2 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div>Category</div>
              <div className="text-right">BMI Range (kg/m²)</div>
            </div>
            {BMI_RANGES.map((item) => (
              <div key={item.label} className="grid grid-cols-2 py-3 text-sm items-center">
                <div className={`font-medium ${item.color}`}>{item.label}</div>
                <div className="text-right font-mono text-muted-foreground">{item.range}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
            Note: BMI is a general screening tool and does not measure body fat directly. 
            It may not be accurate for athletes, elderly individuals, or pregnant women. 
            Always consult with a healthcare professional for a personalized assessment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}