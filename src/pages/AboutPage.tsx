import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            About SoftwareCalc
          </h1>
          <p className="text-muted-foreground text-lg">
            Simple, free, and accessible online calculators for everyday use.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Purpose</CardTitle>
          </CardHeader>

          <CardContent className="prose dark:prose-invert max-w-none space-y-4">
            <p>
              SoftwareCalc was created with a simple goal in mind: to provide easy-to-use online calculators and utility tools that are free and accessible for everyone.
            </p>

            <p>
              We believe that useful tools should be fast, clear, and simple to use. Whether you need help calculating percentages, discounts, VAT, averages, time differences, or converting between units, SoftwareCalc is designed to give you accurate results instantly without unnecessary complexity.
            </p>

            <p>
              Our growing library includes calculators across several categories such as finance, math, conversions, health, game strategy, and date &amp; time. These tools are useful for everyday tasks like budgeting, comparing prices, studying math concepts, tracking changes, and solving practical problems quickly.
            </p>

            <p>
              Each calculator is designed to be easy to understand, mobile-friendly, and based on standard formulas to ensure reliable results. The focus is on providing tools that are both practical and straightforward to use.
            </p>

            <p>
              We are continuously expanding SoftwareCalc with new calculators and improvements over time. The goal is to build a reliable and comprehensive collection of online tools that help users solve everyday calculations quickly and confidently.
            </p>

            <p>
              SoftwareCalc is an independent online tool platform created to provide free and practical calculators for everyday use.
            </p>

            <p>
              Thank you for using SoftwareCalc. We hope our tools make your tasks a little easier.
            </p>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}