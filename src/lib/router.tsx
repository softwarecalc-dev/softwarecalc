import { createRouter, createRootRoute, createRoute, RouterProvider, Link, Outlet, useLocation } from '@tanstack/react-router';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useCookieConsent, trackPageView } from '../hooks/useCookieConsent';
import { TOOLS, ToolConfig, CATEGORY_META } from './tools';
import { HomePage } from '../pages/HomePage';
import { ToolsDirectoryPage } from '../pages/ToolsDirectoryPage';
import { CategoryHubPage } from '../pages/CategoryHubPage';
import { ToolPageTemplate } from '../components/ToolPageTemplate';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { TermsOfServicePage } from '../pages/TermsOfServicePage';
import { SeoClusterMap } from '../components/SeoClusterMap';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';

const SHOW_AUTH_UI = false;

// Navigation Component with Auth State
function Navigation() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🧮</span>
            <span className="font-bold text-lg hidden sm:inline" style={{ fontFamily: 'var(--font-serif)' }}>
              SoftwareCalc
            </span>
          </Link>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center text-sm flex-wrap justify-end min-w-0">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: 'text-foreground font-medium' }}
          >
            Home
          </Link>
          <Link
            to="/tools"
            className="text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: 'text-foreground font-medium' }}
          >
            Directory
          </Link>


          {SHOW_AUTH_UI && (
            isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-muted-foreground text-xs truncate max-w-[100px] sm:max-w-[150px] hidden sm:inline">
                  {user?.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

// Main Layout with Auth
function MainLayout() {
  const { consent } = useCookieConsent();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (consent === 'accepted') {
      trackPageView(location.pathname);
    }

    // Update page title and description
    const staticTitleMap: Record<string, string> = {
      '/': 'SoftwareCalc – Online Tools & Calculators',
      '/tools': 'Tools Directory – SoftwareCalc',
      '/about': 'About – SoftwareCalc',
      '/contact': 'Contact – SoftwareCalc',
      '/privacy-policy': 'Privacy Policy – SoftwareCalc',
      '/login': 'Login – SoftwareCalc',
      '/signup': 'Sign Up – SoftwareCalc',
      '/forgot-password': 'Forgot Password – SoftwareCalc',
      '/reset-password': 'Reset Password – SoftwareCalc',
    };

    const staticDescMap: Record<string, string> = {
      '/': 'SoftwareCalc provides simple online calculators and helper tools designed to be fast and easy to use.',
      '/tools': 'Browse our collection of helpful online calculators and tools.',
    };

    // Check if the current path matches a tool
    const currentTool = TOOLS.find(t => t.href === location.pathname);

    // Check if the current path matches a category hub page
    const currentCategory = Object.entries(CATEGORY_META).find(([, meta]) => `/${meta.slug}` === location.pathname);

    let newTitle = currentTool?.seoTitle || staticTitleMap[location.pathname] || 'SoftwareCalc';
    let newDesc = currentTool?.seoDescription || staticDescMap[location.pathname] || 'SoftwareCalc provides simple online calculators and helper tools designed to be fast and easy to use.';

    if (currentCategory) {
      newTitle = `${currentCategory[1].title} – SoftwareCalc`;
      newDesc = currentCategory[1].description;
    }

    document.title = newTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', newDesc);

    // Update OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', newDesc);
    }

    // Update OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', newTitle);
    }
  }, [location.pathname, consent]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1">
          <Outlet />
        </div>
        <footer className="border-t py-8 mt-auto bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground text-center md:text-left">
                <p>© {new Date().getFullYear()} SoftwareCalc. Free online calculators for math, finance, conversions, and everyday use.</p>
              </div>
              <div className="flex gap-6 text-sm flex-wrap justify-center md:justify-end">
                <Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tools Directory
                </Link>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

// Create root route with layout
const rootRoute = createRootRoute({
  component: MainLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const toolsDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools',
  component: ToolsDirectoryPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

const termsOfServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-of-service',
  component: TermsOfServicePage,
});

const seoMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/seo-map',
  component: SeoClusterMap,
});

// Automatic Tool Routes
const toolRoutes = TOOLS.filter(t => t.available && t.component).map(tool => 
  createRoute({
    getParentRoute: () => rootRoute,
    path: tool.href,
    component: () => (
      <ToolPageTemplate tool={tool}>
        {tool.component && <tool.component />}
      </ToolPageTemplate>
    ),
  })
);

// Automatic Category Hub Routes
const categoryRoutes = Object.entries(CATEGORY_META).map(([category, meta]) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: `/${meta.slug}`,
    component: () => (
      <CategoryHubPage
        category={category as ToolConfig['category']}
        title={meta.title}
        description={meta.description}
      />
    ),
  })
);

// Auth routes (outside main layout)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupPage,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: ForgotPasswordPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  component: ResetPasswordPage,
});

const seoMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/seo-cluster-map',
  component: SeoClusterMap,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  toolsDirectoryRoute,
  aboutRoute,
  contactRoute,
  privacyPolicyRoute,
  termsOfServiceRoute,
  seoMapRoute,
  ...toolRoutes,
  ...categoryRoutes,
  loginRoute,
  signupRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
]);

export const router = createRouter({ routeTree });

// Type augmentation for route names
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
