import axios from "axios";
import { Student, PaginatedStudentList } from "../Models/Student";
import { handleError } from "../Helpers/ErrorHandler";
import config from "./../config";

export const addStudentAPI = async (student: Student) => {
  try {
    const data = await axios.post<Student>(`${config.APIBaseUrl}student`, student);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllStudentAPI = async (page: number, rowsPerPage: number) => {
  try {
    const response = await axios.get<PaginatedStudentList>(`${config.APIBaseUrl}student/all?pagenumber=${page}&pagesize=${rowsPerPage}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
