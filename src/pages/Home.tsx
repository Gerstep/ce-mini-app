import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useAnalytics } from '../hooks/useAnalytics';

export function Home() {
  const navigate = useNavigate();
  const { user, hapticFeedback, hideBackButton } = useTelegram();
  const { trackPageView, trackButtonClick } = useAnalytics();

  useEffect(() => {
    trackPageView('home');
    hideBackButton();
  }, [trackPageView, hideBackButton]);

  const handleNavigation = (path: string, buttonName: string) => {
    hapticFeedback('light');
    trackButtonClick(buttonName);
    navigate(path);
  };

  const firstName = user?.first_name || 'Гость';

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="tg-card text-center mb-6">
          <div className="text-5xl mb-3">🚀</div>
          <h1 className="text-2xl font-bold mb-1">cryptoEssay</h1>
          <p className="tg-hint text-sm">e/acc • AI • Web3</p>
        </div>

        {/* Welcome */}
        <div className="tg-card mb-6">
          <p className="text-lg">
            Привет, <span className="font-semibold tg-accent">{firstName}</span>! 👋
          </p>
          <p className="tg-hint text-sm mt-2">
            Добро пожаловать в мини-приложение канала о будущем технологий
          </p>
        </div>

        {/* Navigation */}
        <p className="tg-section-header">Навигация</p>

        <div className="space-y-3">
          <button
            onClick={() => handleNavigation('/ads', 'nav_ads')}
            className="tg-card w-full text-left flex items-center gap-4 active:opacity-80 transition-opacity"
          >
            <span className="text-3xl">📢</span>
            <div className="flex-1">
              <p className="font-semibold">Реклама</p>
              <p className="tg-hint text-sm">Разместить рекламу в канале</p>
            </div>
            <span className="tg-hint">›</span>
          </button>

          <button
            onClick={() => handleNavigation('/faq', 'nav_faq')}
            className="tg-card w-full text-left flex items-center gap-4 active:opacity-80 transition-opacity"
          >
            <span className="text-3xl">❓</span>
            <div className="flex-1">
              <p className="font-semibold">FAQ</p>
              <p className="tg-hint text-sm">Частые вопросы о канале</p>
            </div>
            <span className="tg-hint">›</span>
          </button>

          <button
            onClick={() => handleNavigation('/opportunities', 'nav_opportunities')}
            className="tg-card w-full text-left flex items-center gap-4 active:opacity-80 transition-opacity"
          >
            <span className="text-3xl">💼</span>
            <div className="flex-1">
              <p className="font-semibold">Возможности</p>
              <p className="tg-hint text-sm">Сотрудничество и консультации</p>
            </div>
            <span className="tg-hint">›</span>
          </button>

          <button
            onClick={() => handleNavigation('/posts', 'nav_posts')}
            className="tg-card w-full text-left flex items-center gap-4 active:opacity-80 transition-opacity"
          >
            <span className="text-3xl">⭐</span>
            <div className="flex-1">
              <p className="font-semibold">Избранные посты</p>
              <p className="tg-hint text-sm">Лучший контент канала</p>
            </div>
            <span className="tg-hint">›</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="tg-card text-center py-3">
            <p className="text-xl font-bold tg-accent">120K+</p>
            <p className="tg-hint text-xs">подписчиков</p>
          </div>
          <div className="tg-card text-center py-3">
            <p className="text-xl font-bold tg-accent">24</p>
            <p className="tg-hint text-xs">эпизода подкаста</p>
          </div>
          <div className="tg-card text-center py-3">
            <p className="text-xl font-bold tg-accent">2017</p>
            <p className="tg-hint text-xs">в Web3</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center tg-hint text-xs mt-6">
          Автор: @sgershuni • cyber•Fund
        </p>
      </div>
    </div>
  );
}
