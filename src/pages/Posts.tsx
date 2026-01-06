import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useAnalytics } from '../hooks/useAnalytics';
import { featuredPosts } from '../data/posts';

export function Posts() {
  const navigate = useNavigate();
  const { openLink, hapticFeedback, showBackButton, hideBackButton } = useTelegram();
  const { trackPageView, trackButtonClick } = useAnalytics();

  useEffect(() => {
    trackPageView('posts');
    showBackButton(() => {
      navigate('/');
    });

    return () => {
      hideBackButton();
    };
  }, [trackPageView, showBackButton, hideBackButton, navigate]);

  const handlePostClick = (post: typeof featuredPosts[0]) => {
    hapticFeedback('light');
    trackButtonClick('open_post', { postId: post.id, title: post.title });
    openLink(post.link);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="tg-card tg-card-hero text-center mb-5 animate-initial animate-scale-in">
          <div className="hero-icon" style={{ background: 'linear-gradient(135deg, #ffcc00 0%, #ff9500 100%)' }}>
            <span>⭐</span>
          </div>
          <h1 className="hero-title">Избранные посты</h1>
          <p className="hero-subtitle">Лучший контент канала</p>
        </div>

        {/* Posts Count Badge */}
        <div className="flex justify-center animate-initial animate-fade-in stagger-2" style={{ marginBottom: '10px' }}>
          <span className="tag tag-accent">
            {featuredPosts.length} постов
          </span>
        </div>

        {/* Posts Grid */}
        <div className="space-y-0">
          {featuredPosts.map((post, index) => (
            <button
              key={post.id}
              onClick={() => handlePostClick(post)}
              className={`post-card animate-initial animate-fade-in-up`}
              style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
            >
              <div className="post-emoji">
                {post.emoji}
              </div>
              <div className="post-content">
                {post.date && (
                  <p className="post-date">{post.date}</p>
                )}
                <h3 className="post-title">
                  {post.title}
                </h3>
                <p className="post-description">
                  {post.description}
                </p>
              </div>
              <span className="post-arrow">↗</span>
            </button>
          ))}
        </div>

        {/* Footer message */}
        <p 
          className="text-center tg-hint text-xs mt-6 animate-initial animate-fade-in"
          style={{ animationDelay: '400ms', opacity: 0.6 }}
        >
          Нажмите на пост, чтобы открыть в Telegram
        </p>
      </div>
    </div>
  );
}
