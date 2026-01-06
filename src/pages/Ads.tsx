import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useAnalytics } from '../hooks/useAnalytics';
import { adPricing, adConditions } from '../data/pricing';

export function Ads() {
  const navigate = useNavigate();
  const { openTelegramLink, hapticFeedback, showBackButton, hideBackButton } = useTelegram();
  const { trackPageView, trackButtonClick } = useAnalytics();

  useEffect(() => {
    trackPageView('ads');
    showBackButton(() => {
      navigate('/');
    });

    return () => {
      hideBackButton();
    };
  }, [trackPageView, showBackButton, hideBackButton, navigate]);

  const handleOrderClick = () => {
    hapticFeedback('medium');
    trackButtonClick('order_ads');
    openTelegramLink('https://t.me/sgershuni');
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="tg-card tg-card-hero text-center mb-5 animate-initial animate-scale-in">
          <div className="hero-icon" style={{ background: 'linear-gradient(135deg, #ff9500 0%, #ff6b00 100%)' }}>
            <span>📢</span>
          </div>
          <h1 className="hero-title">Реклама</h1>
          <p className="hero-subtitle">Размещение в канале @cryptoessay</p>
        </div>

        {/* Pricing Cards */}
        <p className="tg-section-header animate-initial animate-fade-in stagger-2">
          Тарифы
        </p>

        {adPricing.map((option, index) => (
          <div
            key={option.id}
            className={`pricing-card ${option.highlight ? 'pricing-card-featured' : ''} animate-initial animate-fade-in-up stagger-${index + 3}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{option.title}</h3>
                {option.highlight && (
                  <span className="pricing-badge">
                    Рекомендуем
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="pricing-price tg-accent">{option.price}</span>
                {option.priceNote && (
                  <span className="text-sm tg-hint ml-1">{option.priceNote}</span>
                )}
              </div>
            </div>
            
            <p className="tg-hint text-sm mb-4 leading-relaxed">{option.description}</p>
            
            <div className="space-y-1">
              {option.features.map((feature, idx) => (
                <div key={idx} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span className="flex-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Conditions */}
        <p className="tg-section-header mt-5 animate-initial animate-fade-in stagger-4">
          Условия
        </p>

        <div className="space-y-3">
          {adConditions.map((condition, idx) => (
            <div key={idx} className={`tg-card animate-initial animate-fade-in-up stagger-${idx + 5}`}>
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: 'var(--tg-theme-secondary-bg-color)' }}
                >
                  {condition.icon}
                </div>
                <h3 className="font-semibold text-base">{condition.title}</h3>
              </div>
              <ul className="space-y-2 pl-13">
                {condition.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-sm tg-hint flex items-start gap-2.5">
                    <span className="opacity-40 mt-0.5">•</span>
                    <span className="flex-1 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="cta-container animate-initial animate-slide-up stagger-8">
          <button
            onClick={handleOrderClick}
            className="tg-button"
          >
            Заказать рекламу
          </button>
          <p className="text-center tg-hint text-xs mt-3 opacity-70">
            Откроется диалог с @sgershuni
          </p>
        </div>
      </div>
    </div>
  );
}
