import React from "react";
import ListTeacher from "../../Components/Teacher/ListTeacher/ListTeacher";

interface Props {}

const TeacherPage = (props: Props) => {

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col px-6 py-8 mx-auto md:h-screen">
        <ListTeacher/>
      </div>
    </section>
  );
};

export default TeacherPage;
