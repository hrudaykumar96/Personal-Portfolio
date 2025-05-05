import React, { useState } from "react";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../effects/DeleteModal";
import AddTechnologies from "./AddTechnologies";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";

const Technologies = ({ userData, setUserData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataToDelete, setDataTODelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  const openAddTechnologiesform = ()=>{
    setOpenForm(true);
    setDataToUpdate(null);
  }

  const closeModal = () => {
    setDataTODelete(null);
    setOpenModal(false);
  };

  const deleteModal = (id) => {
    if (id) {
      setDataTODelete(id);
      setOpenModal(true);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    const response = await axios.delete("/api/updatetechnologies", {
      data: { id: dataToDelete },
    });
    if (response && response?.data) {
      if (response?.data?.success) {
        setUserData(response?.data?.success);
        setOpenModal(false);
        setDataTODelete(null);
        setLoading(false);
        toast.success("Technology Deleted Successfully");
      } else if (response?.data?.error) {
        setOpenModal(false);
        setLoading(false);
        setDataTODelete(null);
        toast.error(response?.data?.error);
      }
    }
  };

  const openUpdateForm = (values) =>{
    if(values){
      setDataToUpdate(values);
      setOpenForm(true);
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex justify-end mb-5">
        <button
          type="button"
          className="flex items-center text-white bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-700"
          onClick={openAddTechnologiesform}
        >
          <FaPlusCircle className="mr-2" />
          Add Technologies
        </button>
      </div>
      <form className="bg-white rounded p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {userData?.technologies?.length > 0 ? (
            userData?.technologies?.map((tech, index) => (
              <div className="mb-3 flex flex-col space-y-2" key={index}>
                {/* Label + Buttons */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <label htmlFor="technology" className="font-medium">
                    Technologies: <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openUpdateForm(tech)}
                      className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center"
                    >
                      <FaPencilAlt className="mr-2" /> Update
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteModal(tech._id)}
                      className="text-white bg-red-600 py-2 px-3 rounded hover:bg-red-700 flex items-center"
                    >
                      <MdDelete className="mr-2" /> Delete
                    </button>
                  </div>
                </div>

                {/* Input Field */}
                <input
                  id="technology"
                  type="text"
                  placeholder="Enter Technology"
                  className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
                  value={tech.name || ""}
                  readOnly
                />
              </div>
            ))
          ) : (
            <p className="text-center w-full text-red-500 col-span-3">
              No Data Found
            </p>
          )}
        </div>
      </form>
      {openForm && (
        <AddTechnologies setOpenForm={setOpenForm} setUserData={setUserData} dataToUpdate={dataToUpdate} setDataToUpdate={setDataToUpdate} />
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

export default Technologies;