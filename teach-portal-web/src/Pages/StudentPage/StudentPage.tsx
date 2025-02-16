import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";

import ListStudent from "../../Components/Student/ListStudent/ListStudent";

interface Props {}

const StudentPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");

  // const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col px-6 py-8 mx-auto md:h-screen">
        <ListStudent />
      </div>
    </section>
  );
};

export default StudentPage;
