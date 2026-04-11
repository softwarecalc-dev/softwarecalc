import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg">
            Please read these terms before using SoftwareCalc.
          </p>
        </div>

<Card>
  <CardHeader>
    <CardTitle>SoftwareCalc Terms of Service</CardTitle>
  </CardHeader>

          <CardContent className="prose dark:prose-invert max-w-none space-y-6">
  <p className="text-sm text-muted-foreground">
  Last updated: March 2026
</p>


    <h3>1. Introduction</h3>
    <p>
      These Terms of Service govern your use of the SoftwareCalc website and all tools, calculators, and content available on it. By using this site, you agree to these terms. If you do not agree, please do not use the site.
    </p>

    <h3>2. Use of the Website</h3>
    <p>
      The calculators and tools on SoftwareCalc are provided for informational and educational purposes only. You may use them freely for personal, non-commercial purposes. You agree not to misuse, copy, or redistribute any part of the site without permission.
    </p>

    <h3>3. Accuracy of Calculations</h3>
    <p>
      While SoftwareCalc strives to provide accurate and reliable calculations, results may contain errors or may not apply to every situation. You should not rely on any result from this site as a guaranteed or error-free outcome. Always verify important calculations independently before making decisions based on them.
    </p>

    <h3>4. No Professional Advice</h3>
    <p>
      The tools on SoftwareCalc do not constitute financial, legal, tax, medical, or any other form of professional advice. Results are provided for general informational purposes only. If you need advice specific to your situation, please consult a qualified professional.
    </p>

    <h3>5. Gaming and Probability Tools Disclaimer</h3>
    <p>
      Tools related to games such as blackjack, poker, or other probability-based calculations are provided as simulations or statistical estimates for educational and entertainment purposes only. They do not guarantee outcomes in real gambling situations. SoftwareCalc does not encourage gambling and is not responsible for any decisions made based on these tools.
    </p>

    <h3>6. Limitation of Liability</h3>
    <p>
      SoftwareCalc and its operators are not responsible for any decisions, losses, damages, or consequences arising from your use of the tools or information on this site. You use all tools at your own risk.
    </p>

    <h3>7. Intellectual Property</h3>
    <p>
      All calculators, tools, design elements, and content on SoftwareCalc are the property of SoftwareCalc unless otherwise stated. You may not reproduce, distribute, or create derivative works from any part of this site without prior written permission.
    </p>

    <h3>8. Third-Party Advertising</h3>
    <p>
      SoftwareCalc may display advertisements from third-party providers, including Google AdSense. These ads are served by external services and SoftwareCalc is not responsible for their content. Third-party advertising partners may use cookies in accordance with their own privacy policies.
    </p>

    <h3>9. Changes to These Terms</h3>
    <p>
      SoftwareCalc reserves the right to update or change these Terms of Service at any time without prior notice. Continued use of the site after changes are posted constitutes your acceptance of the revised terms. We recommend reviewing this page periodically.
    </p>

    <h3>10. Contact</h3>
    <p>
      If you have any questions about these Terms of Service, please visit our{" "}
      <Link to="/contact" className="text-primary hover:underline">
        Contact page
      </Link>.
    </p>

  </CardContent>
</Card>
      </div>
    </div>
  );
}
