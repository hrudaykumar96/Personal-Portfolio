"use client";

import React from "react";
import Image from "next/image";
import * as yup from "yup";
import { useFormik } from "formik";

const AddExperience = ({ setOpenForm }) => {
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
      start: "",
      end: "",
      image: null,
    },
    validationSchema: yup.object({
      title: yup.string().required("Enter Job Title"),
      name: yup.string().required("Enter Company Name"),
      start: yup.string().required("Enter Joining Date"),
      end: yup.string().required("Enter Relieving Date"),
      image: yup
        .mixed()
        .required("Image is required")
        .test(
          "fileType",
          "Only JPG, JPEG, PNG, WEBP formats are allowed",
          (value) => {
            return value && SUPPORTED_FORMATS.includes(value.type);
          }
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <div className="w-full container p-5 sm:p-10 bg-white rounded max-h-screen overflow-y-auto">
        <form className="space-y-5 w-full" onSubmit={formik.handleSubmit}>
          <h5
            className="mb-5 w-full text-center font-bold text-xl"
            onSubmit={formik.handleSubmit}
          >
            Add Experience
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
            <div className="flex flex-col mb-5">
              <label htmlFor="Job Title">
                Job Title:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Job Title"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.title ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                name="title"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <small className="text-red-500">{formik.errors.title}</small>
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="Company Name">
                Company Name:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Company Name"
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
            <div className="flex flex-col mb-5">
              <label htmlFor="Start Date">
                Start Date:<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Job Title"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.start ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                name="start"
                value={formik.values.start}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <small className="text-red-500">{formik.errors.start}</small>
            </div>
            {!formik.values.currentlyWorking && (
              <div className="flex flex-col mb-5">
                <label htmlFor="end">
                  End Date:<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="end"
                  placeholder="Enter Relieving Date"
                  className={`pl-3 py-2 rounded border ${
                    formik.errors.end ? "border-red-500" : "border-gray-200"
                  } bg-gray-50`}
                  name="end"
                  value={
                    formik.values.end === "present" ? "" : formik.values.end
                  } // Don't show "present" in the input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <small className="text-red-500">{formik.errors.end}</small>
              </div>
            )}
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
          <div className="mb-3 inline-flex">
            <input
              type="checkbox"
              className="mr-2 h-5 w-5"
              onChange={(e) =>
                formik.setFieldValue("end", e.target.checked ? "present" : "")
              }
            />
            <label htmlFor="checkbox">Currently Working</label>
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
            ) : (
              <div>
                <Image
                  alt="education"
                  src="/logo.webp"
                  width={100}
                  height={100}
                  className="w-20 h-auto object-fill"
                />
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
              >
                {" "}
                Add Experience
              </button>
              <button
                type="button"
                onClick={() => setOpenForm(false)}
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

export default AddExperience;