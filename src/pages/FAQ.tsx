import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useAnalytics } from '../hooks/useAnalytics';
import { faqData, podcastLink, channelLink } from '../data/faq';

export function FAQ() {
  const navigate = useNavigate();
  const { openLink, hapticFeedback, showBackButton, hideBackButton } = useTelegram();
  const { trackPageView, trackButtonClick } = useAnalytics();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    trackPageView('faq');
    showBackButton(() => {
      navigate('/');
    });

    return () => {
      hideBackButton();
    };
  }, [trackPageView, showBackButton, hideBackButton, navigate]);

  const toggleItem = (sectionIdx: number, itemIdx: number) => {
    const key = `${sectionIdx}-${itemIdx}`;
    hapticFeedback('light');
    trackButtonClick('faq_toggle', { question: faqData[sectionIdx].items[itemIdx].question });
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePodcastClick = () => {
    hapticFeedback('light');
    trackButtonClick('open_podcast');
    openLink(podcastLink);
  };

  const handleChannelClick = () => {
    hapticFeedback('light');
    trackButtonClick('open_channel');
    openLink(channelLink);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="tg-card text-center mb-4">
          <div className="text-4xl mb-2">❓</div>
          <h1 className="text-xl font-bold">FAQ</h1>
          <p className="tg-hint text-sm mt-1">Ответы на частые вопросы</p>
        </div>

        {/* FAQ Sections */}
        {faqData.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <p className="tg-section-header flex items-center gap-2">
              <span>{section.icon}</span>
              {section.title}
            </p>

            <div className="tg-card">
              {section.items.map((item, itemIdx) => {
                const key = `${sectionIdx}-${itemIdx}`;
                const isOpen = openItems[key];

                return (
                  <div
                    key={itemIdx}
                    className={itemIdx !== section.items.length - 1 ? 'border-b pb-3 mb-3' : ''}
                    style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
                  >
                    <button
                      onClick={() => toggleItem(sectionIdx, itemIdx)}
                      className="w-full text-left flex justify-between items-start gap-2"
                    >
                      <span className="font-medium">{item.question}</span>
                      <span className={`tg-hint transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-sm tg-hint leading-relaxed">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Quick Links */}
        <p className="tg-section-header mt-4">Полезные ссылки</p>

        <div className="space-y-3">
          <button
            onClick={handlePodcastClick}
            className="tg-card w-full text-left flex items-center gap-4 active:opacity-80 transition-opacity"
          >
            <span className="text-3xl">🎙️</span>
            <div className="flex-1">
              <p className="font-semibold">Подкаст cryptoEssay</p>
              <p className="tg-hint text-sm">24 эпизода о Web3 и AI</p>
            </div>
            <span className="tg-hint">↗</span>
          </button>

          <button
            onClick={handleChannelClick}
            className="tg-card w-full text-left flex items-center gap-4 active:opacity-80 transition-opacity"
          >
            <span className="text-3xl">📺</span>
            <div className="flex-1">
              <p className="font-semibold">Канал @cryptoEssay</p>
              <p className="tg-hint text-sm">Открыть в Telegram</p>
            </div>
            <span className="tg-hint">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
}
