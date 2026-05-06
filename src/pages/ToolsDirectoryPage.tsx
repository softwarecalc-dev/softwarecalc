  import { Link } from '@tanstack/react-router';
import { TOOLS, ToolConfig, CATEGORY_META } from '@/lib/tools';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, LayoutGrid } from 'lucide-react';

const CATEGORY_ORDER: ToolConfig['category'][] = [
  'Finance',
  'Math',
  'Probability',
  'Conversions',
  'Random Generators',
  'Game Calculators',
  'Health',
  'Date & Time',
];

export function ToolsDirectoryPage() {
  // Group tools by category
  const grouped = CATEGORY_ORDER.reduce<Record<string, ToolConfig[]>>((acc, cat) => {
    const tools = TOOLS.filter((t) => t.category === cat);
    if (tools.length > 0) acc[cat] = tools;
    return acc;
  }, {});

  const activeCategories = CATEGORY_ORDER.filter((cat) => grouped[cat]);

  return (
    <div className="min-h-screen bg-background py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">

      {/* Header */}
      <div className="space-y-5 text-center max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
          All Online Calculators & Tools
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          SoftwareCalc is a free online calculator platform offering a complete set of tools for finance, math, conversions, health, and everyday problem solving.
          Each calculator is built using standard formulas to ensure accurate and reliable results.
        </p>

        <p className="text-muted-foreground text-base">
          Whether you are calculating loans, comparing investments, converting units, or solving mathematical problems, you can find the right tool below.
        </p>

      </div>

        {/* Category Navigation */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Category Hubs
          </h2>
          <div className="flex flex-wrap gap-2">
            {activeCategories.map((cat) => (
              <Link
                key={cat}
                to={`/${CATEGORY_META[cat].slug}` as '/'}
                className="px-4 py-2 rounded-full border bg-card hover:bg-muted hover:border-primary/50 transition-all text-sm font-medium"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Category sections */}
        {activeCategories.map((category) => (
          <section key={category} className="space-y-4">
            {category === 'Finance' && (
            <p className="text-sm text-muted-foreground mb-3 max-w-2xl">
              Finance calculators help you make informed decisions about loans, savings, investments, and taxes using standard financial formulas.
            </p>
          )}

          {category === 'Math' && (
            <p className="text-sm text-muted-foreground mb-3 max-w-2xl">
              Math calculators help solve everyday mathematical problems including percentages, ratios, fractions, and equations.
            </p>
          )}

          {category === 'Conversions' && (
            <p className="text-sm text-muted-foreground mb-3 max-w-2xl">
              Conversion tools allow quick and accurate conversion between units such as length, weight, temperature, and volume.
            </p>
          )}

          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{category}</h2>
            <div className="flex-1 border-t" />
          </div>

            <div className="grid gap-3">
              {grouped[category].map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.available ? (tool.href as '/') : undefined}
                  className={`block group ${!tool.available ? 'cursor-default' : ''}`}
                >
                  <Card
                    className={`transition-all ${
                      tool.available
                        ? 'hover:border-primary/50 hover:bg-muted/30'
                        : 'opacity-70'
                    }`}
                  >
                    <div className="flex items-center p-4 gap-4">
                      <div
                        className={`p-2.5 rounded-lg shrink-0 ${
                          tool.available
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <tool.icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">{tool.name}</span>
                          {!tool.available && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                          {tool.description}
                        </p>
                      </div>

                      {tool.available && (
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
              <div className="pt-2 flex justify-center">
  <Link to={`/${CATEGORY_META[category].slug}` as '/'}>
                  <Button variant="outline">
                    Explore all {CATEGORY_META[category].title.replace('Online ', '')} calculators →
                  </Button>
                </Link>
              </div>
          </section>
        ))}

        {/* ALL TOOLS (SEO crawl boost) */}
<section className="pt-12 space-y-4">
  <h2 className="text-xl font-semibold text-center">
    All Calculators
  </h2>

  <div className="flex flex-wrap gap-2 justify-center">
    {TOOLS.filter(t => t.available).map(tool => (
      <Link
        key={tool.id}
        to={tool.href as '/'}
        className="text-sm text-primary underline hover:no-underline"
      >
        {tool.name}
      </Link>
    ))}
  </div>
</section>
        
        <section className="max-w-3xl mx-auto space-y-5 pt-12 text-sm md:text-base">

  <h2 className="text-2xl font-semibold">
    Why Use Online Calculators?
  </h2>

  <p className="text-muted-foreground">
    Online calculators help reduce manual errors and save time by applying proven mathematical and financial formulas instantly. They are widely used for budgeting, education, business planning, and everyday problem solving.
  </p>

  <p className="text-muted-foreground">
    SoftwareCalc is continuously improved with new tools based on user needs, ensuring accurate and practical results across all categories including finance, math, and conversions.
  </p>

  <h3 className="text-lg font-semibold pt-2">
    Trusted by Students, Professionals, and Everyday Users
  </h3>

  <p className="text-muted-foreground">
    Our calculators are designed to be simple, fast, and accessible for everyone — from quick calculations to complex financial planning.
  </p>

</section>
        
        {/* Back link */}
        <div className="pt-6 border-t">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              Back to Home
            </Button>
          </Link>
        </div>
        <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are online calculators used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Online calculators are used to quickly solve financial, mathematical, and everyday problems such as loan payments, percentages, conversions, and savings planning using standard formulas."
      }
    },
    {
      "@type": "Question",
      "name": "Are SoftwareCalc calculators accurate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all calculators on SoftwareCalc are based on standard mathematical and financial formulas to ensure accurate and reliable results."
      }
    },
    {
      "@type": "Question",
      "name": "Is SoftwareCalc free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SoftwareCalc is completely free to use. All calculators are accessible without registration or payment."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to install anything to use these calculators?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No installation is required. All calculators run directly in your browser and work on both desktop and mobile devices."
      }
    },
    {
      "@type": "Question",
      "name": "What types of calculators does SoftwareCalc offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SoftwareCalc offers calculators across finance, math, conversions, health, and general utilities such as loan calculators, percentage calculators, BMI calculators, and unit converters."
      }
    },
    {
      "@type": "Question",
      "name": "Can I trust the results from these calculators?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the calculators use widely accepted formulas and are designed for educational and informational use to provide reliable estimates and results."
      }
    }
  ]
})}
</script>
      </div>
     
    </div>
  );
}
