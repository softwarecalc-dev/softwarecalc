import { ReactNode, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToolConfig, getRelatedTools, getEffectiveFaqs } from '@/lib/tools';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface ToolPageTemplateProps {
  /** The tool's config entry from the registry */
  tool: ToolConfig;
  /** The actual calculator UI — rendered inside the "Calculator" section */
  children: ReactNode;
}

/**
 * ToolPageTemplate
 * ─────────────────
 * Standard layout for every tool page. Pass the tool's config and the
 * calculator UI as children. Everything else (How it works, Example usage,
 * Related tools) is derived from the tools registry automatically.
 */
export function ToolPageTemplate({ tool, children }: ToolPageTemplateProps) {
  const related = getRelatedTools(tool.relatedTools);
  const faqItems = getEffectiveFaqs(tool);

  // ── Structured Data (JSON-LD) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create or update script tag in head
    let script = document.getElementById('tool-structured-data') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'tool-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `https://softwarecalc.com${tool.href}`,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
  },

  faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null,

  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://softwarecalc.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://softwarecalc.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `https://softwarecalc.com${tool.href}`,
      },
    ],
  },
];

script.text = JSON.stringify(structuredData.filter(Boolean));

    // Cleanup: remove script when navigating away from a tool page
    // Actually, since all tools use this template, we can just leave it or update it.
    // If we go to a non-tool page, the script will stay with the last tool's data.
    // Better to remove it on unmount if we're worried about that.
    return () => {
      const scriptToRemove = document.getElementById('tool-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [tool]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-10">

        <div className="space-y-6">
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
                  <Link to="/tools">Tools</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{tool.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* ── Tool header ── */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <tool.icon className="w-6 h-6 text-primary" />
              </div>
              <h1
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {tool.name}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">{tool.description}</p>
          </div>
        </div>

        {/* ── Top Ad Slot ── */}
        <div className="ad-slot ad-slot-top" data-ad-slot="top" />

        {/* ── Calculator UI ── */}
        <section aria-label="Calculator">
          {children}
        </section>

        {/* ── Middle Ad Slot ── */}
        <div className="ad-slot ad-slot-middle" data-ad-slot="middle" />

        {/* ── Formula ── */}
        {(tool.formulaTitle || tool.formulaExpression) && (
          <section aria-labelledby="formula-heading" className="space-y-4">
            <h2
              id="formula-heading"
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {tool.formulaTitle ?? 'Formula'}
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-3">
                {tool.formulaExpression && (
                  <pre className="rounded-lg bg-muted px-5 py-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-words leading-relaxed">
                    {tool.formulaExpression}
                  </pre>
                )}
                {tool.formulaExplanation && (
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {tool.formulaExplanation}
                  </p>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {/* ── About this calculator (SEO) ── */}
        {tool.aboutText && (
          <section aria-labelledby="about-heading" className="space-y-4">
            <h2
              id="about-heading"
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              About this calculator
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="text-muted-foreground leading-relaxed">
                  <ReactMarkdown
                    components={{
                      a: ({ ...props }) => (
                        <a {...props} className="text-primary underline underline-offset-4 hover:opacity-80" />
                      ),
                      p: ({ ...props }) => <p {...props} className="leading-relaxed" />,
                    }}
                  >
                    {tool.aboutText}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ── How to use (SEO) ── */}
        {tool.howToUse && tool.howToUse.length > 0 && (
          <section aria-labelledby="how-to-use-heading" className="space-y-4">
            <h2
              id="how-to-use-heading"
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              How to use
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="space-y-3 list-none">
                  {tool.howToUse.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ── How it works ── */}
        <section aria-labelledby="how-it-works-heading" className="space-y-4">
          <h2
            id="how-it-works-heading"
            className="text-2xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            How it works
          </h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">{tool.howItWorks}</p>
            </CardContent>
          </Card>
        </section>

        {/* ── Example usage ── */}
        {tool.exampleUsage.length > 0 && (
          <section aria-labelledby="examples-heading" className="space-y-4">
            <h2
              id="examples-heading"
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Example usage
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {tool.exampleUsage.map((example, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ── FAQ ── */}
{faqItems.length > 0 && (
  <section aria-labelledby="faq-heading" className="space-y-4">
    <h2
      id="faq-heading"
      className="text-2xl font-semibold tracking-tight"
      style={{ fontFamily: 'var(--font-serif)' }}
    >
      Frequently Asked Questions
    </h2>

    <Card>
      <CardContent className="pt-6 space-y-6">
        {faqItems.map((item, i) => (
          <div key={i} className="space-y-2">
            <h3 className="font-medium text-foreground">
              {item.question}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  </section>
)}
        
        {/* ── Related tools ── */}
        {related.length > 0 && (
          <section aria-labelledby="related-tools-heading" className="space-y-4">
            <h2
              id="related-tools-heading"
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Related tools
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 items-stretch">
              {related.map((relTool) => (
                <Card
                  key={relTool.id}
                  className={`flex flex-col transition-all ${
                    relTool.available
                      ? 'hover:shadow-md hover:border-primary/50 cursor-pointer'
                      : 'opacity-60'
                  }`}
                >
                  <CardHeader className="pb-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${relTool.available ? 'bg-primary/10' : 'bg-muted'}`}>
                        <relTool.icon
                          className={`w-5 h-5 ${relTool.available ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                      </div>
                      <CardTitle className="text-base">{relTool.name}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">{relTool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 mt-auto">
                    {relTool.available ? (
                      <Link to={relTool.href as '/'}>
                        <Button variant="outline" size="sm" className="gap-2 w-full">
                          Open Tool
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── Bottom Ad Slot ── */}
        <div className="ad-slot ad-slot-bottom" data-ad-slot="bottom" />

      </div>
    </div>
  );
}
