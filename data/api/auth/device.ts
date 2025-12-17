import axios from "axios";
import { API_BASE_URL } from "./constants";
import { DeviceResponse, TokenResponse } from "./types";

type RegisterDeviceParams = DeviceResponse;

export const registerDevice = async ({
  token,
  uuid,
  device,
}: RegisterDeviceParams): Promise<DeviceResponse> => {
  const url = new URL(`${API_BASE_URL}/device`);

  const { data } = await axios.post<DeviceResponse>(url.href, {
    token,
    uuid,
    device,
  });

  return data;
};
