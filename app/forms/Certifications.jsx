"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddCertification from "./AddCertification";
import DeleteModal from "../effects/DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";

const Certification = ({ userData, setUserData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataToUpdate, setDatatoUpdate] = useState(null);

  const openDeleteModal = (id) => {
    if (id) {
      setDataToDelete(id);
      setOpenModal(true);
    }
  };

  const closeModal = () => {
    setDataToDelete(null);
    setOpenModal(false);
  };

  const confirmDelete = async () => {
    setLoading(true);
    const response = await axios.delete("/api/certifications", {
      data: { id: dataToDelete },
    });
    if (response && response?.data) {
      if (response?.data?.success) {
        setUserData(response?.data?.success);
        setOpenModal(false);
        setDataToDelete(null);
        setLoading(false);
        toast.success("Certification Deleted Successfully");
      } else if (response?.data?.error) {
        setOpenModal(false);
        setDataToDelete(null);
        setLoading(false);
        toast.success(response?.data?.error);
      }
    }
  };

  const openUpdateForm = (data) => {
    if(data){
      setDatatoUpdate(data);
      setOpenForm(true);
    }
  }

  const closeUpdateForm =()=>{
    setDatatoUpdate(null);
    setOpenForm(false);
  }

  if (loading) return <Loader />;

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
        {userData?.certifications?.length > 0 ? (
          userData?.certifications?.map((cert, index) => (
            <div key={index} className="border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5 mb-3">
                <div className="flex mb-3 flex-col">
                  <label htmlFor="Certification Name">
                    Certification Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Certification Name"
                    className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
                    readOnly
                    value={cert.name || ""}
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
                    readOnly
                    value={cert.organization || ""}
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
                    readOnly
                    value={
                      cert.issued
                        ? new Date(cert.issued).toISOString().split("T")[0]
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="flex mb-3 flex-col"></div>
              <div className="flex items-center justify-between flex-wrap gap-5">
                <div>
                  {cert?.imageURL && (
                    <Image
                      alt="education"
                      src={cert?.imageURL}
                      width={100}
                      height={100}
                      className="w-28 h-auto object-fill"
                    />
                  )}
                </div>
                <div className="flex justify-end space-x-3 flex-wrap gap-5">
                  <button
                    type="button"
                    onClick={()=>openUpdateForm(cert)}
                    className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
                  >
                    {" "}
                    <FaPencilAlt className="mr-2" /> Update
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(cert._id)}
                    className="text-white bg-red-600 py-2 px-3 rounded hover:bg-red-700 flex items-center h-fit"
                  >
                    {" "}
                    <MdDelete className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">No Data Found</p>
        )}
      </form>
      {openForm && (
        <AddCertification setOpenForm={setOpenForm} setUserData={setUserData} closeUpdateForm={closeUpdateForm} dataToUpdate={dataToUpdate} setDatatoUpdate={setDatatoUpdate} />
      )}
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirm={confirmDelete}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Certification;