import axios from "axios";
import { baseUrl } from "./util";
import { notifications } from "@mantine/notifications";

export const getAllLaunchpads = async () =>
  await axios.get(`${baseUrl}/launchpads`);

export const getOneLaunchpad = async (id: string) =>
  await axios.get(`${baseUrl}/launchpads/${id}`);

export const showError = (message: string) => {
  notifications.show({
    title: "Error",
    message: message,
    autoClose: false,
  });
};
