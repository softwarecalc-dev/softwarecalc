import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            About SoftwareCalc
          </h1>
          <p className="text-muted-foreground text-lg">
            Simple, free, and accessible online calculators for everyday use.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Purpose</CardTitle>
          </CardHeader>

          <CardContent className="prose dark:prose-invert max-w-none space-y-4">
          <p>
            SoftwareCalc was created with a simple goal: to build a fast, reliable, and distraction-free collection of online calculators that anyone can use without complexity or paywalls.
          </p>

          <p>
            SoftwareCalc is designed to replace overly complex calculator sites with a cleaner and more focused experience.
          </p>
            
          <p>
            Many calculator websites are cluttered with ads, unclear formulas, or unnecessary steps. SoftwareCalc focuses on the opposite approach — clear inputs, instant results, and tools that are easy to understand even without technical knowledge.
          </p>

          <p>
            The platform includes calculators across finance, math, conversions, health, game strategy, and date &amp; time. These tools are designed for real-world use cases such as budgeting, comparing prices, studying, tracking changes, and solving everyday problems quickly.
          </p>

          <p>
            Every calculator is built using standard, well-established formulas and is designed to be mobile-friendly, fast, and consistent. The goal is to ensure users can trust the results without needing to double-check calculations elsewhere.
          </p>

          <p>
            SoftwareCalc is independently built and maintained as a long-term project. It is continuously updated with new tools and improvements based on user needs and practical use cases.
          </p>

          <p>
            We believe that useful tools should be simple, transparent, and accessible to everyone — whether you're a student, professional, or just solving everyday problems.
          </p>

          <p>
            Thank you for using SoftwareCalc. We hope it helps you save time and make everyday calculations easier.
          </p>
        </CardContent>

        </Card>
      </div>
    </div>
  );
}
