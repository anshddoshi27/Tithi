"use client";

import * as React from "react";

export type BusinessSubscriptionStatus = "trial" | "active" | "paused" | "canceled";

export interface FakeBusiness {
  id: string;
  name: string;
  slug: string;
  bookingUrl: string;
  status: BusinessSubscriptionStatus;
  createdAt: string;
  trialEndsAt?: string;
  nextBillDate?: string;
}

interface FakeBusinessContextValue {
  business?: FakeBusiness;
  createBusiness: (business: FakeBusiness) => void;
  updateBusiness: (updates: Partial<FakeBusiness>) => void;
  clearBusiness: () => void;
}

const FakeBusinessContext = React.createContext<FakeBusinessContextValue | undefined>(
  undefined
);

export function FakeBusinessProvider({ children }: { children: React.ReactNode }) {
  const [business, setBusiness] = React.useState<FakeBusiness | undefined>(undefined);

  const createBusiness = React.useCallback((payload: FakeBusiness) => {
    setBusiness((existing) => (existing ? existing : payload));
  }, []);

  const updateBusiness = React.useCallback((updates: Partial<FakeBusiness>) => {
    setBusiness((existing) => (existing ? { ...existing, ...updates } : existing));
  }, []);

  const clearBusiness = React.useCallback(() => {
    setBusiness(undefined);
  }, []);

  const value = React.useMemo(
    () => ({
      business,
      createBusiness,
      updateBusiness,
      clearBusiness
    }),
    [business, createBusiness, updateBusiness, clearBusiness]
  );

  return (
    <FakeBusinessContext.Provider value={value}>{children}</FakeBusinessContext.Provider>
  );
}

export function useFakeBusiness() {
  const context = React.useContext(FakeBusinessContext);
  if (!context) {
    throw new Error("useFakeBusiness must be used within a FakeBusinessProvider");
  }
  return context;
}


