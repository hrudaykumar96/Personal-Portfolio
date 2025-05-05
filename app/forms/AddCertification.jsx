"use client";

import React, { useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";

const AddCertification = ({
  setOpenForm,
  setUserData,
  closeUpdateForm,
  dataToUpdate,
  setDatatoUpdate,
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
      organization: dataToUpdate?.organization || "",
      issued: dataToUpdate?.issued
        ? new Date(dataToUpdate.issued).toISOString().split("T")[0]
        : "",
      image: null,
      certificationImage: dataToUpdate?.imageURL || "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter Certification Name"),
      organization: yup.string().required("Enter Issuing Organization"),
      issued: yup.string().required("Enter Issued Date"),
      certificationImage: yup.string(),
      image: yup
        .mixed()
        .when("certificationImage", {
          is: (certificationImage) => !!certificationImage,
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

        formData.append("name", values.name);
        formData.append("organization", values.organization);
        formData.append("issued", values.issued);
        formData.append("image", values.image);
        formData.append("id", dataToUpdate?._id);

        const response = await axios.put("/api/certifications", formData);
        if (response && response?.data) {
          if (response?.data?.success) {
            setUserData(response?.data?.success);
            setOpenForm(false);
            setLoading(false);
            setDatatoUpdate(null);
            toast.success("Certification Updated Successfully");
          } else if (response?.data?.error) {
            setOpenForm(false);
            setLoading(false);
            setDatatoUpdate(null);
            toast.error(response?.data?.error);
          } else if (response?.data?.nameError) {
            setLoading(false);
            formik.setFieldError("name", response?.data?.nameError);
          }
        }
      } else {
        setLoading(true);

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("organization", values.organization);
        formData.append("issued", values.issued);
        formData.append("image", values.image);

        const response = await axios.post("/api/certifications", formData);
        if (response && response?.data) {
          if (response?.data?.success) {
            setUserData(response?.data?.success);
            setOpenForm(false);
            setLoading(false);
            toast.success("Certification Added Successfully");
          } else if (response?.data?.error) {
            setOpenForm(false);
            setLoading(false);
            toast.error(response?.data?.error);
          } else if (response?.data?.nameError) {
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
      <div className="w-full container p-5 sm:p-10 bg-white rounded max-h-screen overflow-y-auto">
        <form className="space-y-5 w-full" onSubmit={formik.handleSubmit}>
          <h5 className="mb-5 w-full text-center font-bold text-xl">
            {dataToUpdate ? "Update Certification" : "Add Certification"}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5 mb-3">
            <div className="flex mb-3 flex-col">
              <label htmlFor="Certification Name">
                Certification Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Certification Name"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.name ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
              />
              <small className="text-red-500">{formik.errors.name}</small>
            </div>
            <div className="flex mb-3 flex-col">
              <label htmlFor="Issuing Organization">
                Issuing Organization<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Issuing Organization"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.organization
                    ? "border-red-500"
                    : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.organization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="organization"
              />
              <small className="text-red-500">
                {formik.errors.organization}
              </small>
            </div>

            <div className="flex mb-3 flex-col">
              <label htmlFor="startdate">
                Issue Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Start Date"
                className={`pl-3 py-2 rounded border ${
                  formik.errors.issued ? "border-red-500" : "border-gray-200"
                }  bg-gray-50`}
                value={formik.values.issued}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="issued"
              />
              <small className="text-red-500">{formik.errors.issued}</small>
            </div>
          </div>
          <div className="flex mb-3 flex-col">
            <label htmlFor="file">
              Image<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              className={`pl-3 py-2 rounded border ${
                formik.errors.image ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
              name="image"
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
            ) : formik.values.certificationImage ? (
              <div>
                <Image
                  alt="education"
                  src={formik.values.certificationImage}
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
                {dataToUpdate ? "Update Certification" : "Add Certification"}
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

export default AddCertification;