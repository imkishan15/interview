import axios from "axios";
import { baseUrl } from "./util";
import { notifications } from "@mantine/notifications";

export const getAllLaunchpads = async () =>
  await axios.get(`${baseUrl}/launchpads`);

export const getOneLaunchpad = async (id: string) =>
  await axios.get(`${baseUrl}/launchpads/${id}`);

export const formatTimeZone = (timeZone: string) => timeZone.replace(/_/g, " ");
