export interface Review {
  created_at: string | number | Date;
  rating_value: any;
  comment: string;
  id: number;
  user: User;
}

export interface User {
  firstname: string;
  lastname: string;
}
