"use client";

import React, { useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";

const AddEducation = ({
  setOpenForm,
  setUserData,
  closeUpdateForm,
  dataToUpdate,
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
      school: dataToUpdate?.school || "",
      degree: dataToUpdate?.degree || "",
      field: dataToUpdate?.field || "",
      grade: dataToUpdate?.grade || "",
      start: dataToUpdate?.start
        ? new Date(dataToUpdate.start).toISOString().split("T")[0]
        : "",
      end: dataToUpdate?.end
        ? new Date(dataToUpdate.end).toISOString().split("T")[0]
        : "",
      educationImage: dataToUpdate?.imageURL || "",
      image: null,
    },
    validationSchema: yup.object({
      school: yup.string().required("Enter School Name"),
      degree: yup.string().required("Enter School Name"),
      field: yup.string().required("Enter School Name"),
      grade: yup.string().required("Enter School Name"),
      start: yup.string().required("Enter School Name"),
      educationImage: yup.string(),
      end: yup
        .string()
        .required("Enter End Date")
        .test(
          "endAfterStart",
          "End date cannot be before start date",
          function (value) {
            const { start } = this.parent;
            return !start || !value || new Date(value) >= new Date(start);
          }
        ),
      image: yup
        .mixed()
        .when("educationImage", {
          is: (educationImage) => !!educationImage,
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
        formData.append("school", values.school);
        formData.append("degree", values.degree);
        formData.append("field", values.field);
        formData.append("grade", values.grade);
        formData.append("start", values.start);
        formData.append("end", values.end);
        formData.append("image", values.image);
        formData.append("id", dataToUpdate?._id);
        const response = await axios.put("/api/education", formData);
        if (response && response?.data) {
          if (response?.data?.success) {
            setUserData(response?.data?.success);
            setOpenForm(false);
            setDataToUpdate(null);
            setLoading(false);
            toast.success("Education Updated Successfully");
          } else if (response?.data?.error) {
            setOpenForm(false);
            setDataToUpdate(null);
            setLoading(false);
            toast.error(response?.data?.error);
          } else if (response?.data?.nameError) {
            setLoading(false);
            formik.setFieldError("degree", response?.data?.nameError);
          }
        }
      } else {
        setLoading(true);
        const formData = new FormData();
        formData.append("school", values.school);
        formData.append("degree", values.degree);
        formData.append("field", values.field);
        formData.append("grade", values.grade);
        formData.append("start", values.start);
        formData.append("end", values.end);
        formData.append("image", values.image);
        const response = await axios.post("/api/education", formData);
        if (response && response?.data) {
          if (response?.data?.success) {
            setUserData(response?.data?.success);
            setOpenForm(false);
            setLoading(false);
            toast.success("Education Added Successfully");
          } else if (response?.data?.error) {
            setOpenForm(false);
            setLoading(false);
            toast.error(response?.data?.error);
          } else if (response?.data?.nameError) {
            setLoading(false);
            formik.setFieldError("degree", response?.data?.nameError);
          }
        }
      }
    },
  });

  if (loading) return <Loader />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <div className="w-full container p-5 sm:p-10 bg-white rounded max-h-screen overflow-y-auto">
        <form className="space-y-5 w-full" onSubmit={formik.handleSubmit}>
          <h5 className="mb-5 w-full text-center font-bold text-xl">
            {dataToUpdate ? "Update Education" : "Add Education"}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5 mb-3">
            <div className="flex mb-3 flex-col">
              <label htmlFor="School">
                School<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter School Name"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.school ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.school}
                name="school"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className="text-red-500">{formik.errors.school}</small>
            </div>
            <div className="flex mb-3 flex-col">
              <label htmlFor="Degree">
                Degree<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Degree Name"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.degree ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.degree}
                name="degree"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className="text-red-500">{formik.errors.degree}</small>
            </div>
            <div className="flex mb-3 flex-col">
              <label htmlFor="Field of Study">
                Field of Study<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Field of Study"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.field ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.field}
                name="field"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className="text-red-500">{formik.errors.field}</small>
            </div>
            <div className="flex mb-3 flex-col">
              <label htmlFor="Grade">
                Grade<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Grade"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.grade ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.grade}
                name="grade"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className="text-red-500">{formik.errors.grade}</small>
            </div>
            <div className="flex mb-3 flex-col">
              <label htmlFor="startdate">
                Start Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Start Date"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.start ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.start}
                name="start"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className="text-red-500">{formik.errors.start}</small>
            </div>
            <div className="flex mb-3 flex-col">
              <label htmlFor="endate">
                End Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter End Date"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.end ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.end}
                name="end"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <small className="text-red-500">{formik.errors.end}</small>
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
              className={`pl-3 py-2 rounded border ${
                formik.errors.image ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              name="image"
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
            />
            <small className="text-red-500">{formik.errors.image}</small>
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
            ) : formik.values.educationImage ? (
              <div>
                <Image
                  alt="education"
                  src={formik.values.educationImage}
                  width={100}
                  height={100}
                  className="w-20 h-auto object-fill"
                />
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="text-white bg-blue-600 py-2 px-3 rounded hover:bg-blue-700 flex items-center h-fit"
              >
                {" "}
                {dataToUpdate ? "Update Education" : "Add Education"}
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

export default AddEducation;