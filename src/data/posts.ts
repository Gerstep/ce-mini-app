export interface FeaturedPost {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  emoji: string;
  date?: string;
}

export const featuredPosts: FeaturedPost[] = [
  {
    id: '1',
    title: 'Web3 Agents: новый мета',
    description: 'Почему AI-агенты станут главным трендом десятилетия и как Web3 меняет правила игры',
    category: 'AI',
    link: 'https://cyber.fund/content/web3-agents',
    emoji: '🤖',
  },
  {
    id: '2',
    title: 'Zero-Knowledge Machine Learning',
    description: 'Как ZK-технологии позволяют верифицировать ML-модели без раскрытия данных',
    category: 'Криптография',
    link: 'https://t.me/cryptoEssay',
    emoji: '🔐',
  },
  {
    id: '3',
    title: 'Self-Sovereign Identity',
    description: 'Будущее цифровой идентичности: контроль данных возвращается пользователям',
    category: 'Identity',
    link: 'https://t.me/cryptoEssay',
    emoji: '🪪',
  },
  {
    id: '4',
    title: 'DAOs: организации будущего',
    description: 'Как децентрализованные автономные организации меняют корпоративное управление',
    category: 'DAO',
    link: 'https://t.me/cryptoEssay',
    emoji: '🏛️',
  },
  {
    id: '5',
    title: 'e/acc манифест',
    description: 'Effective Accelerationism: почему ускорение прогресса — это благо для человечества',
    category: 'Философия',
    link: 'https://t.me/cryptoEssay',
    emoji: '🚀',
  },
  {
    id: '6',
    title: 'Токеномика проектов',
    description: 'Разбор экономических моделей успешных Web3 проектов и типичных ошибок',
    category: 'Экономика',
    link: 'https://t.me/cryptoEssay',
    emoji: '📊',
  },
  {
    id: '7',
    title: 'AI для образования',
    description: 'Как искусственный интеллект трансформирует образовательный процесс',
    category: 'AI',
    link: 'https://t.me/cryptoEssay',
    emoji: '📚',
  },
  {
    id: '8',
    title: 'Credentia: SSI в образовании',
    description: 'История создания платформы для верификации образовательных документов',
    category: 'Проекты',
    link: 'https://t.me/cryptoEssay',
    emoji: '🎓',
  },
];

export const categories = [
  { id: 'all', name: 'Все', emoji: '📑' },
  { id: 'AI', name: 'AI', emoji: '🤖' },
  { id: 'Identity', name: 'Identity', emoji: '🪪' },
  { id: 'DAO', name: 'DAO', emoji: '🏛️' },
  { id: 'Криптография', name: 'Крипто', emoji: '🔐' },
  { id: 'Философия', name: 'Философия', emoji: '🚀' },
  { id: 'Проекты', name: 'Проекты', emoji: '🎓' },
];
