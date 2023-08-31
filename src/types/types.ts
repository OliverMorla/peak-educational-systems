interface Modal {
  text: string;
  type: "Success" | "Error" | "Warning" | "Info";
}

interface PostCardProps {
  id: number;
  title: string;
  author: string;
  author_id?: number;
  content?: string;
  number_of_comments?: number; //maybe not needed
  category: string;
  created_at: string;
  updated_at: string;
  photo_cover_url: string;
}

interface News extends PostCardProps {}
interface Blog extends PostCardProps {}

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
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  date_of_birth: string;
  title: string;
  emp_type: string;
  emp_region: string;
  child_grade_level: string;
  school_type: string;
  school_region: string;
  created_at: string;
}

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface Article {
  author_id?: number;
  author: string;
  title: string;
  content?: string;
  photo_cover_url: string;
  created_at: string;
  category: string;
  number_of_comments: any;
  article_id?: number;
}

interface Comment {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  blog_id: number;
}

// For Admin Page
interface UserAdminReq {
  status: number;
  ok: boolean;
  users: User[];
}

interface QuoteAdminReq {
  status: number;
  ok: boolean;
  quotes: Quote[];
}

interface NewsAdminReq {
  status: number;
  ok: boolean;
  news: News[];
}

interface BlogsAdminReq {
  status: number;
  ok: boolean;
  news: Blog[];
}

interface CommentAdminReq {
  status: number;
  ok: boolean;
  comments: Comment[];
}

type empl = "private" | "public" | "home" | "other" | "";
type regions = "nyc" | "nassau" | "suffolk" | "";

interface RegisterInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
  date_of_birth: string;
  title: string;
  emp_type: empl;
  emp_region: regions;
  school_type: empl;
  school_region: regions;
  child_grade_level: string;
}

interface LoginInputs {
  email: string;
  password: string;
}

interface AuthContextTypes {
  loading: boolean;
  register: (inputs: RequestInit) => Promise<any>;
  login?: (inputs: RequestInit) => Promise<any>;
  logout?: () => void;
}

interface RegisterRequest extends RegisterInputs {}
interface PostRequest extends PostCardProps {}
