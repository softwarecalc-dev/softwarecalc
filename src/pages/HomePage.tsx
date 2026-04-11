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
            SoftwareCalc Tools
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SoftwareCalc provides free online calculators for finance, math,
            conversions, probability, health, and everyday calculations.
            Use our tools to quickly solve common problems like percentage
            calculations, compound interest, BMI, and more.
          </p>
        </div>

        {/* Homepage content */}
        <section className="max-w-3xl mx-auto space-y-6 text-sm md:text-base">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">Free Online Calculators for Everyday Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              SoftwareCalc is a collection of simple, fast, and reliable online calculators designed to help you solve
              everyday problems. Whether you need to calculate percentages, work out loan payments, convert units, or
              handle basic math operations, our tools are built to give you instant and accurate results.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              All calculators are easy to use, mobile-friendly, and require no downloads or sign-ups. Just enter your
              values and get your answer immediately.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">Browse Calculators by Category</h2>
            <div className="space-y-2 text-muted-foreground leading-relaxed">
              <p>
                <Link to="/math-calculators" className="text-primary underline font-medium">
                  Math Calculators
                </Link>{' '}
                – percentages, ratios, averages, exponents, roots, and more.
              </p>
              <p>
                <Link to="/finance-calculators" className="text-primary underline font-medium">
                  Finance Calculators
                </Link>{' '}
                – loans, interest, ROI, savings, and budgeting tools.
              </p>
              <p>
                <Link to="/conversion-calculators" className="text-primary underline font-medium">
                  Conversion Tools
                </Link>{' '}
                – length, weight, temperature, and recipe measurements.
              </p>
              <p>
                <Link to="/date-time-calculators" className="text-primary underline font-medium">
                  Date &amp; Time Calculators
                </Link>{' '}
                – age, time differences, working hours, and countdowns.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">Why Use These Calculators?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Manual calculations can be time-consuming and prone to errors. SoftwareCalc simplifies the process by
              providing instant results based on proven formulas. These tools are useful for students, professionals,
              and everyday users who need quick and reliable answers.
            </p>
          </div>
        </section>

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