import axios, { AxiosError } from 'axios';
import { FIN_PROFILE_BASE_URL } from './constants';
import { GetFinProfileResponse } from './types';
import { AuthDataType } from '@/data/stores/auth-store';

export const getFinProfile = async (authData: AuthDataType) => {
  try {
    const response = await axios.get<GetFinProfileResponse>(`${FIN_PROFILE_BASE_URL}`, {
      headers: {
        Token: JSON.stringify(authData),
      },
    });

    console.log('✅ Get Fin Profile Response status:', response.status);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<{ message?: string }>;

      console.error('❌ Get Fin Profile Axios Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        `Get Fin Profile failed: ${
          error.response?.data?.message || error.response?.statusText || error.message
        }`
      );
    } else {
      console.error('❌ Unexpected Error:', err);
      throw new Error('An unexpected error occurred while fetching the fin profile.');
    }
  }
};
