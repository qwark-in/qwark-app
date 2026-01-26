import { FinancialProfileState } from "data/models/financial-profile";
import { UserState } from "data/models/user";

// Get User
export type GetUserResponse = UserState;
export type GetFinProfileResponse = FinancialProfileState;

// Create User
export type CreateUserQueryBody = UserState;
export type CreateUserResponse = UserState;

// Update User
export type UpdateUserQueryBody = Partial<UserState>;
export type UpdateUserResponse = UserState;
export type UpdateFinProfileQueryBody = Pick<FinancialProfileState, "consents">;
export type UpdateFinProfileResponse = any;
