import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TOOLS } from '@/lib/tools';

export function HomePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 pt-4">
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Free Online Calculators for Finance, Math & Everyday Use
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


        {/* Tools grid — auto-populated from TOOLS registry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <Card
              key={tool.id}
              className={`flex flex-col h-full transition-all hover:shadow-lg ${tool.available
                  ? 'hover:border-primary/50 cursor-pointer'
                  : 'opacity-75 shadow-none'
                }`}
            >
              <CardHeader className="flex-1">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tool.available ? 'bg-primary/10' : 'bg-muted'}`}>
                    <tool.icon
                      className={`w-6 h-6 ${tool.available ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                </div>
                <CardDescription className="mt-3 text-sm leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                {tool.available ? (
                  <Link to={tool.href as '/'} className="w-full">
                    <Button className="w-full gap-2 group">
                      Open Tool
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Button className="w-full" disabled variant="outline">
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

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

      </div>
    </div>
  );
}