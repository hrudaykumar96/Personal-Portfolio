"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";

const AddSkill = ({
  setOpenForm,
  setUserData,
  dataToUpdate,
  closeUpdateForm,
  setDataToUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];
  const formik = useFormik({
    initialValues: {
      name: dataToUpdate?.name || "",
      image: null,
      id: dataToUpdate?._id || "",
      skillImage: dataToUpdate?.imageURL || "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter Skill Name"),
      skillImage: yup.string(),
      image: yup
        .mixed()
        .when("skillImage", {
          is: (skillImage) => !!skillImage,
          then: () => yup.mixed().notRequired(),
          otherwise: () => yup.mixed().required("Upload Image"),
        })
        .test("fileType", "Only JPG, JPEG, PNG, WEBP", (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }),
    }),
    onSubmit: async (values) => {
      if (dataToUpdate) {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", values?.name);
        formData.append("image", values?.image);
        formData.append("id", values.id);

        const response = await axios.put("/api/skills", formData);
        if (response && response?.data) {
          if (response?.data?.success) {
            setUserData(response?.data?.success);
            setDataToUpdate(null);
            setOpenForm(false);
            setLoading(false);
            toast.success("Skills Updated Successfully");
          } else if (response?.data?.error) {
            setDataToUpdate(null);
            setOpenForm(false);
            setLoading(false);
            toast.error(response?.data?.error);
          } else if (response?.data?.skillError) {
            setLoading(false);
            formik.setFieldError("name", response?.data?.skillError);
          }
        }
      } else {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", values?.name);
        formData.append("image", values?.image);

        const response = await axios.post("/api/skills", formData);
        if (response && response?.data) {
          if (response?.data?.success) {
            setUserData(response?.data?.success);
            setOpenForm(false);
            setLoading(false);
            toast.success("Skill Added Successfully");
          } else if (response?.data?.error) {
            setOpenForm(false);
            setLoading(false);
            toast.error(response?.data?.error);
          } else if (response?.data?.nameError) {
            setOpenForm(true);
            setLoading(false);
            formik.setFieldError("name", response?.data?.nameError);
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
            {dataToUpdate ? "Update Skill" : "Add SKill"}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5 mb-3">
            <div className="flex mb-3 flex-col">
              <label htmlFor="School">
                Skill<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Skill"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.name ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <small className="text-red-500">{formik.errors.name}</small>
            </div>
            <div className="flex mb-3 flex-col">
              <label htmlFor="file">
                Image<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                placeholder="Enter End Date"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.image ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                name="image"
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue("image", e.currentTarget.files[0])
                }
              />
              <small className="text-red-500">{formik.errors.image}</small>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            {formik.values.image ? (
              <div>
                <Image
                  alt="education"
                  src={URL.createObjectURL(formik.values.image)}
                  width={100}
                  height={100}
                  className="w-20 h-auto object-fill"
                />
              </div>
            ) : formik.values.skillImage ? (
              <div>
                <Image
                  alt="education"
                  src={formik.values.skillImage}
                  width={100}
                  height={100}
                  className="w-20 h-auto object-fill"
                />
              </div>
            ) : <div></div>}
            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
              >
                {" "}
                {dataToUpdate ? "Update Skill" : "Add SKill"}
              </button>
              <button
                type="button"
                onClick={closeUpdateForm}
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

export default AddSkill;