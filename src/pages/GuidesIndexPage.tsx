import { Link } from '@tanstack/react-router';
import { Home, BookOpen, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { GUIDE_SLUGS } from './ToolCategoryGuide';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const GUIDE_DESCRIPTIONS = {
  Finance: 'Loans, mortgages, investments, tax, profit, and income calculations explained.',
  Math: 'Fractions, percentages, roots, factors, and general arithmetic covered.',
  Conversions: 'Convert between metric and imperial units for length, weight, temperature, and volume.',
  Health: 'BMI and body measurement calculators with standard reference ranges.',
  'Date & Time': 'Calculate durations, ages, countdowns, and working hours precisely.',
  Probability: 'Understand odds, expected values, and likelihood for games and statistics.',
  'Random Generators': 'Generate unbiased random numbers for draws, games, and testing.',
  'Game Calculators': 'Optimal strategy and probability tools for blackjack, poker, and more.',
};

const GUIDE_LIST = Object.entries(GUIDE_SLUGS).map(([slug, category]) => ({
  slug,
  category,
  label: `${category} Calculator Guide`,
  description: GUIDE_DESCRIPTIONS[category as keyof typeof GUIDE_DESCRIPTIONS],
}));

export function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-10">

        {/* ── Breadcrumbs ── */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Guides</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* ── Header ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Calculator Guides
            </h1>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Practical guides to every calculator category on SoftwareCalc — covering real-world problems,
            recommended tools, and when to use them.
          </p>
        </div>

        {/* ── Guide list ── */}
        <div className="grid gap-4">
          {GUIDE_LIST.map(({ slug, label, description }) => (
            <Link key={slug} to={`/guides/${slug}` as '/'} className="block group">
              <Card className="transition-all hover:border-primary/50 hover:bg-muted/30">
                <div className="flex items-center p-5 gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
