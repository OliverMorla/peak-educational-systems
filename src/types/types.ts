interface Modal {
  text: string;
  type: "Success" | "Error" | "Warning" | "Info";
}

interface News {
  id: number;
  title: string;
  author: string;
  comments: number;
  photo_cover: string;
}

interface Blogs {
  id: number;
  title: string;
  author: string;
  comments: number;
  photo_cover: string;
}

interface User {
  id: number;
  name: string;
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

interface CurrentUser {
  id: number;
  name: string;
  email: string;
}

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface RegisterInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
  date_of_birth: string;
  title: string;
  emp_type: "" | "private" | "public" | "home" | "other";
  emp_region: "" | "nyc" | "nassau" | "suffolk";
  school_type: "" | "private" | "public" | "home" | "other";
  school_region: "" | "nyc" | "nassau" | "suffolk";
}

interface RegisterRequest extends RegisterInputs {

}

interface AuthContextTypes {
  user: string | undefined;
  register: (inputs: any) => Promise<any>;
}
