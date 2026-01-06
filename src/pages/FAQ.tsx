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
        <div className="tg-card tg-card-hero text-center mb-5 animate-initial animate-scale-in">
          <div className="hero-icon" style={{ background: 'linear-gradient(135deg, #af52de 0%, #8944ab 100%)' }}>
            <span>❓</span>
          </div>
          <h1 className="hero-title">FAQ</h1>
          <p className="hero-subtitle">Ответы на частые вопросы</p>
        </div>

        {/* FAQ Sections */}
        {faqData.map((section, sectionIdx) => (
          <div key={sectionIdx} className={`animate-initial animate-fade-in-up stagger-${sectionIdx + 2}`}>
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
                    className="accordion-item"
                  >
                    <button
                      onClick={() => toggleItem(sectionIdx, itemIdx)}
                      className="accordion-trigger"
                    >
                      <span className="accordion-question">{item.question}</span>
                      <span className={`accordion-chevron ${isOpen ? 'accordion-chevron-open' : ''}`}>
                        ▼
                      </span>
                    </button>
                    
                    <div 
                      className="accordion-content"
                      style={{
                        maxHeight: isOpen ? '500px' : '0',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="accordion-answer">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Quick Links */}
        <p className="tg-section-header mt-5 animate-initial animate-fade-in stagger-4">
          Полезные ссылки
        </p>

        <div className="space-y-0">
          <button
            onClick={handlePodcastClick}
            className="nav-item animate-initial animate-fade-in-up stagger-5"
          >
            <div className="nav-item-icon nav-item-icon-red">
              <span>🎙️</span>
            </div>
            <div className="nav-item-content">
              <p className="nav-item-title">Подкаст cryptoEssay</p>
              <p className="nav-item-subtitle">24 эпизода о Web3 и AI</p>
            </div>
            <span className="nav-item-chevron">↗</span>
          </button>

          <button
            onClick={handleChannelClick}
            className="nav-item animate-initial animate-fade-in-up stagger-6"
          >
            <div className="nav-item-icon nav-item-icon-cyan">
              <span>📺</span>
            </div>
            <div className="nav-item-content">
              <p className="nav-item-title">Канал @cryptoEssay</p>
              <p className="nav-item-subtitle">Открыть в Telegram</p>
            </div>
            <span className="nav-item-chevron">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
}
