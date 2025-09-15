export interface Post {
  id: number;
  author: string;
  email: string;
  content: string;
  timestamp: string;   // ISO string
  avatarUrl?: string;
}

export interface User {
  email: string;
  password: string;
}

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface AuthModalProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onClose: () => void;
}

export interface PostComponentProps {
  post: Post;
  currentUserEmail: string | null;
  onInteract: () => void
}

export interface FeedPageProps {
  isAuthenticated: boolean;
  currentUserEmail: string | null;
  onLogout: () => void;
}

export interface SignInPageProps {
  onAuthSuccess: (email: string) => void;
  isModal?: boolean;
  switchToSignUp?: () => void; 
}

export interface SignUpPageProps {
  onAuthSuccess: (email: string) => void;
  isModal?: boolean;
  switchToSignIn?: () => void; 
}

export interface PostEditorProps {
  onPublish: (content: string) => void;
  isAuthenticated: boolean;
}

export interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}