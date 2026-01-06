import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useAnalytics } from '../hooks/useAnalytics';
import { consultationPrice } from '../data/pricing';

interface OpportunityCard {
  id: string;
  icon: string;
  iconStyle: string;
  title: string;
  description: string;
  details: string[];
  buttonText: string;
  buttonAction: 'contact' | 'pitch';
}

const opportunities: OpportunityCard[] = [
  {
    id: 'consulting',
    icon: '💼',
    iconStyle: 'linear-gradient(135deg, #007aff 0%, #0055d4 100%)',
    title: 'Консультации',
    description: `Персональные консультации — ${consultationPrice}`,
    details: [
      'Венчурные стартапы',
      'AI-продукты',
      'AI-нативные организации',
      'Агентские системы',
      'Футуризм',
      'Бизнес и продуктовая стратегия',
    ],
    buttonText: 'Забронировать',
    buttonAction: 'contact',
  },
  {
    id: 'pitch',
    icon: '🚀',
    iconStyle: 'linear-gradient(135deg, #34c759 0%, #28a745 100%)',
    title: 'Pitch проекта',
    description: 'Отправьте pitch deck для рассмотрения cyber•Fund',
    details: [
      'Инвестируем в AI, Web3 и робототехнику',
    ],
    buttonText: 'Отправить pitch',
    buttonAction: 'pitch',
  },
];

export function Opportunities() {
  const navigate = useNavigate();
  const { openTelegramLink, hapticFeedback, showBackButton, hideBackButton } = useTelegram();
  const { trackPageView, trackButtonClick } = useAnalytics();

  useEffect(() => {
    trackPageView('opportunities');
    showBackButton(() => {
      navigate('/');
    });

    return () => {
      hideBackButton();
    };
  }, [trackPageView, showBackButton, hideBackButton, navigate]);

  const handleAction = (opportunity: OpportunityCard) => {
    hapticFeedback('medium');
    trackButtonClick(`opportunity_${opportunity.id}`);

    const messages: Record<string, string> = {
      consulting: 'Хочу записаться на консультацию',
      pitch: 'Хочу отправить pitch deck проекта',
    };

    const message = encodeURIComponent(messages[opportunity.id] || 'Здравствуйте!');
    openTelegramLink(`https://t.me/sgershuni?text=${message}`);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="tg-card tg-card-hero text-center mb-5 animate-initial animate-scale-in">
          <div className="hero-icon" style={{ background: 'linear-gradient(135deg, #007aff 0%, #0055d4 100%)' }}>
            <span>💼</span>
          </div>
          <h1 className="hero-title">Возможности</h1>
          <p className="hero-subtitle">Варианты сотрудничества</p>
        </div>

        {/* Opportunity Cards */}
        <div className="space-y-4">
          {opportunities.map((opp, index) => (
            <div 
              key={opp.id} 
              className={`tg-card animate-initial animate-fade-in-up stagger-${index + 2}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: opp.iconStyle }}
                >
                  <span className="drop-shadow-sm">{opp.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{opp.title}</h3>
                  <p className="tg-hint text-sm leading-relaxed">{opp.description}</p>
                </div>
              </div>

              <div className="mb-4 pl-15" style={{ paddingLeft: '60px' }}>
                <p className="text-xs tg-hint uppercase tracking-wide mb-2 font-medium">Темы:</p>
                <div className="flex flex-wrap gap-2">
                  {opp.details.map((detail, idx) => (
                    <span
                      key={idx}
                      className="tag tag-sm"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleAction(opp)}
                className="tg-button-secondary"
              >
                {opp.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* cyber•Fund Info */}
        <p className="tg-section-header mt-6 animate-initial animate-fade-in stagger-4">
          О cyber•Fund
        </p>

        <div className="tg-card animate-initial animate-fade-in-up stagger-5">
          <p className="text-sm leading-relaxed mb-4">
            cyber•Fund — венчурный фонд, инвестирующий в кибернетическую экономику.
            Мы поддерживаем основателей на ранних стадиях, помогая строить будущее AI и Web3.
          </p>
          <a
            href="https://cyber.fund"
            className="flex items-center gap-3 tg-link text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--tg-theme-secondary-bg-color)' }}
            >
              🌐
            </div>
            <span>cyber.fund</span>
            <span className="opacity-40 ml-auto">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
