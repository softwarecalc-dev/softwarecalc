import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return parseFloat(n.toFixed(2)).toString();
}

export function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState<{ discountAmount: number; finalPrice: number } | null>(null);
  const [errors, setErrors] = useState<{ price?: string; discount?: string }>({});

  const handleCalculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    const errs: { price?: string; discount?: string } = {};

    if (price.trim() === '' || isNaN(p) || p < 0) errs.price = 'Enter a valid price (0 or more).';
    if (discount.trim() === '' || isNaN(d) || d < 0) errs.discount = 'Enter a valid discount (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const discountAmount = p * (d / 100);
    setResult({ discountAmount, finalPrice: p - discountAmount });
  };

  const handleReset = () => {
    setPrice('');
    setDiscount('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Discount Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Original Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 100"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => { setPrice(e.target.value); setErrors((p) => ({ ...p, price: undefined })); }}
              />
              {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                placeholder="e.g. 20"
                min="0"
                step="0.01"
                value={discount}
                onChange={(e) => { setDiscount(e.target.value); setErrors((p) => ({ ...p, discount: undefined })); }}
              />
              {errors.discount && <p className="text-xs text-destructive">{errors.discount}</p>}
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

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Final Price</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(result.finalPrice)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ${price} − ${formatNumber(result.discountAmount)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">You Save</p>
              <p className="text-2xl font-bold">${formatNumber(result.discountAmount)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {discount}% of ${price}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
