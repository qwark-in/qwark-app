// userMockApis.ts
import { AuthDataType } from "data/models/auth";
import {
  GetUserResponse,
  CreateUserQueryBody,
  CreateUserResponse,
  UpdateUserQueryBody,
  UpdateUserResponse,
} from "./types";

// ---- Mock Data ----
const mockUser: GetUserResponse = {
  user_id: "cbb25c27-b0dc-49c7-bbeb-54f741975a44",
  name: {
    first: "",
    middle: "",
    last: "",
  },
  joining_time: new Date().toISOString(),
  dob: "1997-06-15T00:00:00.000Z",
  pan: "EEJPM4774J",
  phone: "9737927175",
  email: "harsh.mock@example.com",
  marital_status: "SINGLE",
  gender: "MALE",
};

// Simulate latency
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ---- Mock API functions ----

// Get User
export const getUserMock = async (
  authData: AuthDataType
): Promise<{ data: GetUserResponse }> => {
  await delay(300);
  console.log("✅ [MOCK] Get User called");
  return { data: mockUser };
};

// Create User
export const createUserMock = async (
  data: CreateUserQueryBody,
  authData: AuthDataType
): Promise<{ data: CreateUserResponse }> => {
  await delay(300);
  console.log("✅ [MOCK] Create User called with:", data);

  // Overwrite mock user
  const newMockUser = {
    ...mockUser,
    ...data,
  };

  console.log("New Mock User", newMockUser);

  return { data: newMockUser };
};

// Update User
export const updateUserMock = async (
  data: UpdateUserQueryBody,
  authData: AuthDataType
): Promise<{ data: UpdateUserResponse }> => {
  await delay(300);
  console.log("✅ [MOCK] Update User called with:", data);

  // Update existing fields
  const newMockUser = {
    ...mockUser,
    ...data,
  };

  return { data: newMockUser };
};
