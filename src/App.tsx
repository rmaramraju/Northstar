/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RouterProvider, useRouter } from './context/RouterContext';

// Public Components
import { Header } from './components/public/Header';
import { Hero } from './components/public/Hero';
import { Products } from './components/public/Products';
import { WhyNorthstar } from './components/public/WhyNorthstar';
import { PublicResources } from './components/public/PublicResources';
import { FinalCTA } from './components/public/FinalCTA';
import { PublicFooter } from './components/public/PublicFooter';

// Auth Components
import { LoginView } from './components/auth/LoginView';
import { SignupView } from './components/auth/SignupView';

// Portal Components
import { PortalLayout } from './components/portal/PortalLayout';
import { DashboardView } from './components/portal/DashboardView';
import { RequestQuoteView } from './components/portal/RequestQuoteView';
import { ApplicationsView } from './components/portal/ApplicationsView';
import { ApplicationDetailView } from './components/portal/ApplicationDetailView';
import { PoliciesView } from './components/portal/PoliciesView';
import { ResourcesView } from './components/portal/ResourcesView';
import { SupportView } from './components/portal/SupportView';

const MainContent: React.FC = () => {
  const { currentPath, selectedAppId } = useRouter();
  const { isAuthenticated } = useAuth();

  // Router dispatcher logic
  const renderView = () => {
    // 1. Auth routes
    if (currentPath === '/broker/login') {
      return <LoginView />;
    }
    if (currentPath === '/broker/signup') {
      return <SignupView />;
    }

    // 2. Broker Portal Protected Routes
    if (currentPath.startsWith('/broker')) {
      if (!isAuthenticated) {
        return <LoginView />;
      }

      let portalBody: React.ReactNode = <DashboardView />;

      if (currentPath === '/broker/dashboard') {
        portalBody = <DashboardView />;
      } else if (currentPath.startsWith('/broker/quote')) {
        portalBody = <RequestQuoteView />;
      } else if (currentPath === '/broker/applications') {
        portalBody = <ApplicationsView />;
      } else if (selectedAppId || currentPath.startsWith('/broker/applications/')) {
        portalBody = <ApplicationDetailView />;
      } else if (currentPath === '/broker/policies') {
        portalBody = <PoliciesView />;
      } else if (currentPath === '/broker/resources') {
        portalBody = <ResourcesView />;
      } else if (currentPath === '/broker/support') {
        portalBody = <SupportView />;
      }

      return <PortalLayout>{portalBody}</PortalLayout>;
    }

    // 3. Default Public Website View
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main>
          <Hero />
          <Products />
          <WhyNorthstar />
          <PublicResources />
          <FinalCTA />
        </main>
        <PublicFooter />
      </div>
    );
  };

  return renderView();
};

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <MainContent />
      </RouterProvider>
    </AuthProvider>
  );
}
