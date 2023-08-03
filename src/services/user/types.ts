export type CreateUserDto = {
  user_id: string;
  full_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  national_identity_card: string;
  national_identity_card_date: string;
};

export interface Instructor {
  user_id: string;
  username: string;
  avatar: string;
  active: boolean;
  full_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  national_identity_card: string;
  national_identity_card_date: string;
  total_credit: number;
  balance: number;
  created_at: number;
  updated_at: number;
}
