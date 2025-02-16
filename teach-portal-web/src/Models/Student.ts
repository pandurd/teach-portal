export type Student = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type PaginatedStudentList = {
  items: Student[],
  totalPages: number
}