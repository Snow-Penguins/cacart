export interface Review {
  created_at: Date;
  rating_value: any;
  comment: string;
  id: number;
  user: User;
}

export interface User {
  firstname: string;
  lastname: string;
}
