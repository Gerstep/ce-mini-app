import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useAnalytics } from '../hooks/useAnalytics';

interface NavItem {
  path: string;
  buttonName: string;
  icon: string;
  iconStyle: string;
  title: string;
  subtitle: string;
}

const navItems: NavItem[] = [
  {
    path: '/ads',
    buttonName: 'nav_ads',
    icon: '📢',
    iconStyle: 'nav-item-icon-orange',
    title: 'Реклама',
    subtitle: 'Разместить рекламу в канале',
  },
  {
    path: '/faq',
    buttonName: 'nav_faq',
    icon: '❓',
    iconStyle: 'nav-item-icon-purple',
    title: 'FAQ',
    subtitle: 'Частые вопросы о канале',
  },
  {
    path: '/opportunities',
    buttonName: 'nav_opportunities',
    icon: '💼',
    iconStyle: 'nav-item-icon-blue',
    title: 'Возможности',
    subtitle: 'Консультации и сотрудничество',
  },
  {
    path: '/posts',
    buttonName: 'nav_posts',
    icon: '⭐',
    iconStyle: 'nav-item-icon-yellow',
    title: 'Избранные посты',
    subtitle: 'Лучший контент канала',
  },
];

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
        {/* Hero Header */}
        <div 
          className="tg-card tg-card-hero text-center mb-5 animate-initial animate-scale-in"
        >
          <div className="hero-icon hero-icon-accent">
            <span>🚀</span>
          </div>
          <h1 className="hero-title">e/acc</h1>
          <p className="hero-subtitle">@cryptoessay</p>
        </div>

        {/* Welcome Card */}
        <div 
          className="tg-card mb-5 animate-initial animate-fade-in-up stagger-2"
        >
          <p className="text-lg leading-relaxed">
            Привет, <span className="font-semibold tg-accent">{firstName}</span>! 👋
          </p>
          <p className="tg-hint text-sm mt-2 leading-relaxed">
            Мини-приложение канала о технологиях, AI и будущем
          </p>
        </div>

        {/* Navigation Section */}
        <p className="tg-section-header animate-initial animate-fade-in stagger-3">
          Навигация
        </p>

        <div className="space-y-0">
          {navItems.map((item, index) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path, item.buttonName)}
              className={`nav-item animate-initial animate-fade-in-up stagger-${index + 4}`}
            >
              <div className={`nav-item-icon ${item.iconStyle}`}>
                <span className="drop-shadow-sm">{item.icon}</span>
              </div>
              <div className="nav-item-content">
                <p className="nav-item-title">{item.title}</p>
                <p className="nav-item-subtitle">{item.subtitle}</p>
              </div>
              <span className="nav-item-chevron">›</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <p 
          className="text-center tg-hint text-xs mt-8 animate-initial animate-fade-in stagger-8"
          style={{ opacity: 0.6 }}
        >
          @sgershuni • @cyntro_py
        </p>
      </div>
    </div>
  );
}
