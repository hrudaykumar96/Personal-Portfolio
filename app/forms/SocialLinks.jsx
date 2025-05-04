import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Loader from "../effects/Loader";
import { toast } from "react-toastify";

const SocialLinks = ({ userData }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      facebook: userData?.facebook || "",
      instagram: userData?.instagram || "",
      linkedin: userData?.linkedin || "",
      telegram: userData?.telegram || "",
      github: userData?.github || "",
      whatsapp: userData?.whatsapp || "",
    },
    validationSchema: yup.object({
      facebook: yup.string().required("Enter Facebook Link"),
      instagram: yup.string().required("Enter Instagram Link"),
      linkedin: yup.string().required("Enter Linkedin Link"),
      telegram: yup.string().required("Enter Telegram Link"),
      github: yup.string().required("Enter Github Link"),
      whatsapp: yup.string().required("Enter Whatsapp Link"),
    }),
    onSubmit: async(values) => {
      setLoading(true);
      const response = await axios.post('/api/updatesociallinks', values);
      if(response){
        if(response?.data?.success){
          toast.success(response?.data?.success);
          setLoading(false);
        }else if(response?.data?.error){
        toast.error(response?.data?.error)
        setLoading(false)
        }
      }
    },
  });

  if(loading) return <Loader/>


  return (
    <div className="w-full min-h-screen">
      <form className="bg-white p-5 rounded" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-5">
          <div className="flex flex-col mb-5">
            <label htmlFor="Facebook">
              Facebook:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Facebook Link"
              className={`pl-3 py-2 rounded border ${
                formik.errors.facebook ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              name="facebook"
              value={formik.values.facebook}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.facebook}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Instagram">
              Instagram:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Instagram Link"
              className={`pl-3 py-2 rounded border ${
                formik.errors.instagram ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              name="instagram"
              value={formik.values.instagram}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.instagram}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Linkedin">
              Linkedin:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Linkedin Link"
              className={`pl-3 py-2 rounded border ${
                formik.errors.linkedin ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              name="linkedin"
              value={formik.values.linkedin}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.linkedin}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Telegram">
              Telegram:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Telegram Link"
              className={`pl-3 py-2 rounded border ${
                formik.errors.telegram ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              name="telegram"
              value={formik.values.telegram}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.telegram}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Github">
              Github:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Github Link"
              className={`pl-3 py-2 rounded border ${
                formik.errors.github ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              name="github"
              value={formik.values.github}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.github}</small>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="Whatsapp">
              Whatsapp:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Whatsapp Link"
              className={`pl-3 py-2 rounded border ${
                formik.errors.whatsapp ? "border-red-500" : "border-gray-200"
              }  bg-gray-50`}
              name="whatsapp"
              value={formik.values.whatsapp}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <small className="text-red-500">{formik.errors.whatsapp}</small>
          </div>
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

export default SocialLinks;