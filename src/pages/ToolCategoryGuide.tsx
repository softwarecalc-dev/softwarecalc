import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Home, BookOpen, ArrowRight } from 'lucide-react';
import { TOOLS, ToolConfig } from '@/lib/tools';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// ─── Per-category guide content ───────────────────────────────────────────────

interface GuideContent {
  title: string;
  intro: string;
  problems: string[];
  whenToUse: string[];
}

const GUIDE_CONTENT: Record<ToolConfig['category'], GuideContent> = {
  Finance: {
  title: 'Can I Afford a House? A Real-World Finance Journey',

  intro:
    'Buying a house is not a single calculation — it is a sequence of financial decisions. You start with your real income, then define affordability, then test loans, and finally compare long-term cost vs alternatives like renting or investing. This guide walks you through that exact journey step by step.',

  storySections: [
    {
      title: '1. Start with your real income (not your salary)',
      text:
        'Most people overestimate what they can afford because they look at gross salary. What actually matters is your net income after tax — the money you truly have available each month.',
      toolHint: 'Salary After Tax Calculator',
    },
    {
      title: '2. Define a safe monthly housing budget',
      text:
        'A stable rule is to keep housing costs between 25–35% of your monthly net income. This protects you from financial stress and unexpected expenses.',
      toolHint: 'Budget / Affordability Calculator',
    },
    {
      title: '3. Understand your loan reality',
      text:
        'Even a small change in interest rate dramatically affects your total cost over time. Two similar houses can have very different long-term affordability.',
      toolHint: 'Loan / Mortgage Calculator',
    },
    {
      title: '4. Look at total cost over time',
      text:
        'The real cost of a house is not the price — it is the total interest paid over 20–30 years. This often surprises first-time buyers.',
      toolHint: 'Loan Interest / ROI Calculator',
    },
    {
      title: '5. Compare renting vs buying',
      text:
        'Buying builds equity, but renting gives flexibility. The better choice depends on long-term financial growth vs lifestyle freedom.',
      toolHint: 'ROI Calculator',
    },
  ],
},
  Math: {
    title: 'Math Calculator Guide',
    intro:
      'Math calculators cover everyday arithmetic, number theory, fractions, percentages, roots, and more. Whether you are a student checking homework, a professional needing a quick calculation, or simply curious about a number, these tools provide fast and accurate results with step-aware explanations.',
    problems: [
      'How do I convert a decimal to a fraction or percentage?',
      'What is the greatest common factor of two numbers?',
      'How do I simplify a fraction to its lowest terms?',
      'What is the square root or cube root of a number?',
      'How do I calculate percentage increase or decrease?',
      'Is this number prime? What are its factors?',
      'How do I write a number in scientific notation?',
    ],
    whenToUse: [
      'Checking homework or exam answers — use fraction, percentage, or root calculators to verify your working.',
      'Cooking and scaling recipes — ratio and proportion calculators keep ingredient amounts accurate.',
      'Data analysis — average, percentage change, and rounding calculators summarise numbers quickly.',
      'Programming and engineering — sig fig, scientific notation, and exponent calculators handle precision formatting.',
      'Number theory problems — GCF, LCM, prime factorization, and divisibility calculators solve common proofs and puzzles.',
    ],
  },
  Conversions: {
    title: 'Unit Conversion Guide',
    intro:
      'Unit conversion calculators translate measurements between different systems instantly. The metric and imperial systems are used side by side across cooking, construction, science, and travel, so being able to convert quickly prevents costly mistakes and saves lookup time.',
    problems: [
      'A recipe uses cups but I only have a measuring jug in millilitres.',
      'A product is listed in pounds but I need the weight in kilograms.',
      'A blueprint uses feet and inches but I work in metres.',
      'The weather forecast shows Fahrenheit but I think in Celsius.',
      'I need to compare prices for products sold in different unit sizes.',
    ],
    whenToUse: [
      'Cooking and baking — convert between cups, tablespoons, millilitres, and litres when following international recipes.',
      'Fitness and health — convert body weight between kg and lbs, or height between cm and feet/inches.',
      'Travel and shipping — convert distances, weights, and temperatures when working across countries.',
      'Construction and DIY — convert room dimensions between metric and imperial before ordering materials.',
      'Science and education — convert between SI units and common equivalents for labs and assignments.',
    ],
  },
  Health: {
    title: 'Health Calculator Guide',
    intro:
      'Health calculators help you interpret common health metrics using established clinical formulas. They are useful for understanding your current health data in context — not for diagnosing conditions, but for knowing where a measurement sits relative to standard reference ranges.',
    problems: [
      'Is my current weight healthy for my height?',
      'What BMI category do I fall into based on WHO guidelines?',
      'How do I interpret a BMI result — what does the number mean?',
      'What is a healthy weight range for my height?',
    ],
    whenToUse: [
      'Before a doctor appointment — check your BMI and weight range so you can discuss them more confidently.',
      'When tracking a fitness goal — monitor changes in health metrics over time to measure progress.',
      'For general health awareness — use reference ranges as a starting point for understanding your body metrics.',
      'When researching health topics — health calculators provide accurate formula-based results consistent with clinical definitions.',
      'Always consult a qualified healthcare professional before making health decisions based on any calculator result.',
    ],
  },
  'Date & Time': {
    title: 'Date & Time Calculator Guide',
    intro:
      'Date and time calculators measure durations, count down to events, calculate ages, and track working hours. They handle the complexity of calendar arithmetic — varying month lengths, leap years, and overnight time spans — so you get precise results without manual counting.',
    problems: [
      'How many days are left until a deadline, holiday, or event?',
      'How long did a project or contract run between two dates?',
      'How many hours did I work across a shift, including overnight?',
      'How old is someone in years, months, and days?',
      'What is the exact time between two timestamps?',
    ],
    whenToUse: [
      'Project management — calculate exact durations between start and end dates to plan timelines accurately.',
      'Payroll and timekeeping — calculate hours worked per shift, including breaks and overnight periods.',
      'Event planning — count down days to birthdays, anniversaries, holidays, or product launches.',
      'Legal and financial — calculate precise periods for contracts, payment terms, or age verification.',
      'Travel planning — determine how many days a trip spans and calculate time differences between time zones.',
    ],
  },
  Probability: {
    title: 'Probability Calculator Guide',
    intro:
      'Probability calculators compute the theoretical likelihood of outcomes based on standard mathematical formulas. They are useful for understanding games, statistics, risk, and decision-making — any situation where you need to quantify how likely something is to happen.',
    problems: [
      'What are the odds of drawing a specific card from a deck?',
      'How likely is a particular outcome in a dice game?',
      'What probability does a given hand represent in a card game?',
      'How do I calculate expected value for a repeated event?',
    ],
    whenToUse: [
      'Board games and card games — calculate the probability of drawing a needed card or rolling a specific outcome.',
      'Statistics and data science — use probability formulas to model distributions and interpret results.',
      'Risk analysis — quantify the likelihood of events to inform decisions under uncertainty.',
      'Education and homework — work through probability problems with a calculator to check theoretical answers.',
      'Remember that calculated probabilities reflect long-run frequency — short-term results always vary.',
    ],
  },
  'Random Generators': {
    title: 'Random Generator Guide',
    intro:
      'Random generators produce unpredictable results within a range you set. They are useful any time you need a neutral, unbiased outcome — from running a fair prize draw to generating test data or making a quick decision between options.',
    problems: [
      'I need to pick a winner fairly from a list of entries.',
      'I want a random number for a game or activity without bias.',
      'I need sample data values for testing a spreadsheet or application.',
      'I cannot decide between two options and want to let chance decide.',
      'I want to simulate dice rolls or random card draws for a game.',
    ],
    whenToUse: [
      'Prize draws and giveaways — generate a random number to pick a winner without favouritism.',
      'Classroom activities — randomly assign students to groups or select who answers a question.',
      'Games and entertainment — roll virtual dice, draw random numbers, or simulate random events.',
      'Development and testing — generate random values for testing forms, databases, and calculations.',
      'Decision making — use a random generator to break a tie when two options are equally good.',
    ],
  },
  'Game Calculators': {
    title: 'Game Calculator Guide',
    intro:
      'Game calculators apply mathematical strategy and probability analysis to card games and casino games. They help you understand the statistically optimal play for any given situation, so you can make informed decisions rather than relying on guesswork or superstition.',
    problems: [
      'Should I hit, stand, double, split, or surrender in blackjack?',
      'What are the odds of winning a specific poker hand?',
      'What is the house edge for a particular game configuration?',
      'What is the expected value of a given play in a card game?',
    ],
    whenToUse: [
      'Learning card game strategy — use strategy calculators to understand the optimal decision for every situation.',
      'Practising before a real game — work through hand scenarios to build pattern recognition.',
      'Analysing past decisions — review hands to see whether you made the statistically correct play.',
      'Understanding odds — use probability-based tools to see win, lose, and push percentages for different hands.',
      'Note that strategy calculators show the mathematically optimal long-run decision — short-term variance means any single hand can go either way.',
    ],
  },
};

