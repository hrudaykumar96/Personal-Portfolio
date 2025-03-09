"use client"

import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as yup from "yup";
import { useData } from "../context/contextProvider";
import LoadingSpinner from "../effects/LoadingSpinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";

const ContactPage = () => {

  const { data, loading } = useData();
  const [buttonLoading, setButtonLoading] = useState(false);
  /* form validation */
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Enter Full Name'),
      email: yup.string().required('Enter Email Address').email('Enter Valid Email'),
      message: yup.string().required('Enter Message'),
    }),
    onSubmit: async(values) => {
      setButtonLoading(true);
      const response = await axios.post('/api/sendemail', values);
      if(response?.data){
        if(response?.data?.success){
          formik.resetForm();
          toast.success(response?.data?.success);
          setButtonLoading(false);
        } else if(response?.data?.error){
          toast.error(response?.data?.error);
          setButtonLoading(false);
        }
      }
    }
  });

  if(loading) return <LoadingSpinner/>

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center overflow-hidden">
      {/* Contact Section */}
      <motion.section
        className="w-full py-16 px-6 md:px-16 mt-24 flex justify-center items-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl w-full bg-gray-800 p-8 rounded-lg shadow-xl backdrop-blur-md">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-semibold text-teal-400">Contact Me</h2>
            <p className="text-xl text-teal-300">Feel free to reach out with any inquiries or messages!</p>
          </div>

          <form className="space-y-8 mt-8" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 
                    ${formik.touched.name && formik.errors.name ? 'border-2 border-red-500' : 'border border-transparent'}`}
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm">{formik.errors.name}</div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 
                    ${formik.touched.email && formik.errors.email ? 'border-2 border-red-500' : 'border border-transparent'}`}
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500
                  ${formik.touched.message && formik.errors.message ? 'border-2 border-red-500' : 'border border-transparent'}`}
                placeholder="Your Message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="text-red-500 text-sm">{formik.errors.message}</div>
              )}
            </div>

            { buttonLoading ? <ButtonLoader/> : 

            <button
              type="submit"
              className="w-full py-3 px-8 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-300"
            >
              Send Message
            </button>
            }
          </form>
        </div>
      </motion.section>


      <motion.section
        className="w-full py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Email Card */}
          <motion.div
            className="bg-gray-700 p-6 z-50 rounded-xl text-center shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-2xl"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-4xl text-teal-500" />
            </div>
            <h4 className="text-xl text-teal-300">Email</h4>
            <p className="text-lg text-white">{data?.email}</p>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            className="bg-gray-700 p-6 z-50 rounded-xl text-center shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-2xl"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <FaPhoneAlt className="text-4xl text-teal-500" />
            </div>
            <h4 className="text-xl text-teal-300">Mobile</h4>
            <p className="text-lg text-white">+91-{data?.mobile}</p>
          </motion.div>

          {/* Location Card */}
          <motion.div
            className="bg-gray-700 p-6 z-50 rounded-xl text-center shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-2xl"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <FaMapMarkerAlt className="text-4xl text-teal-500" />
            </div>
            <h4 className="text-xl text-teal-300">Location</h4>
            <p className="text-lg text-white">{data?.address}</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;