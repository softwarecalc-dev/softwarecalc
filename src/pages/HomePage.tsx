import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TOOLS, CATEGORY_META } from '@/lib/tools';

export function HomePage() {
  
  const financeTools = TOOLS
  .filter(t => t.category === 'Finance')
  .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
  .slice(0, 6);

const incomeTools = TOOLS
  .filter(t => t.name.toLowerCase().includes('salary') || t.name.toLowerCase().includes('income') || t.name.toLowerCase().includes('commission') || t.name.toLowerCase().includes('hour'))
  .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
  .slice(0, 4);

const savingsTools = TOOLS
  .filter(t => ['Retirement Calculator', 'Savings Goal Calculator', 'Inflation Calculator'].includes(t.name))
  .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

const otherTools = TOOLS
  .filter(t =>
    !financeTools.includes(t) &&
    !incomeTools.includes(t) &&
    !savingsTools.includes(t)
  )
  .slice(0, 6);
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Free Online Calculators That Save You Time
            <br className="hidden md:block" />
                on Finance, Math & Everyday Tasks
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SoftwareCalc is a collection of free online calculators designed to help you solve everyday problems quickly and easily.
            Whether you need to calculate loan payments, savings growth, percentages, or taxes, our tools give you accurate results instantly.
            Try tools like the{" "}
            <Link to="/loan-payment-calculator" className="underline">
              Loan Payment Calculator
            </Link>,{" "}
            <Link to="/percentage-calculator" className="underline">
              Percentage Calculator
            </Link>, or browse our{" "}
            <Link to="/finance-calculators" className="underline">
              Finance Calculators
            </Link>.
          </p>
        </div>

        {/* Homepage content */}


{/* CATEGORY SECTION */}
<section className="space-y-6 pt-10">
  <h2 className="text-2xl font-semibold text-center">
    Browse Calculators by Category
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {Object.entries(CATEGORY_META)
      .filter(([key]) =>
        TOOLS.some(tool => tool.category === key && tool.available)
      )
      .map(([key, category]) => (
      <Link key={key} to={`/${category.slug}`}>
        <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
          <CardHeader>
            <CardTitle className="text-xl">{category.title}</CardTitle>
            <CardDescription className="mt-2">
              {category.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
          <Button className="w-full">
            Explore {category.title.replace('Online ', '')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          </CardContent>
        </Card>
      </Link>
    ))}

  </div>
</section>
      {/* FEATURED FINANCE TOOLS */}
<section className="space-y-4 pt-12">
<h2 className="text-2xl font-semibold text-center">
  Most Popular Finance Calculators Right Now
</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {TOOLS
      .filter(t =>
        [
          'mortgage-calculator',
          'loan-payment-calculator',
          'credit-card-payoff-calculator',
          'investment-calculator'
        ].includes(t.id)
      )
      .map(tool => (
        <Card key={tool.id} className="relative hover:shadow-lg transition-all">
          <CardHeader>
            {['mortgage-calculator','loan-payment-calculator','credit-card-payoff-calculator'].includes(tool.id) && (
  <span className="absolute top-3 right-3 text-xs bg-primary text-white px-2 py-1 rounded-md">
    Popular
  </span>
)}
            <CardTitle>{tool.name}</CardTitle>
             <CardDescription className="mt-2">
  {tool.description}
</CardDescription>
          </CardHeader>

          <CardContent>
            <Link to={tool.href as '/'} className="w-full">
              <Button className="w-full">
  Open Calculator <ArrowRight className="ml-2 h-4 w-4" />
</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
  </div>
</section>

        {/* 👇 PASTE HERE */}
        <section className="max-w-3xl mx-auto space-y-4 text-sm md:text-base pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Helpful Tools for Students, Professionals, and Everyday Users
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            SoftwareCalc is built for people who want quick answers without unnecessary complexity. Whether you are studying math,
            comparing prices, planning savings, converting measurements, or working out time and date differences, these calculators
            are designed to be simple, practical, and easy to use.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We continue expanding the site with new calculators across finance, math, conversions, health, and everyday utility topics.
            Each tool is designed to provide clear inputs, instant results, and useful supporting explanations so you can understand the
            calculation as well as the answer.
          </p>
        </section>
{/* CTA SECTION */}
<section className="text-center pt-12 space-y-3">
  <h3 className="text-xl font-semibold">
    Explore all tools in one place
  </h3>

  <Link to="/tools">
    <Button size="lg">
      Browse All Calculators <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </Link>
</section>

      </div>
    </div>
  );
}
