'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface DashboardContextType {
  refreshKey: number;
  triggerRefresh: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    const newKey = Date.now();
    setRefreshKey(newKey);
  }, []);

  // Listen for custom events AND BroadcastChannel
  useEffect(() => {
    // BroadcastChannel for cross-tab communication (more reliable)
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('dashboard-refresh-channel');
      channel.onmessage = (event) => {
        if (event.data.type === 'refresh') {
          triggerRefresh();
        }
      };
    } catch (error) {
      // BroadcastChannel not supported, use fallback
    }
    
    const handleRefresh = (e: Event) => {
      triggerRefresh();
    };

    // Listen for postMessage fallback
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = e.data;
        // Only respond to dashboard-refresh messages from our app
        if (data && typeof data === 'object' && data.type === 'dashboard-refresh') {
          triggerRefresh();
        }
      } catch (err) {
        // Silently ignore unrelated messages (e.g., from browser extensions)
      }
    };

    // Listen for storage events (cross-tab fallback)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'dashboard-last-refresh') {
        triggerRefresh();
      }
    };

    window.addEventListener('dashboard-refresh', handleRefresh);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('dashboard-refresh', handleRefresh);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('message', handleMessage);
      if (channel) {
        channel.close();
      }
    };
  }, [triggerRefresh]);

  return (
    <DashboardContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardRefresh() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    // Fallback: Return dummy functions if context is not available
    return {
      refreshKey: 0,
      triggerRefresh: () => {},
    };
  }
  return context;
}
