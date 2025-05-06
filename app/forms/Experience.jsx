"use client";
import Image from "next/image";
import { useState } from "react";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../effects/DeleteModal";
import AddExperience from "./AddExperience";
import Loader from "../effects/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const Experience = ({ userData, setUserData }) => {
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
    const response = await axios.delete('/api/profession', { data:{id: dataToDelete}});
    if(response && response?.data){
      setUserData(response?.data?.success);
      setDataToDelete(null);
      setOpenModal(false);
      setLoading(false);
      toast.success('Experience Deleted Successfully');
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
          Add Experience
        </button>
      </div>
      <form className="bg-white p-5 rounded">
        { userData?.experience?.length > 0 ? userData?.experience?.map((exp, index)=>(
          <div className="border p-5" key={index}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
          <div className="flex flex-col mb-5">
            <label htmlFor="Job Title">
              Job Title:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Job Title"
              className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
              value={exp.title || ""}
              readOnly
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
              value={exp.name || ""}
              readOnly
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
              value={
                exp.start
                  ? new Date(exp.start).toISOString().split("T")[0]
                  : ""
              }
              readOnly
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
              value={
                exp.end
                  ? new Date(exp.end).toISOString().split("T")[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col mb-5">
        </div>
        <div className="mb-3 inline-flex">
          <input type="checkbox" className="mr-2 h-5 w-5" checked={exp.present === "present"} readOnly />
          <label htmlFor="checkbox" >Currently Working</label>
        </div>
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <div>
            { exp.imageURL && 
            <Image
              src={exp.imageURL}
              alt="experience"
              className="w-28 h-auto object-fill"
              width={100}
              height={100}
            />
          }
          </div>
          <div className="flex items-center justify-center gap-5 flex-wrap">
            <button
              type="button"
              onClick={()=>openUpdateForm(exp)}
              className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
            >
              {" "}
              <FaPencilAlt className="mr-2" /> Update
            </button>
            <button
              type="button"
              onClick={() => openDeletePopup(exp._id)}
              className="text-white bg-red-600 py-2 px-3 rounded hover:bg-red-700 flex items-center h-fit"
            >
              {" "}
              <MdDelete className="mr-2" /> Delete
            </button>
          </div>
        </div>
          
          </div>
        )): <p className="w-full text-center text-red-500">No Data Found</p>}
        
      </form>
      {openForm && <AddExperience setOpenForm={setOpenForm} setUserData={setUserData} closeUpdateForm={closeUpdateForm} dataToUpdate={dataToUpdate} setDataToUpdate={setDataToUpdate} />}
      <DeleteModal openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirm={confirmDelete}
        closeModal={closeModal} />
    </div>
  );
};

export default Experience;