import { Link } from '@tanstack/react-router';
import { TOOLS, ToolConfig } from '@/lib/tools';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Home, LayoutGrid } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useEffect } from 'react';

interface CategoryHubPageProps {
  category: ToolConfig['category'];
  title: string;
  description: string;
}

export function CategoryHubPage({ category, title, description }: CategoryHubPageProps) {
  const categoryTools = TOOLS.filter((t) => t.category === category);

  // Structured Data (BreadcrumbList)
  useEffect(() => {
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://softwarecalc.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Tools',
          'item': 'https://softwarecalc.com/tools'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': category,
        }
      ]
    };

    let script = document.getElementById('breadcrumb-structured-data') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'breadcrumb-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(breadcrumbData);

    return () => {
      const scriptToRemove = document.getElementById('breadcrumb-structured-data');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [category]);

  return (
    <div className="min-h-screen bg-background py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumbs */}
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
                <Link to="/tools" className="flex items-center gap-1">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Tools</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            {title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-4 mt-8">
          {categoryTools.map((tool) => (
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
                <div className="flex items-center p-5 gap-5">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      tool.available
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <tool.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-lg">{tool.name}</span>
                      {!tool.available && (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  {tool.available && (
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="pt-10 border-t space-y-6 text-center">
          <p className="text-sm text-muted-foreground">
            Looking for something else? Browse our full directory of online tools.
          </p>
          <Link to="/tools">
            <Button variant="outline" size="lg" className="gap-2">
              <LayoutGrid className="w-4 h-4" />
              All Tools & Calculators
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
