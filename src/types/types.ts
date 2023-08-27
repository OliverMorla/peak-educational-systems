interface Modal {
  text: string;
  type: "Success" | "Error" | "Warning" | "Info";
}

interface Post {
  id: number;
  title: string;
  author: string;
  author_id: number;
  content: string;
  comments: number;
  photo_cover_url: string;
}

interface News extends Post {}
interface Blog extends Post {}

interface User {
  id: number;
  name: string;
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
}

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

interface Quote {
  id: number;
  quote: string;
  author: string;
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

interface AuthContextTypes {
  loading: boolean;
  register: (inputs: RequestInit) => Promise<any>;
}

interface RegisterRequest extends RegisterInputs {}
interface QuoteRequest extends Quote {}
interface PostRequest extends Post {}
