export type DayNightMode = 'day' | 'night';

export interface DisneyCharacter {
  id: string;
  name: string;
  movie: string;
  era: string;
  quote: string;
  dialogues: string[];
  color: string;
  accentColor: string;
  avatarSvg: string; // custom SVG or icon key
  actionName: string;
  role: string;
  description: string;
  funFact: string;
}

export interface DisneyMovie {
  id: string;
  title: string;
  year: number;
  era: 'Renaissance (90s)' | 'Golden Age' | 'Silver Age' | 'Bronze Age' | 'Post-Renaissance' | 'Revival Modern';
  director: string;
  composer: string;
  synopsis: string;
  boxOffice: string;
  oscars: string;
  poster: string;
  vhsCover: string;
  bannerImage: string;
  themeColor: string;
  songs: { title: string; singer: string; duration: string }[];
  trivia: string[];
  rating: number;
  featuredQuote: string;
}

export interface DisneyFact {
  id: string;
  category: 'Hidden Mickeys' | '90s Renaissance' | 'Animation Secrets' | 'Theme Parks' | 'Voice Legends';
  title: string;
  fact: string;
  iconName: string;
  tag: string;
  yearHint?: string;
  verified: boolean;
}

export interface DisneyNewsUpdate {
  id: string;
  title: string;
  category: 'Theme Parks' | 'Studio Vault' | 'New Releases' | 'Merch Drop';
  date: string;
  snippet: string;
  readTime: string;
  badge: string;
  imageUrl: string;
  source: string;
}

export interface DisneyHistoryMilestone {
  id: string;
  year: number;
  decade: '1920s-1940s' | '1950s-1970s' | '1980s-1990s' | '2000s-Present';
  title: string;
  description: string;
  significance: string;
  image: string;
  isRenaissanceHighlight?: boolean;
}

export interface DisneyMerchItem {
  id: string;
  name: string;
  category: 'VHS Vault' | 'Vintage Apparel' | 'Collectibles' | 'Plush & Toys' | 'Accessories';
  price: number;
  originalYear: string;
  image: string;
  description: string;
  badge: string;
  condition: 'Mint in Box' | 'Vintage 90s Collector' | 'Official Replica';
  stock: number;
  rating: number;
}

export interface CartItem {
  merch: DisneyMerchItem;
  quantity: number;
}
