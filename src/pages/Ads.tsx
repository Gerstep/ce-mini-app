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
        <div className="tg-card text-center mb-4">
          <div className="text-4xl mb-2">📢</div>
          <h1 className="text-xl font-bold">Реклама в канале</h1>
          <p className="tg-hint text-sm mt-1">e/acc • @cryptoessay</p>
        </div>

        {/* Pricing Cards */}
        <p className="tg-section-header">Тарифы</p>

        {adPricing.map((option) => (
          <div
            key={option.id}
            className="tg-card"
            style={option.highlight ? {
              border: '2px solid var(--tg-theme-button-color)',
              boxShadow: '0 0 0 3px var(--tg-theme-secondary-bg-color), 0 0 0 5px var(--tg-theme-button-color)'
            } : {}}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{option.title}</h3>
                {option.highlight && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{
                    backgroundColor: 'var(--tg-theme-button-color)',
                    color: 'var(--tg-theme-button-text-color)'
                  }}>
                    Рекомендуем
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-xl font-bold tg-accent">{option.price}</span>
                {option.priceNote && (
                  <span className="text-sm tg-hint ml-1">{option.priceNote}</span>
                )}
              </div>
            </div>
            <p className="tg-hint text-sm mb-3">{option.description}</p>
            <ul className="space-y-1.5">
              {option.features.map((feature, idx) => (
                <li key={idx} className="text-sm flex items-center gap-2">
                  <span className="tg-accent">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Conditions */}
        <p className="tg-section-header mt-4">Условия</p>

        {adConditions.map((condition, idx) => (
          <div key={idx} className="tg-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{condition.icon}</span>
              <h3 className="font-semibold">{condition.title}</h3>
            </div>
            <ul className="space-y-1">
              {condition.items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-sm tg-hint flex items-center gap-2">
                  <span>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* CTA Button */}
        <div className="mt-6 px-4">
          <button
            onClick={handleOrderClick}
            className="tg-button text-lg"
          >
            Заказать рекламу
          </button>
          <p className="text-center tg-hint text-xs mt-3">
            Откроется диалог с @sgershuni
          </p>
        </div>
      </div>
    </div>
  );
}
