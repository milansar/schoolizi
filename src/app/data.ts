export interface Post {
    title: string;
    content: string;
    url:String;
  }
  export interface PostID extends Post {
    id: string;
  }