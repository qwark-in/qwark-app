import axios, { AxiosError } from 'axios';
import { BASE_URL } from './constants';
import { CreateUserQueryBody, CreateUserResponse } from './types';
import { AuthDataType } from '@/data/stores/auth-store';

export const createUser = async (data: CreateUserQueryBody, authData: AuthDataType) => {
  try {
    const response = await axios.post<CreateUserResponse>(`${BASE_URL}`, data, {
      headers: {
        Token: JSON.stringify(authData),
      },
    });

    console.log('✅ Create User Response status:', response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error('❌ Create User Axios Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Create user failed: ${
          error.response?.data?.message || error.response?.statusText || error.message
        }`
      );
    } else {
      console.error('❌ Unexpected Error:', err);
      throw new Error('An unexpected error occurred while creating the user.');
    }
  }
};
