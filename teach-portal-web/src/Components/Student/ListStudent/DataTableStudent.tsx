import React, { useState, useEffect } from 'react';
import AddStudentModal from "./../AddStudent";
import  { addStudentAPI, getAllStudentAPI } from "./../../../Services/StudentService"
import { Student, PaginatedStudentList } from "../../../Models/Student";
import { toast } from "react-toastify";

// type SortConfig = {
//   key: keyof Student | null;
//   direction: 'ascending' | 'descending';
// };

const DataTable: React.FC = () => {
  const [data, setData] = useState<Student[]>([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 5;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  
  const fetchData = async (page: number) => {
    try {
      //TODO: sorting and desc
      const response : PaginatedStudentList | undefined = await getAllStudentAPI(page, rowsPerPage);

      if(response) {
        setData(response.items);
        setTotalPages(Math.ceil(response.totalPages));
      }
      
    } catch (error) {
      toast.warning("Service temporarily unavailable. Please try again later.");
      console.error("Error fetching data: ", error);
    }
  };

  const onStudentCreate = (student: Student) => {
    addStudentAPI(student)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Student added Successfully.");   
          fetchData(currentPage); 
          setModalIsOpen(false);   
        }
      })
      .catch((e) => {
        toast.warning("Student could not be added. Please try again.");
        setModalIsOpen(true);
      });
  };


  //TODO: search with debounce
  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  const renderRows = data?.map((row, index) => (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">{row.firstName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{row.lastName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
    </tr>
  ));

  const renderPageNumbers = [...Array(totalPages).keys()]?.map(number => (
    <button
      key={number + 1}
      onClick={() => setCurrentPage(number + 1)}
      className={`px-4 py-2 bg-gray-200 rounded mx-1 ${
        currentPage === number + 1 ? 'bg-gray-300' : ''
      }`}
    >
      {number + 1}
    </button>
  ));

  return (
    <div className="container mx-auto py-4">
      
      <div className="flex justify-end">
        {/* TODO Add global search */}
        {/* <div>
          <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border border-gray-300 rounded"
              />
        </div> */}
        <div className="flex ">
          <AddStudentModal onStudentCreate={onStudentCreate} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
        </div>
      </div>


      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              
            >
              FirstName
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              
            >
              LastName
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
             
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {renderRows}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {renderPageNumbers}
      </div>
    </div>
  );
};

export default DataTable;
