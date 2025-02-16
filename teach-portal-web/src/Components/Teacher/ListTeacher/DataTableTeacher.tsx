import React, { useState, useEffect } from 'react';
import  { getAllTeacherAPI } from "./../../../Services/TeacherService"

type TeacherRecord = {
  firstName: string;
  lastName: string;
  email: string;
  studentCount: number;
};

// type SortConfig = {
//   key: keyof TeacherRecord | null;
//   direction: 'ascending' | 'descending';
// };

const DataTable: React.FC = () => {
  const [data, setData] = useState<TeacherRecord[]>([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    try {
      //TODO: sorting and search
      const response : any = await getAllTeacherAPI();
      setData(response.items);
      setTotalPages(Math.ceil(response.totalPages));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };


  const renderRows = data?.map((row, index) => (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">{row.firstName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{row.lastName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{row.studentCount}</td>
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
      {/* <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      /> */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              FirstName
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              LastName
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Students Count
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
