import axios from "axios";
import SHA256 from "crypto-js/sha256";
import { baseUrl, LaunchPad, Rocket } from "./util";

export const getAllLaunchpads = async (): Promise<LaunchPad[]> =>
  (await axios.get(`${baseUrl}/launchpads`)).data;

export const getOneLaunchpad = async (id: string): Promise<LaunchPad> =>
  (await axios.get(`${baseUrl}/launchpads/${id}`)).data;

export const getRocketsByIds = async (ids: string[]): Promise<Rocket[]> =>
  await Promise.all(
    ids.map(async (id) => (await axios.get(`${baseUrl}/rockets/${id}`)).data)
  );

export const formatTimeZone = (timeZone: string) => timeZone.replace(/_/g, " ");

export const getHashedPassword = (password: string) =>
  SHA256(password).toString();

export const isValidPassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return minLength && hasUppercase && hasLowercase && hasNumber && hasSymbol;
};