// ─── Slug ↔ category map ──────────────────────────────────────────────────────

export const GUIDE_SLUGS: Record<string, ToolConfig['category']> = {
  finance: 'Finance',
  math: 'Math',
  conversions: 'Conversions',
  health: 'Health',
  'date-time': 'Date & Time',
  probability: 'Probability',
  'random-generators': 'Random Generators',
  'game-calculators': 'Game Calculators',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface ToolCategoryGuideProps {
  slug: string;
}

export function ToolCategoryGuide({ slug }: ToolCategoryGuideProps) {
  const category = GUIDE_SLUGS[slug];
  const content = category ? GUIDE_CONTENT[category] : null;
  const tools = category ? TOOLS.filter((t) => t.category === category && t.available) : [];

  // JSON-LD structured data
  useEffect(() => {
    if (!category || !content) return;

    const data = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://softwarecalc.com' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://softwarecalc.com/guides' },
          { '@type': 'ListItem', position: 3, name: content.title, item: `https://softwarecalc.com/guides/${slug}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: content.title,
        description: content.intro,
        url: `https://softwarecalc.com/guides/${slug}`,
      },
    ];

    let script = document.getElementById('guide-structured-data') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'guide-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(data);

    return () => {
      document.getElementById('guide-structured-data')?.remove();
    };
  }, [slug, category, content]);

  if (!category || !content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Guide not found.</p>
          <Link to="/"><Button variant="outline">Back to Home</Button></Link>
        </div>
      </div>
    );
  }

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
              <BreadcrumbLink asChild>
                <Link to="/guides" className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Guides</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{content.title}</BreadcrumbPage>
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
              {content.title}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">{content.intro}</p>
        </div>

        {/* ── Story mode (Finance only) ── */}
        {category === 'Finance' && content.storySections && (
          <section className="space-y-6">
            {content.storySections.map((section, i) => (
              <Card key={i}>
                <CardContent className="pt-6 space-y-3">
                  <h2 className="text-xl font-semibold">
                    {section.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed">
                    {section.text}
                  </p>

                  <div className="text-sm font-medium text-primary">
                    Recommended tool:{' '}
                    <Link to="/salary-calculator" className="underline hover:opacity-80">
                      Salary After Tax Calculator
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
        
        {/* ── Common real-world problems ── */}
        <section aria-labelledby="problems-heading" className="space-y-4">
          <h2
            id="problems-heading"
            className="text-2xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Common real-world problems
          </h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {content.problems.map((problem, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{problem}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* ── Recommended tools ── */}
        <section aria-labelledby="tools-heading" className="space-y-4">
          <h2
            id="tools-heading"
            className="text-2xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Recommended tools
          </h2>
          <div className="grid gap-3">
            {tools.map((tool) => (
              <Link key={tool.id} to={tool.href as '/'} className="block group">
                <Card className="transition-all hover:border-primary/50 hover:bg-muted/30">
                  <div className="flex items-center p-4 gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{tool.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{tool.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── When to use ── */}
        <section aria-labelledby="when-heading" className="space-y-4">
          <h2
            id="when-heading"
            className="text-2xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            When to use these calculators
          </h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {content.whenToUse.map((tip, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* ── Footer CTA ── */}
        <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Browse all guides or explore the full tool directory.
          </p>
          <div className="flex gap-3">
            <Link to="/guides">
              <Button variant="outline" size="sm">All Guides</Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" size="sm">All Tools</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
