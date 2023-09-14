// Component Types
interface Modal {
  text: string;
  type: "Success" | "Error" | "Warning" | "Info";
}

interface PostCardProps {
  id: number;
  author?: string;
  content?: string;
  user_id?: number;
  title?: string;
  number_of_comments?: number;
  photo_cover_url?: string;
  category?: string;
  created_at: string;
  updated_at?: string;
}

interface News extends PostCardProps {}

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
  role: string;
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
}

interface Comment {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  blog_id: number;
  first_name?: string;
}

interface Friend {
  user_id: number;
  friend_id: number;
  created_at: string;
  updated_at: string;
  friend_name?: string;
  status: "pending" | "accepted" | "blocked";
}

interface Chat_Message {
  message_id: number;
  from_user_id: number;
  to_user_id: number;
  message: string;
  timestamp: Date;
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

// Context Types
interface AuthContextTypes {
  loading: boolean;
  register: (inputs: RequestInit) => Promise<any>;
  login?: (inputs: RequestInit) => Promise<any>;
  logout?: () => void;
}

interface RegisterRequest extends RegisterInputs {}
interface PostRequest extends PostCardProps {}
