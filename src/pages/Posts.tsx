import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useAnalytics } from '../hooks/useAnalytics';
import { featuredPosts, categories } from '../data/posts';

export function Posts() {
  const navigate = useNavigate();
  const { openLink, hapticFeedback, showBackButton, hideBackButton } = useTelegram();
  const { trackPageView, trackButtonClick } = useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    trackPageView('posts');
    showBackButton(() => {
      navigate('/');
    });

    return () => {
      hideBackButton();
    };
  }, [trackPageView, showBackButton, hideBackButton, navigate]);

  const filteredPosts = selectedCategory === 'all'
    ? featuredPosts
    : featuredPosts.filter(post => post.category === selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    hapticFeedback('light');
    trackButtonClick('filter_category', { category: categoryId });
    setSelectedCategory(categoryId);
  };

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

        {/* Category Filter */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 px-1 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                  transition-all duration-200
                `}
                style={{
                  backgroundColor: selectedCategory === category.id
                    ? 'var(--tg-theme-button-color)'
                    : 'var(--tg-theme-bg-color)',
                  color: selectedCategory === category.id
                    ? 'var(--tg-theme-button-text-color)'
                    : 'var(--tg-theme-text-color)',
                }}
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="tg-card w-full text-left active:opacity-80 transition-opacity"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{post.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}
                    >
                      {post.category}
                    </span>
                  </div>
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

        {filteredPosts.length === 0 && (
          <div className="tg-card text-center py-8">
            <p className="tg-hint">Постов в этой категории пока нет</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 tg-card text-center">
          <p className="text-sm tg-hint">
            Показано <span className="font-semibold">{filteredPosts.length}</span> из{' '}
            <span className="font-semibold">{featuredPosts.length}</span> постов
          </p>
        </div>
      </div>
    </div>
  );
}
