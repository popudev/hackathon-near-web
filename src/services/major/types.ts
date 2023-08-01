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
export type CreateMajor = {
  thumbnail: string;
  name: string;
  description: string;
  number_of_credits_required: number;
};
