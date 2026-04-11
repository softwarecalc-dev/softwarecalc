import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function UnitPriceCalculator() {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const q = parseFloat(quantity);

    if (isNaN(p) || isNaN(q)) {
      setError('Please enter valid numbers for both fields.');
      setResult(null);
      return;
    }
    if (q <= 0) {
      setError('Quantity must be greater than zero.');
      setResult(null);
      return;
    }

    setError(null);
    setResult(p / q);
  };

  const handleReset = () => {
    setPrice('');
    setQuantity('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 5"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g. 200"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <div className="flex gap-3">
            <Button onClick={calculate} className="flex-1 sm:flex-none">
              Calculate
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
          <CardContent className="py-6 text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">
              Price per Unit
            </p>
            <p className="text-3xl font-bold text-primary">
              {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} per unit
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
