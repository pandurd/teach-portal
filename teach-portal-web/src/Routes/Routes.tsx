import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import StudentPage from "../Pages/StudentPage/StudentPage";
import TeacherPage from "../Pages/TeacherPage/TeacherPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "students",
        element: (
          <ProtectedRoute>
            <StudentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "teachers",
        element: (
          <ProtectedRoute>
            <TeacherPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
