export interface Post {
    title: string;
    content: string;
  }
  export interface PostID extends Post {
    id: string;
  }