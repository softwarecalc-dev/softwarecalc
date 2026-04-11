import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TOOLS, ToolConfig } from '@/lib/tools';
import { Search, Wallet, TrendingUp, Briefcase, Receipt, Ruler, Activity, Sigma, Layers } from 'lucide-react';

// Clusters definitions
const DEBT_LOAN_IDS = ['loan-payment-calculator', 'mortgage-calculator', 'debt-to-income-calculator', 'loan-to-value-calculator', 'credit-card-payoff-calculator', 'debt-payoff-calculator', 'payback-period-calculator'];
const INVESTING_IDS = ['compound-interest-calculator', 'rule-of-72-calculator', 'roi-calculator', 'retirement-calculator', 'savings-goal-calculator', 'investment-calculator', 'inflation-calculator'];
const INCOME_WORK_IDS = ['salary-after-tax-calculator', 'commission-calculator', 'hours-worked-calculator', 'salary-hourly-calculator'];
const TAXES_BUSINESS_IDS = ['sales-tax-calculator', 'vat-calculator', 'profit-margin-calculator', 'markup-calculator', 'gross-profit-calculator', 'net-profit-calculator', 'break-even-calculator', 'apr-calculator', 'vat-reverse-calculator', 'sales-tax-reverse-calculator', 'sales-tax-rate-calculator'];

interface Cluster {
  title: string;
  icon: any;
  tools: ToolConfig[];
}

export function SeoClusterMap() {
  const clusters: Cluster[] = [
    {
      title: 'Finance - Debt & Loans',
      icon: Wallet,
      tools: TOOLS.filter(t => DEBT_LOAN_IDS.includes(t.id))
    },
    {
      title: 'Finance - Investing',
      icon: TrendingUp,
      tools: TOOLS.filter(t => INVESTING_IDS.includes(t.id))
    },
    {
      title: 'Finance - Income & Work',
      icon: Briefcase,
      tools: TOOLS.filter(t => INCOME_WORK_IDS.includes(t.id))
    },
    {
      title: 'Finance - Taxes & Business',
      icon: Receipt,
      tools: TOOLS.filter(t => TAXES_BUSINESS_IDS.includes(t.id))
    },
    {
      title: 'Conversions',
      icon: Ruler,
      tools: TOOLS.filter(t => t.category === 'Conversions')
    },
    {
      title: 'Health',
      icon: Activity,
      tools: TOOLS.filter(t => t.category === 'Health')
    },
    {
      title: 'Math',
      icon: Sigma,
      tools: TOOLS.filter(t => t.category === 'Math')
    },
    {
      title: 'Utilities / Misc',
      icon: Layers,
      tools: TOOLS.filter(t => ['Probability', 'Random Generators', 'Game Calculators', 'Date & Time'].includes(t.category))
    }
  ];

  const suggestedMissing = [
    'Salary to Hourly Calculator',
    'Overtime Pay Calculator',
    'Freelance Rate Calculator',
    'Rent Affordability Calculator',
    'Rent vs Buy Calculator',
    'Lease vs Buy Car Calculator'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>SEO Cluster Map</h1>
        <p className="text-xl text-muted-foreground">Internal tool strategy and content grouping analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clusters.map((cluster) => (
          <Card key={cluster.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <cluster.icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">{cluster.title}</CardTitle>
              </div>
              <Badge variant="secondary">{cluster.tools.length} Tools</Badge>
            </CardHeader>
            <CardContent className="pt-4 flex-1">
              <ul className="grid grid-cols-1 gap-2">
                {cluster.tools.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      to={tool.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-border" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
                {cluster.tools.length === 0 && (
                  <li className="text-sm text-muted-foreground italic">No tools in this cluster yet.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Suggested Missing High-ROI Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedMissing.map((tool) => (
              <div key={tool} className="p-4 rounded-xl border bg-card flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
