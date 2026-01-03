import { useCallback, useEffect, useRef } from 'react';
import { useTelegram } from './useTelegram';

interface AnalyticsEvent {
  event: string;
  timestamp: number;
  userId?: number;
  username?: string;
  data?: Record<string, unknown>;
}

interface AnalyticsStats {
  totalVisits: number;
  uniqueUsers: Set<number>;
  pageViews: Record<string, number>;
  buttonClicks: Record<string, number>;
  sessionStart: number;
  events: AnalyticsEvent[];
}

const STORAGE_KEY = 'cryptoessay_analytics';

function loadStats(): AnalyticsStats {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        uniqueUsers: new Set(parsed.uniqueUsers || []),
      };
    }
  } catch (e) {
    console.error('Failed to load analytics:', e);
  }

  return {
    totalVisits: 0,
    uniqueUsers: new Set(),
    pageViews: {},
    buttonClicks: {},
    sessionStart: Date.now(),
    events: [],
  };
}

function saveStats(stats: AnalyticsStats) {
  try {
    const toStore = {
      ...stats,
      uniqueUsers: Array.from(stats.uniqueUsers),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.error('Failed to save analytics:', e);
  }
}

// Global stats instance
let globalStats: AnalyticsStats | null = null;

function getStats(): AnalyticsStats {
  if (!globalStats) {
    globalStats = loadStats();
  }
  return globalStats;
}

export function useAnalytics() {
  const { user } = useTelegram();
  const initialized = useRef(false);

  // Track session start
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const stats = getStats();
    stats.totalVisits += 1;
    stats.sessionStart = Date.now();

    if (user?.id) {
      stats.uniqueUsers.add(user.id);
    }

    stats.events.push({
      event: 'session_start',
      timestamp: Date.now(),
      userId: user?.id,
      username: user?.username,
    });

    saveStats(stats);
  }, [user]);

  const trackPageView = useCallback((pageName: string) => {
    const stats = getStats();
    stats.pageViews[pageName] = (stats.pageViews[pageName] || 0) + 1;

    stats.events.push({
      event: 'page_view',
      timestamp: Date.now(),
      userId: user?.id,
      username: user?.username,
      data: { page: pageName },
    });

    // Keep only last 100 events
    if (stats.events.length > 100) {
      stats.events = stats.events.slice(-100);
    }

    saveStats(stats);
  }, [user]);

  const trackButtonClick = useCallback((buttonName: string, additionalData?: Record<string, unknown>) => {
    const stats = getStats();
    stats.buttonClicks[buttonName] = (stats.buttonClicks[buttonName] || 0) + 1;

    stats.events.push({
      event: 'button_click',
      timestamp: Date.now(),
      userId: user?.id,
      username: user?.username,
      data: { button: buttonName, ...additionalData },
    });

    // Keep only last 100 events
    if (stats.events.length > 100) {
      stats.events = stats.events.slice(-100);
    }

    saveStats(stats);
  }, [user]);

  const getAnalyticsData = useCallback(() => {
    const stats = getStats();
    return {
      totalVisits: stats.totalVisits,
      uniqueUsers: stats.uniqueUsers.size,
      pageViews: { ...stats.pageViews },
      buttonClicks: { ...stats.buttonClicks },
      recentEvents: stats.events.slice(-20),
    };
  }, []);

  return {
    trackPageView,
    trackButtonClick,
    getAnalyticsData,
  };
}
