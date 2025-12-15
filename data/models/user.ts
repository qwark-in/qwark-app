export type MaritalStatus = 'SINGLE' | 'MARRIED' | 'DIVORCEE' | 'PreferNotToSay';
export type Gender = 'MALE' | 'FEMALE' | 'SomeGender';
export type Name = {
  first: string;
  middle: string;
  last: string;
};

export type UserState = {
  user_id: string;
  dob: string; // ISO string
  email: string;
  gender: Gender | null;
  joining_time: string; // ISO string
  marital_status: MaritalStatus | null;
  name: Name;
  pan: string;
  phone: string;
};

export type UserActions = {
  setState: (newState: Partial<UserState>) => void;
  resetUser: () => void;
};
