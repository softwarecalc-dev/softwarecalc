import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardContent className="prose dark:prose-invert max-w-none pt-6 space-y-6">
            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">Introduction</h2>
              <p>
                Welcome to SoftwareCalc. We respect your privacy and are committed to protecting any information we may collect from you across our website. This policy explains what data we collect, how we use it, and your rights regarding your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">Information We Collect</h2>
              <p>
                We only collect information about you if we have a reason to do so—for example, to provide our services, to communicate with you, or to make our services better.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account Information:</strong> If you choose to create an account, we collect your email address to provide authentication services and save your preferences.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may collect anonymous information about how you interact with our tools to help us improve the user experience.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">Cookies and Tracking Technologies</h2>
              <p>
                We use cookies to maintain your session and remember your preferences (like your blackjack rule settings). These cookies are necessary for the basic functionality of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">Third-Party Services</h2>
              <p>
                We may use third-party analytics tools (like Google Analytics) to collect anonymous usage data. In the future, we may also use third-party advertising services to serve ads on the site. These third parties have their own privacy policies.
              </p>
            </section>
<section>
  <h2 className="text-2xl font-bold border-b pb-2 mb-4">Advertising and Google AdSense</h2>

  <p>
    SoftwareCalc may use Google AdSense, a third-party advertising service provided by Google.
    Google uses cookies to serve ads to users based on their visits to this website and other
    websites on the internet.
  </p>

  <p>
    Google’s use of advertising cookies enables it and its partners to serve ads based on users’
    visits to this site and other sites.
  </p>

  <p>
    Users may opt out of personalized advertising by visiting Google's Ads Settings:
  </p>

  <p>
    <a
      href="https://adssettings.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      https://adssettings.google.com
    </a>
  </p>

  <p>
    Third-party vendors and ad networks may also use cookies, JavaScript, or web beacons in
    their advertisements. These technologies automatically receive your IP address and may
    be used to measure advertising effectiveness or personalize the advertising content you see.
  </p>
</section>
            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">Data Security</h2>
              <p>
                We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no internet transmission is ever 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">User Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete your information. You can manage your account settings or contact us for assistance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy or our treatment of your data, please contact us at:
              </p>
              <p className="mt-2 font-medium">
                <a href="mailto:contact@softwarecalc.com" className="text-primary hover:underline">
                  contact@softwarecalc.com
                </a>
              </p>
              <p>
  This Privacy Policy may be updated from time to time to reflect changes to our services or legal requirements.
</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
