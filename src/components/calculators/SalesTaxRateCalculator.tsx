import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(4).replace(/\.?0+$/, '');
}

export function SalesTaxRateCalculator() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ originalPrice?: string; taxAmount?: string }>({});

  const handleCalculate = () => {
    const p = parseFloat(originalPrice);
    const t = parseFloat(taxAmount);
    const errs: { originalPrice?: string; taxAmount?: string } = {};

    if (originalPrice.trim() === '' || isNaN(p) || p < 0) errs.originalPrice = 'Enter a valid price (0 or more).';
    else if (p === 0) errs.originalPrice = 'Original price cannot be zero.';
    if (taxAmount.trim() === '' || isNaN(t) || t < 0) errs.taxAmount = 'Enter a valid tax amount (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult((t / p) * 100);
  };

  const handleReset = () => {
    setOriginalPrice('');
    setTaxAmount('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sales Tax Rate Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price Before Tax</Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="e.g. 100"
                min="0"
                step="0.01"
                value={originalPrice}
                onChange={(e) => { setOriginalPrice(e.target.value); setErrors((prev) => ({ ...prev, originalPrice: undefined })); }}
              />
              {errors.originalPrice && <p className="text-xs text-destructive">{errors.originalPrice}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxAmount">Sales Tax Amount</Label>
              <Input
                id="taxAmount"
                type="number"
                placeholder="e.g. 7.50"
                min="0"
                step="0.01"
                value={taxAmount}
                onChange={(e) => { setTaxAmount(e.target.value); setErrors((prev) => ({ ...prev, taxAmount: undefined })); }}
              />
              {errors.taxAmount && <p className="text-xs text-destructive">{errors.taxAmount}</p>}
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

      {result !== null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Sales Tax Rate</p>
              <p className="text-2xl font-bold text-primary">{formatNumber(result)}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                (${taxAmount} ÷ ${originalPrice}) × 100
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original Price</span>
                <span className="font-medium">${originalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax Amount</span>
                <span className="font-medium">${taxAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sales Tax Rate</span>
                <span className="font-medium">{formatNumber(result)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Price</span>
                <span className="font-medium">${(parseFloat(originalPrice) + parseFloat(taxAmount)).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
