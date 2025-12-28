export type NavigationIntent = 'experience' | 'projects' | 'contact' | 'about' | 'home' | 'none';

export interface SearchResult {
  id: string;
  type: 'navigation' | 'project' | 'experience' | 'action';
  title: string;
  subtitle: string;
  url: string;
  icon?: React.ReactNode;
  shortcut?: string;
}

export interface AISearchResponse {
  intent: NavigationIntent;
  confidence: number;
  reasoning: string;
  suggestedResults?: SearchResult[];
}
