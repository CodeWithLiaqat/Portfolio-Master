import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect } from 'react';
import { injectViewTransitionStyles } from '@/motion/transitions';

import { Home } from '@/app/Home';
import { About } from '@/app/About';
import { Portfolio } from '@/app/Portfolio';
import { CaseStudy } from '@/app/CaseStudy';
import { Contact } from '@/app/Contact';
import { Services } from '@/app/Services';
import { ServiceDetail } from '@/app/ServiceDetail';
import { Insights } from '@/app/Insights';
import { InsightDetail } from '@/app/InsightDetail';
import { Lab } from '@/app/Lab';
import { FAQ } from '@/app/FAQ';
import { Privacy } from '@/app/Privacy';
import { Terms } from '@/app/Terms';
import Custom404 from '@/app/NotFound';

import { ArtifactCanvas } from '@/three/ArtifactCanvas';
import { ThemeOrbs } from '@/components/common/ThemeOrbs';
import { Preloader } from '@/components/common/Preloader';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/portfolio/:slug" component={CaseStudy} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/insights" component={Insights} />
      <Route path="/insights/:slug" component={InsightDetail} />
      <Route path="/lab" component={Lab} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/legal/privacy" component={Privacy} />
      <Route path="/legal/terms" component={Terms} />
      <Route component={Custom404} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    injectViewTransitionStyles();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Preloader />
          <ThemeOrbs />
          <ArtifactCanvas />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
