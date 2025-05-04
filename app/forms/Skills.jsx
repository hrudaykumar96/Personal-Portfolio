import React, { useState } from "react";
import Image from "next/image";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../effects/DeleteModal";
import AddSkill from "./AddSkill";
import Loader from "../effects/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const Skills = ({ userData, setUserData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataTodelete, setDataTodelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  const openAddForm = () => {
    setDataToUpdate(null);
    setOpenForm(true);
  };

  const openDeleteModal = (id) => {
    if (id) {
      setDataTodelete(id);
      setOpenModal(true);
    }
  };

  const closeModal = () => {
    setDataTodelete(null);
    setOpenModal(false);
  };

  const confirmDelete = async () => {
    setLoading(true);
    const response = await axios.delete("/api/skills", {
      data: { id: dataTodelete },
    });
    if (response && response?.data) {
      if (response?.data?.success) {
        setUserData(response?.data?.success);
        setOpenModal(false);
        setDataTodelete(null);
        setLoading(false);
        toast.success("Deleted Successfully");
      } else if (response?.data?.error) {
        setOpenModal(false);
        setDataTodelete(null);
        setLoading(false);
        toast.error(response?.data?.error);
      }
    }
  };

  const openUpdateForm = (data) => {
    if (data) {
      setDataToUpdate(data);
      setOpenForm(true);
    }
  };

  const closeUpdateForm = () => {
    setDataToUpdate(null);
    setOpenForm(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen w-full">
      <div className="w-full flex justify-end mb-5">
        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center text-white bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-700"
        >
          <FaPlusCircle className="mr-2" />
          Add Skill
        </button>
      </div>
      <form className="bg-white rounded p-5">
        {userData?.skills?.length > 0 ? (
          userData?.skills?.map((skill, index) => (
            <div key={index} className="border p-5 mt-5 mb-5">
              <div
                className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5"
                key={index}
              >
                <div className="flex flex-col mb-5">
                  <label htmlFor="skill">
                    Skill:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Skill Name"
                    className="pl-3 py-2 rounded border border-gray-200 bg-gray-50"
                    value={skill?.name}
                    readOnly
                  />
                </div>
                {skill?.imageURL && (
                  <div className="flex flex-col mb-5">
                    <Image
                      alt="skill"
                      src={skill?.imageURL}
                      width={100}
                      height={100}
                      className="w-28 h-auto"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between flex-wrap gap-50">
                <div></div>
                <div className="flex justify-end space-x-3 flex-wrap gap-5">
                  <button
                    type="button"
                    onClick={() => openUpdateForm(skill)}
                    className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
                  >
                    {" "}
                    <FaPencilAlt className="mr-2" /> Update
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(skill._id)}
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
        <AddSkill
          setOpenForm={setOpenForm}
          setUserData={setUserData}
          dataToUpdate={dataToUpdate}
          closeUpdateForm={closeUpdateForm}
          setDataToUpdate={setDataToUpdate}
        />
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

export default Skills;