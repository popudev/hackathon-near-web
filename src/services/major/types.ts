export type Major = {
  major_id: string;
  thumbnail?: string;
  name: string;
  description: string;
  number_of_credits_required: number;
  number_students: number;
  created_at: number;
  updated_at: number;
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
  instuctor_id: string;
  score: number;
  created_at: number;
  updated_at: number;
};

export enum RoleType {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}
export type CreateMajor = {
  thumbnail: string;
  name: string;
  description: string;
  number_of_credits_required: number;
};
