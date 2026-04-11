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
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Tools Directory
          </h1>
          <p className="text-muted-foreground text-lg">
            All calculators and helper tools available on SoftwareCalc, organized by category.
          </p>
        </div>

        {/* Category Navigation */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Category Hubs
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((cat) => (
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
          </section>
        ))}

        {/* Back link */}
        <div className="pt-6 border-t">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
