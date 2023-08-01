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
export type CreateSubject = {
  subject_id: String;
  thumbnail?: string;
  title: string;
  description: string;
  number_of_credits: number;
  prerequisite_subject_id?: string;
  price: number;
};
