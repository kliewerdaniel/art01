export interface Task {
  id: number;
  title: string;
  description: string;
  assigned_to: number;
  assigned_to_username: string;
  assigned_by: number;
  assigned_by_username: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  due_date: string;
  created_at: string;
}

export interface Feedback {
  id: number;
  task: number;
  author: number;
  author_username: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'MENTOR' | 'PARTICIPANT' | 'ADMIN';
  bio: string;
  skills: string[];
  location: string;
  experience_years: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  owner: User;
  media_url: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SOLD';
  price: number;
  buyer?: User | null;
  created_at: string;
}
