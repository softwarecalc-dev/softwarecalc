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
  title: 'From Paycheck to Property: A Practical Personal Finance Story',
  intro: 'Financial stability starts long before buying a house. You first understand your real income, reduce debt, improve savings, and make smarter long-term decisions with investing and loan planning. This guide follows a realistic journey from salary planning to home ownership using practical financial calculators along the way.',
  story: `
<p>
Alex had spent most of his twenties doing what many people do — working hard, paying bills, and telling himself that “real financial planning” would start next year. Somehow, next year kept moving further away. First it was rent, then car repairs, then holidays, then unexpected expenses. Saving money always felt like something meant for people who already had money.
</p>

<p>
But things changed when he landed a better job.
</p>

<p>
The salary sounded great during the interview. The number looked big, and for the first time in years, he felt like life might finally get easier. But after signing the contract, he sat at his kitchen table and realised something important: gross salary and real salary were not the same thing.
</p>

<p>
He opened a <a href="/salary-after-tax-calculator" class="text-primary underline">Salary After Tax Calculator</a> and entered his new income. The result surprised him. Taxes, deductions, and contributions took a much bigger piece than he expected. His salary still looked good, but suddenly it felt real. This was the number he actually had to work with.
</p>

<p>
Instead of guessing, Alex decided to take control properly. He listed every monthly cost: rent, electricity, food, fuel, insurance, phone bills, subscriptions he had forgotten existed, and the small “just this once” purchases that somehow happened every week.
</p>

<p>
When he compared spending against income, he realised something uncomfortable — he was earning more, but not building anything. His money was disappearing without a plan.
</p>

<p>
That was the moment he decided he wanted more than just surviving month to month. He wanted a house.
</p>

<p>
Not immediately. Not next month. But someday soon enough that it felt like a real goal instead of a fantasy.
</p>

<p>
He started researching what banks actually cared about. One term kept appearing everywhere: debt-to-income ratio. Apparently, lenders did not care how confident you felt — they cared how much of your monthly income was already committed elsewhere.
</p>

<p>
He used a <a href="/debt-to-income-calculator" class="text-primary underline">Debt To Income Calculator</a> and entered his car payment, student loan balance, and credit card payments. The result was worse than he hoped. He was still technically “fine,” but not strong enough for the mortgage he wanted.
</p>

<p>
That meant step one was not buying property. Step one was cleaning up debt.
</p>

<p>
His credit card balance had been annoying him for years. Minimum payments made it feel manageable, but never smaller. He checked a <a href="/credit-card-payoff-calculator" class="text-primary underline">Credit Card Payoff Calculator</a> and saw the brutal truth: if he kept paying the minimum, he would be paying for years.
</p>

<p>
That annoyed him enough to act.
</p>

<p>
He built a simple plan using a <a href="/debt-payoff-calculator" class="text-primary underline">Debt Payoff Calculator</a>. If he cut unnecessary spending and added one extra payment every month, the timeline changed dramatically. Suddenly, the debt had an ending.
</p>

<p>
At work, he started volunteering for extra shifts. Sometimes it was tiring, but every extra hour now had a purpose. He used a <a href="/salary-hourly-calculator" class="text-primary underline">Salary Hourly Calculator</a> to break down what his time was actually worth. Seeing the hourly number made overtime decisions easier. One extra weekend shift was no longer “just work” — it was part of the future house deposit.
</p>

<p>
Months passed. His credit card debt shrank. His savings account slowly stopped looking embarrassing.
</p>

<p>
Then came the question almost everyone asks:
</p>

<p>
Should I save more… or should I invest?
</p>

<p>
Keeping money in the bank felt safe, but inflation made that safety look expensive. Prices kept rising. Rent kept rising. Even groceries seemed offended by his existence.
</p>

<p>
He checked an <a href="/inflation-calculator" class="text-primary underline">Inflation Calculator</a> and realised that money sitting still was quietly losing value every year. That changed how he thought about “playing it safe.”
</p>

<p>
He moved on to a <a href="/compound-interest-calculator" class="text-primary underline">Compound Interest Calculator</a>. At first, the numbers looked small. But when he changed the timeline from two years to ten, then twenty, the graph became ridiculous. Small monthly contributions turned into something that looked like an actual future.
</p>

<p>
For the first time, retirement stopped feeling like an abstract old-person problem. It became math.
</p>

<p>
He opened a <a href="/retirement-calculator" class="text-primary underline">Retirement Calculator</a> and tested different monthly investments. Waiting five more years made a huge difference. Starting now, even imperfectly, mattered more than waiting for the “perfect time.”
</p>

<p>
That lesson hit him harder than expected.
</p>

<p>
He was not late. But he would be if he kept delaying.
</p>

<p>
Still, the house goal remained.
</p>

<p>
He started browsing listings. Apartments. Small townhouses. Places with kitchens that looked suspiciously optimistic in photos.
</p>

<p>
At first, prices looked manageable. Then he opened a <a href="/mortgage-calculator" class="text-primary underline">Mortgage Calculator</a>.
</p>

<p>
That changed everything.
</p>

<p>
Monthly payments were one thing. Interest over twenty-five or thirty years was another. A house listed at one price could quietly cost almost double by the end.
</p>

<p>
He added more detail with a <a href="/loan-payment-calculator" class="text-primary underline">Loan Payment Calculator</a>, adjusting rates and repayment lengths. Shorter loans meant higher monthly pressure. Longer loans meant paying far more over time. There was no magic option — only trade-offs.
</p>

<p>
Then came the deposit problem.
</p>

<p>
Banks wanted security. They wanted proof he could contribute enough upfront. He checked a <a href="/loan-to-value-calculator" class="text-primary underline">Loan To Value Calculator</a> and understood why saving for a larger deposit mattered so much. A better LTV ratio meant better loan conditions and less financial risk.
</p>

<p>
He created a target and used a <a href="/savings-goal-calculator" class="text-primary underline">Savings Goal Calculator</a> to figure out how much he needed to save each month to reach it in two years.
</p>

<p>
The number looked aggressive.
</p>

<p>
But aggressive felt better than vague.
</p>

<p>
At one point, he considered buying a cheaper property, renovating it, and selling later. He tested the idea with a <a href="/break-even-calculator" class="text-primary underline">Break Even Calculator</a> and later a <a href="/roi-calculator" class="text-primary underline">ROI Calculator</a>. Some deals looked exciting until maintenance costs entered the conversation. Numbers were much less romantic than YouTube property influencers.
</p>

<p>
That was probably a good thing.
</p>

<p>
Slowly, Alex stopped thinking like someone trying to “get rich” and started thinking like someone building stability.
</p>

<p>
He paid down debt.
</p>

<p>
He tracked spending.
</p>

<p>
He invested consistently.
</p>

<p>
He understood loans before signing them.
</p>

<p>
He saved with purpose instead of hope.
</p>

<p>
And maybe most importantly, he stopped being intimidated by money.
</p>

<p>
Finance had always seemed like a language spoken by other people — bankers, investors, people in expensive suits saying words like “portfolio” too casually.
</p>

<p>
But now he understood something simple:
</p>

<p>
Most financial decisions were not magic. They were just calculations people avoided because they were uncomfortable.
</p>

<p>
And calculators made uncomfortable things clearer.
</p>

<p>
One evening, sitting at the same kitchen table where this had started, Alex looked at his numbers again.
</p>

<p>
He was not buying the dream house yet.
</p>

<p>
But he had no credit card panic.
</p>

<p>
His savings had direction.
</p>

<p>
His investments had momentum.
</p>

<p>
His mortgage options were realistic.
</p>

<p>
And for the first time in a long time, the future did not feel random.
</p>

<p>
It felt planned.
</p>

<p>
That was worth more than the house itself.
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
const tools = category && content
  ? TOOLS.filter((tool) => {
      if (!tool.available) return false;
      return content.story.includes(`href="${tool.href}"`);
    })
  : [];

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
<div className="bg-white dark:bg-zinc-900 border shadow-sm rounded-xl p-6 max-w-2xl mx-auto">
  <div
    className="space-y-5 text-base leading-relaxed text-muted-foreground"
    dangerouslySetInnerHTML={{ __html: content.story }}
  />
</div>


{/* ── Relevant Tools ── */}
{tools.length > 0 && (
  <div className="bg-muted/30 rounded-xl border p-6 space-y-4">
    <h2 className="text-lg font-semibold">
      Relevant tools in this guide
    </h2>

    <div className="grid sm:grid-cols-2 gap-2">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          to={tool.href as any}
          className="text-primary hover:underline text-sm"
        >
          {tool.name}
        </Link>
      ))}
    </div>
  </div>
)}
        
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
