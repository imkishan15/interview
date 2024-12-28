import axios from "axios";
import SHA256 from 'crypto-js/sha256';
import { baseUrl, LaunchPad, Rocket } from "./util";

export const getAllLaunchpads = async (): Promise<LaunchPad[]> =>
  (await axios.get(`${baseUrl}/launchpads`)).data;

export const getOneLaunchpad = async (id: string): Promise<LaunchPad> =>
  (await axios.get(`${baseUrl}/launchpads/${id}`)).data;

export const getOneRocket = async (id: string) =>
  (await axios.get(`${baseUrl}/rockets/${id}`)).data;

export const getRocjketsByIds = async (ids: string[]) =>
  await Promise.all(ids.map((id) => getOneRocket(id)));

export const getRocketsByIds = async (ids: string[]): Promise<Rocket[]> =>
  await Promise.all(
    ids.map(async (id) => (await axios.get(`${baseUrl}/rockets/${id}`)).data)
  );

export const formatTimeZone = (timeZone: string) => timeZone.replace(/_/g, " ");

export const getHashedPassword = (password: string) => SHA256(password).toString();
