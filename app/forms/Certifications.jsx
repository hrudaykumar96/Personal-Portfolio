"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddCertification from "./AddCertification";
import DeleteModal from "../effects/DeleteModal";

const Certification = () => {
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
          Add Certification
        </button>
      </div>

      <form className="rounded bg-white p-5 w-full h-full sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5 mb-3">
          <div className="flex mb-3 flex-col">
            <label htmlFor="Certification Name">
              Certification Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Certification Name"
              className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
            />
          </div>
          <div className="flex mb-3 flex-col">
            <label htmlFor="Issuing Organization">
              Issuing Organization<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Issuing Organization"
              className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
            />
          </div>

          <div className="flex mb-3 flex-col">
            <label htmlFor="startdate">
              Issue Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder="Enter Start Date"
              className="px-3 py-2 rounded border border-gray-200 bg-gray-50"
            />
          </div>
        </div>
        <div className="flex mb-3 flex-col">
          <label htmlFor="file">
            Image<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            placeholder="Enter End Date"
            className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
          />
        </div>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div>
            <Image
              alt="education"
              src="/logo.webp"
              width={100}
              height={100}
              className="w-28 h-auto object-fill"
            />
          </div>
          <div className="flex justify-end space-x-3 flex-wrap gap-5">
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
      {openForm && <AddCertification setOpenForm={setOpenForm} />}
      <DeleteModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Certification;