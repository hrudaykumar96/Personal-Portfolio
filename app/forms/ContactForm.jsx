"use client";

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
import { FaHeadset } from "react-icons/fa";

const ContactPage = () => {
  const { data, loading, theme } = useData();
  const [buttonLoading, setButtonLoading] = useState(false);
  /* form validation */
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter Full Name"),
      email: yup
        .string()
        .required("Enter Email Address")
        .email("Enter Valid Email"),
      message: yup.string().required("Enter Message"),
    }),
    onSubmit: async (values) => {
      setButtonLoading(true);
      const response = await axios.post("/api/sendemail", values);
      if (response?.data) {
        if (response?.data?.success) {
          formik.resetForm();
          toast.success(response?.data?.success);
          setButtonLoading(false);
        } else if (response?.data?.error) {
          toast.error(response?.data?.error);
          setButtonLoading(false);
        }
      }
    },
  });

  if (loading) return <LoadingSpinner />;

  if (buttonLoading) return <LoadingSpinner />;

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } min-h-screen flex flex-col items-center overflow-hidden`}
    >
      {/* Contact Section */}
      <motion.section
        className="w-full py-16 px-6 md:px-16 mt-24 flex justify-center items-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className={`max-w-6xl w-full ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }  p-8 rounded-lg shadow-xl backdrop-blur-md`}
        >
          <div className="text-center space-y-6">
            <h2
              className={`text-4xl font-semibold flex items-center justify-center ${
                theme === "dark" ? "text-teal-400" : "text-indigo-600"
              } `}
            >
              <span className="mr-2"><FaHeadset/></span>
              Contact Me
            </h2>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-teal-300" : "text-indigo-500"
              } `}
            >
              Feel free to reach out with any inquiries or messages!
            </p>
          </div>

          <form className="space-y-8 mt-8" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } `}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`w-full p-4 rounded-lg
                    ${
                      theme === "dark"
                        ? "bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                        : "bg-gray-300 text-black"
                    }
                    ${
                      formik.touched.name && formik.errors.name
                        ? "border-2 border-red-500"
                        : "border border-transparent"
                    }`}
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } `}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full p-4 rounded-lg
                    ${
                      theme === "dark"
                        ? "bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                        : "bg-gray-300 text-black"
                    }
                    ${
                      formik.touched.email && formik.errors.email
                        ? "border-2 border-red-500"
                        : "border border-transparent"
                    }`}
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className={`block text-sm font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } `}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`w-full p-4 rounded-lg
                  ${
                    theme === "dark"
                      ? "bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                      : "bg-gray-300 text-black"
                  }
                  ${
                    formik.touched.message && formik.errors.message
                      ? "border-2 border-red-500"
                      : "border border-transparent"
                  }`}
                placeholder="Your Message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="text-red-500 text-sm">
                  {formik.errors.message}
                </div>
              )}
            </div>

            {buttonLoading ? (
              <ButtonLoader />
            ) : (
              <button
                type="submit"
                className={`w-full py-3 px-8 ${
                  theme === "dark"
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                } font-semibold rounded-lg  transition-all duration-300`}
              >
                Send Message
              </button>
            )}
          </form>
        </div>
      </motion.section>

      <motion.section
        className="w-full py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className={` ${
              theme === "dark"
                ? "bg-gray-700 hover:scale-105 hover:bg-teal-600"
                : "bg-white hover:shadow-2xl"
            }  p-6 rounded-xl text-center shadow-xl transform transition-all duration-300  hover:shadow-2xl`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <FaEnvelope
                className={`text-4xl ${
                  theme === "dark" ? "text-teal-500" : "text-indigo-600"
                } `}
              />
            </div>
            <h4
              className={`text-xl ${
                theme === "dark" ? "text-teal-300" : "text-indigo-500"
              } `}
            >
              Email
            </h4>
            <p
              className={`text-lg normal-case ${
                theme === "dark" ? "text-white" : "text-gray-800"
              } `}
            >
              {data?.email}
            </p>
          </motion.div>

          <motion.div
            className={` ${
              theme === "dark"
                ? "bg-gray-700 hover:scale-105 hover:bg-teal-600"
                : "bg-white hover:shadow-2xl"
            }  p-6 rounded-xl text-center shadow-xl transform transition-all duration-300  hover:shadow-2xl`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <FaPhoneAlt
                className={`text-4xl ${
                  theme === "dark" ? "text-teal-500" : "text-indigo-600"
                } `}
              />
            </div>
            <h4
              className={`text-xl ${
                theme === "dark" ? "text-teal-300" : "text-indigo-500"
              } `}
            >
              Mobile
            </h4>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-white" : "text-gray-800"
              } `}
            >
              +91-{data?.mobile}
            </p>
          </motion.div>

          <motion.div
            className={` ${
              theme === "dark"
                ? "bg-gray-700 hover:scale-105 hover:bg-teal-600"
                : "bg-white hover:shadow-2xl"
            }  p-6 rounded-xl text-center shadow-xl transform transition-all duration-300  hover:shadow-2xl`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex justify-center mb-4">
              <FaMapMarkerAlt
                className={`text-4xl ${
                  theme === "dark" ? "text-teal-500" : "text-indigo-600"
                } `}
              />
            </div>
            <h4
              className={`text-xl ${
                theme === "dark" ? "text-teal-300" : "text-indigo-500"
              } `}
            >
              Location
            </h4>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-white" : "text-gray-800"
              } `}
            >
              {data?.address}
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
