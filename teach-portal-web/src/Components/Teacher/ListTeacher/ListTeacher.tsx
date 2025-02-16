import React, { SyntheticEvent } from "react";
import { Student } from "../../../Models/Student";
import DataTableTeacher from "./DataTableTeacher";

const ListTeacher = () => {
  return (
    <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        Teachers
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          <DataTableTeacher />
        </>
      </div>
    </section>
  );
};

export default ListTeacher;
