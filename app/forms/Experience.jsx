"use client";
import Image from "next/image";
import { useState } from "react";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../effects/DeleteModal";
import AddExperience from "./AddExperience";

const Experience = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex justify-end mb-5">
        <button
          type="button"
          className="flex items-center text-white bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-700"
          onClick={() => setOpenForm(true)}
        >
          <FaPlusCircle className="mr-2" />
          Add Experience
        </button>
      </div>
      <form className="bg-white p-5 rounded">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
          <div className="flex flex-col mb-5">
            <label htmlFor="Job Title">
              Job Title:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Job Title"
              className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Company Name">
              Company Name:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Company Name"
              className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Start Date">
              Start Date:<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder="Enter Job Title"
              className="px-3 py-2 rounded border border-gray-200 bg-gray-50"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="End Date">
              End Date:<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder="Enter Company Name"
              className="px-3 py-2 rounded border border-gray-200 bg-gray-50"
            />
          </div>
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="image">
            Image:<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            className="px-3 py-2 rounded border border-gray-200 bg-gray-50"
          />
        </div>
        <div className="mb-3 inline-flex">
          <input type="checkbox" className="mr-2 h-5 w-5" />
          <label htmlFor="checkbox">Currently Working</label>
        </div>
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <div>
            <Image
              src="/logo.webp"
              alt="experience"
              className="w-28 h-auto object-fill"
              width={100}
              height={100}
            />
          </div>
          <div className="flex items-center justify-center gap-5 flex-wrap">
            <button
              type="button"
              className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
            >
              {" "}
              <FaPencilAlt className="mr-2" /> Update
            </button>
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="text-white bg-red-600 py-2 px-3 rounded hover:bg-red-700 flex items-center h-fit"
            >
              {" "}
              <MdDelete className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </form>
      {openForm && <AddExperience setOpenForm={setOpenForm} />}
      <DeleteModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Experience;