"use client";

import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Loader from "../effects/Loader";
import { toast } from "react-toastify";

const AddTechnologies = ({
  setOpenForm,
  setUserData,
  dataToUpdate,
  setDataToUpdate,
}) => {
  const [loading, setLoading] = useState(false);

  const closeForm = () => {
    setOpenForm(false);
    setDataToUpdate(null);
  };

  const formik = useFormik({
    initialValues: {
      technologies: dataToUpdate?.name || "",
    },
    validationSchema: yup.object({
      technologies: yup.string().required("Enter Technology"),
    }),
    onSubmit: async (values) => {
      if (dataToUpdate) {
        setLoading(true);
        const response = await axios.put("/api/updatetechnologies", {
          id: dataToUpdate?._id,
          name: values?.technologies,
        });
        if (response && response?.data) {
          if (response?.data?.success) {
            setUserData(response?.data?.success);
            setOpenForm(false);
            setDataToUpdate(null);
            setLoading(false);
            toast.success("Updated Successfully");
          } else if (response?.data?.error) {
            setOpenForm(false);
            setLoading(false);
            setDataToUpdate(null);
            toast.error(response?.data?.error);
          } else if (response?.data?.technologyError) {
            setLoading(false);
            formik.setFieldError(
              "technologies",
              response?.data?.technologyError
            );
          }
        }
      } else {
        setLoading(true);
        const response = await axios.post("/api/updatetechnologies", values);
        if (response && response?.data) {
          if (response?.data?.success) {
            setOpenForm(false);
            setUserData(response?.data?.success);
            toast.success("Added Successfully");
            setLoading(false);
          } else if (response?.data?.error) {
            setLoading(false);
            toast.error(response?.data?.error);
          } else if (response?.data?.technologyError) {
            setLoading(false);
            formik.setFieldError(
              "technologies",
              response?.data?.technologyError
            );
          }
        }
      }
    },
  });

  if (loading) return <Loader />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <div className="w-full max-w-xl p-5 sm:p-10 bg-white rounded max-h-screen overflow-y-auto">
        <form className="space-y-5 w-full" onSubmit={formik.handleSubmit}>
          <h5 className="mb-5 w-full text-center font-bold text-xl">
            {dataToUpdate ? "Update Technology" : "Add Technology"}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-5 mb-3">
            <div className="flex mb-3 flex-col">
              <label htmlFor="School">
                Technology<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Technology"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.technologies
                    ? "border-red-500"
                    : "border-gray-200"
                }  bg-gray-50`}
                name="technologies"
                value={formik.values.technologies}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <small className="text-red-500">
                {formik.errors.technologies}
              </small>
            </div>
          </div>

          <div className="flex items-center justify-end flex-wrap gap-5">
            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
              >
                {" "}
                {dataToUpdate ? "Update Technology" : "Add Technology"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="text-white bg-red-600 py-2 px-3 rounded hover:bg-red-700 flex items-center h-fit"
              >
                {" "}
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTechnologies;