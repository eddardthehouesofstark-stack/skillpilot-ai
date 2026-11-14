"use client";

import { useState } from "react";
import LandingPage from "@/components/landing-page";
import DashboardView from "@/components/dashboard-view";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  return showDashboard ? (
    <DashboardView onBackToHome={() => setShowDashboard(false)} />
  ) : (
    <LandingPage onGetStarted={() => setShowDashboard(true)} />
  );
}

