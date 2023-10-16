// Component Prop Types
interface ModalProps {
  text: string;
  type: "Success" | "Error" | "Warning" | "Info";
}

interface NewsCardProps {
  id: number;
  author?: string;
  title: string;
  number_of_comments?: number;
  photo_cover_url?: string;
  category: string;
  created_at: string;
  updated_at: string;
  views?: number;

  users?: {
    first_name: string;
    last_name: string;
  };

  _count?: {
    comments: number;
  };
}

interface MessageDataProps {
  from_user_id: number;
  sender_name: string | null | undefined;
  to_user_id: number;
  message_text: string;
}

interface News {
  id: number;
  author?: string;
  content: string;
  user_id?: number;
  title: string;
  number_of_comments?: number;
  photo_cover_url: string;
  category: string;
  created_at: string;
  updated_at: string;
  views?: number;

  users?: {
    first_name: string;
    last_name: string;
  };

  _count?: {
    comments: number;
  };
}

// API Response Types
interface Category {
  id: number;
  category: string;
  _count: {
    category: string;
  };
}

interface User {
  id: number;
  name?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: string;
  title: string;
  employment_type: string;
  employment_region: string;
  child_grade_level: string;
  school_type: string;
  school_region: string;
  created_at: string;
  avatar_url: string;
  role: string;
}

interface UserProfile {
  name?: string;
  first_name: string;
  last_name: string;
  role: string;
  employment_type: string;
  employment_region: string;
  child_grade_level: string;
  school_type: string;
  school_region: string;
  created_at: string;
}

interface Blog {
  blog_id: number;
  author: string;
  content: string;
  user_id: number;
  title: string;
  photo_cover_url: string;
  category: string;
  created_at: string;
  updated_at: string;
  number_of_comments?: number;
}

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface Article {
  article_id?: number;
  user_id?: number;
  article_author?: string;
  article_title?: string;
  article_content?: string;
  photo_cover_url?: string;
  article_category?: string;
  article_created_at?: string | any;
  article_updated_at?: string;
  users?: {
    first_name: string;
    last_name: string;
  };
}

interface Comment {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  blog_id?: number;
  news_id?: number;
  first_name?: string;
}

interface Friend {
  user_id: number;
  friend_id: number;
  created_at: string;
  updated_at: string;
  friend_name?: string;
  user_name?: string;
  user_profile_photo?: string;
  friend_profile_photo?: string;
  status: "pending" | "accepted" | "blocked";
}

interface Chat_Message {
  message_id: number;
  from_user_id: number;
  to_user_id: number;
  message: string;
  timestamp: Date;
}

interface ChatHistoryMessages {
  from_user_id: number;
  to_user_id: number;
  message_id: number;
  message_text: string;
  sender_name: string;
  receiver_name: string;
  timestamp: Date | string;
}

interface Todo {
  todo_id: number;
  todo_text: string;
  todo_completed: boolean;
  user_id: number;
  user_name?: string;
  user_avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// For Admin Page
interface AdminResponse<T> {
  status: number;
  ok: boolean;
  data: T[];
}

type UsersAdminResponse = AdminResponse<User>;
type QuotesAdminResponse = AdminResponse<Quote>;
type NewsAdminResponse = AdminResponse<News>;
type BlogsAdminResponse = AdminResponse<Blog>;
type CommentsAdminResponse = AdminResponse<Comment>;
type FriendsAdminResponse = AdminResponse<Friend>;

// API Request Types
interface CommentsReponse {
  status: number;
  ok: boolean;
  comments: Comment[];
}

interface UserProfileResponse {
  status: number;
  ok: boolean;
  user: UserProfile;
}

interface ChatHistoryResponse {
  ok?: boolean;
  status?: number;
  chatHistory: ChatHistoryMessages[];
}

interface NewsCardResponse {
  status: number;
  ok: boolean;
  news: News[];
}

interface QuotesResponse {
  status: number;
  ok: boolean;
  quotes: Quote[];
}

// Dynamic Pages Params Types
type UserProfileParams = {
  user_id: string;
};

// NextAuth Types
interface TemporaryUser {
  id?: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  date_of_birth?: string;
  title?: string;
  employment_type?: string;
  employment_region?: string;
  child_grade_level?: string;
  school_type?: string;
  school_region?: string;
  created_at?: string;
  role?: string;
}

// Authentication Types
type EmploymentType =
  | "Freelance"
  | "Part-time"
  | "Full-time"
  | "Contract"
  | "Unemployed"
  | "Other"
  | null;
type SchoolType = "Private" | "Public" | "Home" | "Other" | null;
type Regions = "NYC" | "Nassau" | "Suffolk" | "Westchester" | "Other" | null;

interface RegisterInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
  date_of_birth: string;
  role: string;
  title: string;
  employment_type: EmploymentType;
  employment_region: Regions;
  school_type: SchoolType;
  school_region: Regions;
  child_grade_level: string;
}

interface LoginInputs {
  email: string;
  password: string;
}

interface BlogFormInputs {
  title: string;
  content: string;
  category: string;
  photo_cover_url: string;
  author: string;
  user_id: string;
}

interface SessionFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  reason: string;
}

interface TodoInputs {
  todo_id: string | number;
  todo_text: string;
  todo_completed: boolean;
  user_id: number;
  users?: {
    first_name: string;
    last_name: string;
  };
  created_at: Date | string;
  updated_at: Date | string;
}

interface TodoReducerActionType {
  type: string;
  payload: any;
}

// Context Types
interface AuthContextTypes {
  loading: boolean;
  register: (inputs: RequestInit) => Promise<any>;
  login?: (inputs: RequestInit) => Promise<any>;
  logout?: () => void;
}

interface RegisterRequest extends RegisterInputs {}
