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
  story: string;
}

const GUIDE_CONTENT: Record<ToolConfig['category'], GuideContent> = {
  Finance: {
  title: 'Can I Afford a House? A Real-World Finance Journey',

  intro:
    'Buying a house is not a single calculation — it is a sequence of financial decisions. You start with your real income, then define affordability, then test loans, and finally compare long-term cost vs alternatives like renting or investing. This guide walks through a real-life financial journey.',

  story: `
<p>
Alex just got a new job after being unemployed for a while. The first thing he wants to know is how much money he actually takes home. He opens a <a href="/salary-after-tax-calculator" class="text-primary underline">salary after tax calculator</a> and realises his real income is lower than expected.
</p>

<p>
Now he needs structure. He decides that housing should not take more than 30% of his income, so he uses a <a href="/budget-calculator" class="text-primary underline">budget calculator</a> to figure out what is actually safe to spend each month.
</p>

<p>
After a few months of saving, he starts thinking about what to do with his extra money. Should he invest it or keep saving? He tries a <a href="/roi-calculator" class="text-primary underline">ROI calculator</a> and sees how long-term growth can change everything.
</p>

<p>
Eventually he looks at buying a house. The price looks okay at first, but when he checks mortgage payments using a <a href="/mortgage-calculator" class="text-primary underline">mortgage calculator</a>, he realises interest over time completely changes the picture.
</p>

<p>
In the end, he is not just deciding between houses anymore — he is deciding between renting, investing, or buying, each shaping his financial future in completely different ways.
</p>
`
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

       {/* ── Story ── */}
<div
  className="max-w-2xl mx-auto space-y-6 text-lg leading-relaxed text-muted-foreground"
  dangerouslySetInnerHTML={{ __html: content.story }}
/>



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
