import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { Teacher } from "../Models/Teacher";
import config from "./../config";


export const getAllTeacherAPI = async () => {
  try {
    const response = await axios.get<Teacher[]>(`${config.APIBaseUrl}teacher/all`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
