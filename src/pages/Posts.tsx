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
        <div className="tg-card text-center mb-4">
          <div className="text-4xl mb-2">⭐</div>
          <h1 className="text-xl font-bold">Избранные посты</h1>
          <p className="tg-hint text-sm mt-1">Лучший контент канала</p>
        </div>

        {/* Posts Grid */}
        <div className="space-y-3">
          {featuredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="tg-card w-full text-left active:opacity-80 transition-opacity"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{post.emoji}</span>
                <div className="flex-1 min-w-0">
                  {post.date && (
                    <p className="text-xs tg-hint mb-1">{post.date}</p>
                  )}
                  <h3 className="font-semibold text-base mb-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="tg-hint text-sm line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <span className="tg-hint text-lg">↗</span>
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 tg-card text-center">
          <p className="text-sm tg-hint">
            Всего <span className="font-semibold">{featuredPosts.length}</span> постов
          </p>
        </div>
      </div>
    </div>
  );
}
