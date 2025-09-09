"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useToast } from './use-toast';

type CurrencyType = "BNB" | "ETH" | "USD";

interface CurrencyContextType {
  currency: CurrencyType;
  toggleCurrency: () => CurrencyType;
  formatValue: (bnbValue: number | null) => string;
  rates: {
    bnbUsd: number;
    ethUsd: number;
  };
  loading: boolean;
  error: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const getBinancePrices = async () => {
  const [bnbResponse, ethResponse] = await Promise.all([
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT'),
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT')
  ]);
  
  const bnbData = await bnbResponse.json();
  const ethData = await ethResponse.json();
  
  return {
    bnbUsd: parseFloat(bnbData.price),
    ethUsd: parseFloat(ethData.price)
  };
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyType>("BNB");
  // Use React Query for price fetching
  const { data: rates, isLoading: loading, error: queryError } = useQuery({
    queryKey: ['crypto-prices'],
    queryFn: getBinancePrices,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
    initialData: {
      bnbUsd: 600, // Fallback
      ethUsd: 3500 // Fallback
    }
  });

  const error = queryError instanceof Error ? queryError.message : null;
  const { toast } = useToast();

  // Price fetching now handled by React Query

  const toggleCurrency = () => {
    let newCurrency: CurrencyType;
    setCurrency(prev => {
      if (prev === "BNB") newCurrency = "ETH";
      else if (prev === "ETH") newCurrency = "USD";
      else newCurrency = "BNB";
      
      return newCurrency;
    });
    
    setTimeout(() => {
      toast({
        title: `💰 Currency Changed`,
        description: `Display currency switched to ${newCurrency!}`,
      });
    }, 0);
    
    return newCurrency!;
  };

  const formatValue = (bnbValue: number | null) => {
    if (bnbValue === null || bnbValue === undefined || isNaN(Number(bnbValue))) {
      return "Free";
    }
    
    const value = Number(bnbValue);
    
    if (currency === "BNB") {
      return `${value.toFixed(8)} BNB`;
    } else if (currency === "ETH") {
      // Convert BNB to ETH via USD
      const bnbUsdValue = value * rates.bnbUsd;
      const ethValue = bnbUsdValue / rates.ethUsd;
      return `${ethValue.toFixed(6)} ETH`;
    } else {
      const usdValue = value * rates.bnbUsd;
      return `$${usdValue.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      toggleCurrency, 
      formatValue, 
      rates, 
      loading, 
      error 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}