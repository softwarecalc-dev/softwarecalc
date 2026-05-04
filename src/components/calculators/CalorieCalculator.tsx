import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Info } from 'lucide-react';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; multiplier: number }[] = [
  { value: 'sedentary',   label: 'Sedentary (little/no exercise)',           multiplier: 1.2   },
  { value: 'light',       label: 'Light (1–3 days/week)',                    multiplier: 1.375 },
  { value: 'moderate',    label: 'Moderate (3–5 days/week)',                 multiplier: 1.55  },
  { value: 'active',      label: 'Active (6–7 days/week)',                   multiplier: 1.725 },
  { value: 'very_active', label: 'Very Active (physical job + training)',    multiplier: 1.9   },
];

interface CalorieResult {
  bmr: number;
  tdee: number;
  weightLoss: number;
  weightGain: number;
}

function calculate(
  gender: Gender,
  age: number,
  weight: number,
  height: number,
  activity: ActivityLevel,
): CalorieResult {
  const genderOffset = gender === 'male' ? 5 : -161;
  const bmr = 10 * weight + 6.25 * height - 5 * age + genderOffset;
  const multiplier = ACTIVITY_OPTIONS.find((o) => o.value === activity)!.multiplier;
  const tdee = bmr * multiplier;
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    weightLoss: Math.round(tdee - 500),
    weightGain: Math.round(tdee + 300),
  };
}

export function CalorieCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!age   || isNaN(a) || a <= 0) errs.age    = 'Required';
    if (!weight || isNaN(w) || w <= 0) errs.weight = 'Required';
    if (!height || isNaN(h) || h <= 0) errs.height = 'Required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculate(gender, a, w, h, activity));
  };

  const handleReset = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setGender('male');
    setActivity('moderate');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calorie Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <div className="flex gap-2">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-md border text-sm font-medium transition-colors ${
                    gender === g
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {g === 'male' ? 'Male' : 'Female'}
                </button>
              ))}
            </div>
          </div>

          {/* Numeric inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cal-age">Age (years)</Label>
              <Input
                id="cal-age"
                type="number"
                placeholder="e.g. 30"
                value={age}
                onChange={(e) => { setAge(e.target.value); setErrors({}); }}
                className={errors.age ? 'border-destructive' : ''}
              />
              {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cal-weight">Weight (kg)</Label>
              <Input
                id="cal-weight"
                type="number"
                placeholder="e.g. 70"
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setErrors({}); }}
                className={errors.weight ? 'border-destructive' : ''}
              />
              {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cal-height">Height (cm)</Label>
              <Input
                id="cal-height"
                type="number"
                placeholder="e.g. 175"
                value={height}
                onChange={(e) => { setHeight(e.target.value); setErrors({}); }}
                className={errors.height ? 'border-destructive' : ''}
              />
              {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
            </div>
          </div>

          {/* Activity level */}
          <div className="space-y-2">
            <Label htmlFor="cal-activity">Activity Level</Label>
            <select
              id="cal-activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityLevel)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {ACTIVITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button onClick={handleCalculate} className="px-8">Calculate</Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                BMR
              </p>
              <p className="text-3xl font-bold text-primary">{result.bmr.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">calories / day at complete rest</p>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Maintenance Calories (TDEE)
              </p>
              <p className="text-3xl font-bold text-primary">{result.tdee.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">calories / day to maintain weight</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Weight Loss (−500 kcal)
              </p>
              <p className="text-3xl font-bold text-blue-600">{result.weightLoss.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">calories / day · ~0.5 kg/week deficit</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                Weight Gain (+300 kcal)
              </p>
              <p className="text-3xl font-bold text-emerald-600">{result.weightGain.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">calories / day · lean bulk surplus</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reference table — always visible */}
      <Card className="border-muted bg-muted/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            Activity Level Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            <div className="grid grid-cols-2 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div>Level</div>
              <div className="text-right">Multiplier</div>
            </div>
            {ACTIVITY_OPTIONS.map((opt) => (
              <div key={opt.value} className="grid grid-cols-2 py-3 text-sm items-center">
                <div className="font-medium">{opt.label}</div>
                <div className="text-right font-mono text-muted-foreground">×{opt.multiplier}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
            Results are estimates based on the Mifflin-St Jeor equation, the most widely validated
            BMR formula for most adults. Individual metabolism varies — consult a healthcare professional
            or registered dietitian for personalised guidance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
