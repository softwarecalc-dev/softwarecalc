import { RouterProvider } from '@tanstack/react-router';
import { router } from './lib/router';
import { CookieConsentBanner } from './components/CookieConsentBanner';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CookieConsentBanner />
    </>
  );
}

export default App;