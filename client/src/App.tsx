import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Pricing from "@/pages/pricing";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import BackToTop from "./components/back-to-top";
import LoginModal from "./components/login-modal";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Scroll to top on page change
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Navbar onLoginClick={() => setShowLoginModal(true)} />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <BackToTop />
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
