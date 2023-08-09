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

interface Quote {
  id: number;
  quote: string;
  author: string;
}
