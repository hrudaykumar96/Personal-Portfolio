"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddEducation from "./AddEducation";
import DeleteModal from "../effects/DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";

const EducationalInformation = ({ userData, setUserData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  const openDeletePopup =(id)=>{
    if(id){
      setDataToDelete(id);
      setOpenModal(true);
    }
  }

  const closeModal =()=>{
    setDataToDelete(null);
    setOpenForm(false);
  }

  const confirmDelete = async()=>{
    setLoading(true);
    const response = await axios.delete('/api/education', { data:{id: dataToDelete}});
    if(response && response?.data){
      setUserData(response?.data?.success);
      setDataToDelete(null);
      setOpenModal(false);
      setLoading(false);
      toast.success('Education Deleted Successfully');
    }else if(response?.data?.error){
      setDataToDelete(null);
      setOpenModal(false);
      setLoading(false);
      toast.success(response?.data?.error);
    }
  };

  const openUpdateForm = (data)=>{
    if(data){
      setDataToUpdate(data);
      setOpenForm(true);
    }
  };

  const closeUpdateForm =()=>{
    setDataToUpdate(null);
    setOpenForm(false);
  }



  if(loading) return <Loader/>

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex justify-end mb-5">
        <button
          type="button"
          className="flex items-center text-white bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-700"
          onClick={() => setOpenForm(true)}
        >
          <FaPlusCircle className="mr-2" />
          Add Education
        </button>
      </div>

      <form className="rounded bg-white p-5 w-full h-full sm:p-10">
        {userData?.education?.length > 0 ? (
          userData?.education?.map((edu, index) => (
            <div key={index} className="border p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5 mb-3">
                <div className="flex mb-3 flex-col">
                  <label htmlFor="School">
                    School<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter School Name"
                    className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
                    readOnly
                    value={edu.school || ""}
                  />
                </div>
                <div className="flex mb-3 flex-col">
                  <label htmlFor="Degree">
                    Degree<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Degree Name"
                    className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
                    readOnly
                    value={edu.degree || ""}
                  />
                </div>
                <div className="flex mb-3 flex-col">
                  <label htmlFor="Field of Study">
                    Field of Study<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Field of Study"
                    className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
                    readOnly
                    value={edu.field || ""}
                  />
                </div>
                <div className="flex mb-3 flex-col">
                  <label htmlFor="Grade">
                    Grade<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Grade"
                    className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
                    readOnly
                    value={edu.grade || ""}
                  />
                </div>
                <div className="flex mb-3 flex-col">
                  <label htmlFor="startdate">
                    Start Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Enter Start Date"
                    className="px-3 py-2 rounded border border-gray-200 bg-gray-50"
                    readOnly
                    value={
                      edu.start
                        ? new Date(edu.start).toISOString().split("T")[0]
                        : ""
                    }
                  />
                </div>
                <div className="flex mb-3 flex-col">
                  <label htmlFor="endate">
                    End Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Enter End Date"
                    className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
                    readOnly
                    value={
                      edu.end
                        ? new Date(edu.end).toISOString().split("T")[0]
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-5">
                {edu?.imageURL && (
                  <div>
                    <Image
                      alt="education"
                      src={edu.imageURL}
                      width={100}
                      height={100}
                      className="w-28 h-auto object-fill"
                    />
                  </div>
                )}
                <div className="flex justify-end space-x-3 flex-wrap gap-5">
                  <button
                    type="button"
                    onClick={()=>openUpdateForm(edu)}
                    className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
                  >
                    {" "}
                    <FaPencilAlt className="mr-2" /> Update
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeletePopup(edu._id)}
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
        <AddEducation setOpenForm={setOpenForm} setUserData={setUserData} closeUpdateForm={closeUpdateForm} dataToUpdate={dataToUpdate} setDataToUpdate={setDataToUpdate} />
      )}
      <DeleteModal openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirm={confirmDelete}
        closeModal={closeModal} />
    </div>
  );
};

export default EducationalInformation;