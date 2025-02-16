import React from "react";
import DataTableStudent from "./DataTableStudent";

const ListStudent = () => {
  return (
    <section id="students">

      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My Students
      </h2>

      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          <DataTableStudent  />
        </>
      </div>

    </section>
  );
};

export default ListStudent;
