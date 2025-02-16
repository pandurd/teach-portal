import React, { useState } from "react";
import Modal from "react-modal";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Student } from "../../Models/Student";
import { FaWindowClose } from "react-icons/fa";

type Props = {
  onStudentCreate: Function;
  modalIsOpen: boolean;
  setModalIsOpen: Function;
};

type AddStudentFormInputs = {
  email: string;
  firstName: string;
  lastName: string;
};

const validation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be valid."),
  firstName: Yup.string()
    .required("FirstName is required")
    .min(2, "First Name must contain atleast 2 charcaters.")
    .max(10, "First Name must not be greater than 10 charcaters.")
    .matches(/^[A-Za-z ]*$/, "Please enter valid First Name"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must contain atleast 2 charcaters.")
    .max(10, "Last Name must not be greater than 10 charcaters.")
    .matches(/^[A-Za-z ]*$/, "Please enter valid Last Name"),
});

const AddStudentModal: React.FC<Props> = ({
  onStudentCreate,
  modalIsOpen,
  setModalIsOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStudentFormInputs>({ resolver: yupResolver(validation) });

  const handleAddStudent = (form: AddStudentFormInputs) => {
    const student: Student = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
    };
    onStudentCreate(student);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <button
          className="bg-sky-500/100 text-white px-4 py-2 rounded-md"
          onClick={openModal}
        >
          Add Student
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 w-full md:w-1/2 lg:w-1/4 rounded-lg shadow-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        contentLabel="Example Modal"
      >
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
          </div>
          <div className="flex ">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              <FaWindowClose />
            </button>
          </div>
        </div>

        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(handleAddStudent)}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-error">{errors.email.message}</p>
            ) : (
              ""
            )}
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              FirstName
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="FirstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("firstName")}
            />
            {errors.firstName ? (
              <p className="text-error">{errors.firstName.message}</p>
            ) : (
              ""
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              LastName
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="LastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("lastName")}
            />
            {errors.lastName ? (
              <p className="text-error">{errors.lastName.message}</p>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-sky-500/100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add Student
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddStudentModal;
