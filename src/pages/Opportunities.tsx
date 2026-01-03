import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useAnalytics } from '../hooks/useAnalytics';
import { consultationPrice } from '../data/pricing';

interface OpportunityCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
  buttonText: string;
  buttonAction: 'contact' | 'pitch';
}

const opportunities: OpportunityCard[] = [
  {
    id: 'speaking',
    icon: '🎤',
    title: 'Выступления',
    description: 'Приглашаю выступить на конференциях и митапах',
    details: [
      'Web3 и AI Agents',
      'Self-Sovereign Identity',
      'DAO Governance',
      'e/acc философия',
    ],
    buttonText: 'Пригласить выступить',
    buttonAction: 'contact',
  },
  {
    id: 'podcast',
    icon: '🎙️',
    title: 'Подкасты и интервью',
    description: 'Открыт к записи подкастов и интервью',
    details: [
      'Технологические темы',
      'Криптоиндустрия',
      'AI и автоматизация',
      'Философия прогресса',
    ],
    buttonText: 'Записать подкаст',
    buttonAction: 'contact',
  },
  {
    id: 'consulting',
    icon: '💼',
    title: 'Консультации',
    description: `Персональные консультации — ${consultationPrice}`,
    details: [
      'Стратегия Web3 проекта',
      'Tokenomics review',
      'AI/ML архитектура',
      'DAO governance',
    ],
    buttonText: 'Забронировать',
    buttonAction: 'contact',
  },
  {
    id: 'pitch',
    icon: '🚀',
    title: 'Pitch проекта',
    description: 'Отправьте pitch deck для рассмотрения cyber•Fund',
    details: [
      'AI Agents',
      'Cybernetic economy',
      'Web3 Infrastructure',
      'Ранние стадии (Pre-seed, Seed)',
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
      speaking: 'Хочу пригласить вас выступить',
      podcast: 'Приглашаю на запись подкаста',
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
        <div className="tg-card text-center mb-4">
          <div className="text-4xl mb-2">💼</div>
          <h1 className="text-xl font-bold">Возможности</h1>
          <p className="tg-hint text-sm mt-1">Варианты сотрудничества</p>
        </div>

        {/* Opportunity Cards */}
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="tg-card">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{opp.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{opp.title}</h3>
                  <p className="tg-hint text-sm">{opp.description}</p>
                </div>
              </div>

              <div className="mb-4 pl-12">
                <p className="text-xs tg-hint uppercase tracking-wide mb-2">Темы:</p>
                <div className="flex flex-wrap gap-2">
                  {opp.details.map((detail, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleAction(opp)}
                className="tg-button-secondary w-full"
              >
                {opp.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* cyber•Fund Info */}
        <p className="tg-section-header mt-6">О cyber•Fund</p>

        <div className="tg-card">
          <p className="text-sm leading-relaxed">
            cyber•Fund — венчурный фонд, инвестирующий в кибернетическую экономику.
            Мы поддерживаем founders на ранних стадиях, помогая строить будущее AI и Web3.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-lg">🌐</span>
            <a
              href="https://cyber.fund"
              className="tg-link text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              cyber.fund
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
