import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import config from "./../config";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(config.APIBaseUrl + "account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(config.APIBaseUrl + "account/register", {
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
