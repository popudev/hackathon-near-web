export type Major = {
  major_id?: string;
  thumbnail?: string;
  name: string;
  description: string;
  number_of_credits_required: number;
  number_students_register?: number;
  created_at?: number;
  updated_at?: number;
};

export type Subject = {
  subject_id: string;
  instructor_id: string;
  prerequisite_subject_id?: string;
  thumbnail?: string;
  title: string;
  description: string;
  number_of_credits: number;
  price: number;
  number_students_studying: number;
  created_at: number;
  updated_at: number;
};

export type Score = {
  score_id: string;
  subject_id: string;
  student_id: string;
  instructor_id: string;
  score: number;
  created_at: number;
  updated_at: number;
};

export enum RoleType {
  ADMIN = "Admin",
  STUDENT = "Student",
  INSTRUCTOR = "Instructor",
}
export type CreateMajor = {
  thumbnail: string;
  name: string;
  description: string;
  number_of_credits_required: number;
};
