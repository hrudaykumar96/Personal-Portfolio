"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";

const PersonalInformation = ({ userData, setUserData }) => {
  const [loading, setLoading] = useState(false);
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];
  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      mobile: userData?.mobile || "",
      designation: userData?.designation || "",
      profile: null,
      address: userData?.address || "",
      summary: userData?.summary || "",
      image: userData?.profileURL,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Enter Full Name")
        .min(3, "Name Should be Atlest 3 Characters"),
      email: yup.string().required("Enter Email").email("Enter Valid Email"),
      mobile: yup
        .string()
        .required("Enter Mobile Number")
        .matches(/^\d+$/, "Only numbers are allowed")
        .length(10, "Enter Valid Mobile Number"),
      designation: yup.string().required("Enter Designation"),
      image: yup.string(),
      profile: yup
        .mixed()
        .when("image", {
          is: (image) => !!image,
          then: () => yup.mixed().notRequired(),
          otherwise: () => yup.mixed().required("Upload Profile Image"),
        })
        .test("fileType", "Only JPG, JPEG, PNG, WEBP", (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }),
      address: yup
        .string()
        .required("Enter Address")
        .min(5, "Enter Full Address"),
      summary: yup.string().required("Enter Profile Summary"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("designation", values.designation);
      formData.append("profile", values.profile);
      formData.append("address", values.address);
      formData.append("summary", values.summary);

      const response = await axios.post("/api/personalInformation", formData);
      if (response && response?.data) {
        if (response?.data?.success) {
          setUserData(response?.data?.success);
          toast.success("Updated Successfully");
          setLoading(false);
        } else if (response?.data?.error) {
          toast.error(response?.data?.error);
          setLoading(false);
        }
      }
    },
  });

  if (loading) return <Loader />;

  return (
    <div className="w-full min-h-screen">
      <form
        className="rounded bg-white p-5 w-full h-full sm:p-10"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5 mb-3">
          <div className="flex flex-col mb-3">
            <label htmlFor="Name">
              Name:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className={`pl-3 py-2 rounded border ${
                formik.errors.name ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              value={formik.values.name}
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.name}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Email">
              Email:<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className={`pl-3 py-2 rounded border ${
                formik.errors.email ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              value={formik.values.email}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.email}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Mobile">
              Mobile Number:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className={`pl-3 py-2 rounded border ${
                formik.errors.mobile ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              value={formik.values.mobile}
              name="mobile"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.mobile}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Designation">
              Designation:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Designation"
              className={`pl-3 py-2 rounded border ${
                formik.errors.designation ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              value={formik.values.designation}
              name="designation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.designation}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Profile">
              Profile:<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              placeholder="Enter Designation"
              className={`pl-3 py-2 rounded border ${
                formik.errors.profile ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              name="profile"
              onBlur={formik.handleBlur}
              onChange={(e) =>
                formik.setFieldValue("profile", e.currentTarget.files[0])
              }
            />
            <small className="text-red-500">{formik.errors.profile}</small>
          </div>
          {formik.values.profile ? (
            <div className="flex flex-col mb-5 justify-center items-center lg:items-start">
              <Image
                alt="profile"
                src={URL.createObjectURL(formik.values.profile)}
                height={100}
                width={100}
                className="object-fill w-28 h-auto"
              />
            </div>
          ) : formik.values?.image ? (
            <div className="flex flex-col mb-5 justify-center items-center lg:items-start">
              <Image
                alt="profile"
                src={formik.values?.image}
                height={100}
                width={100}
                className="object-fill w-28 h-auto"
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="Address">
            Address:<span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter Address"
            className={`pl-3 py-2 rounded border ${
              formik.errors.address ? "border-red-500" : "border-gray-200"
            }  bg-gray-50`}
            value={formik.values.address}
            name="address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></textarea>
          <small className="text-red-500">{formik.errors.address}</small>
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="Summary">
            Summary:<span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter Profile Summary"
            className={`pl-3 py-2 rounded border ${
              formik.errors.summary ? "border-red-500" : "border-gray-200"
            }  bg-gray-50`}
            value={formik.values.summary}
            name="summary"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></textarea>
          <small className="text-red-500">{formik.errors.summary}</small>
        </div>

        <div className="text-right">
          <input
            type="submit"
            value="Submit"
            className="cursor-pointer bg-indigo-600 text-white rounded py-1 px-3 hover:bg-indigo-700"
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;