"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ButtonLoader from "../effects/ButtonLoader";
import axios from "axios";

const ResetPasswordForm = () => {
  const [steps, setSteps] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Enter Email Address")
        .email("Enter Valid Email")
        .when("steps", {
          is: 1,
          then: yup.string().required("Email Email Address"),
        }),
      otp: yup
        .string()
        .length(6, "OTP must be 6 digits")
        .when("steps", {
          is: 2,
          then: yup.string().required("Enter OTP"),
        }),
      password: yup
        .string()
        .min(8, "Password should be at least 8 characters")
        .max(12, "Password should not exceed 12 characters")
        .when("steps", {
          is: 3,
          then: yup.string().required("Enter Password"),
        }),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .when("steps", {
          is: 3,
          then: yup.string().required("Enter Confirm Password"),
        }),
    }),

    validate: (values) => {
      const errors = {};
      // Dynamic validation based on the current step
      if (steps === 1) {
        if (!values.email) {
          errors.email = "Enter Email Address";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "Enter Valid Email Address";
        }
      } else if (steps === 2) {
        if (!values.otp) {
          errors.otp = "Enter OTP";
        } else if (values.otp.length !== 6) {
          errors.otp = "OTP must be 6 digits";
        }
      } else if (steps === 3) {
        if (!values.password) {
          errors.password = "Enter Password";
        } else if (values.password.length < 8 || values.password.length > 12) {
          errors.password = "Password should be at least 8 characters and at most 12 characters";
        }

        if (!values.confirmPassword) {
          errors.confirmPassword = "Enter Confirm Password";
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = "Passwords must match";
        }
      }

      return errors;
    },

    onSubmit: async (values) => {
      setLoading(true);

        if (steps === 1) {
          const response = await axios.post("/api/resetpassword", {
            email: formik.values.email,
          });
          if (response?.data?.success) {
            setSteps(2);
            toast.success(response?.data?.success);
          } else if (response?.data?.Emailerror) {
            setSteps(1);
            formik.setFieldError("email", response?.data?.Emailerror);
          } else if (response?.data?.error) {
            setSteps(1);
            toast.error(response?.data?.error);
          }
        } else if (steps === 2) {
          const response = await axios.post("/api/verifypasswordotp", {
            email: formik.values.email,
            otp: formik.values.otp,
          });
          if (response?.data?.success) {
            setSteps(3);
            toast.success(response?.data?.success);
          } else if (response?.data?.error) {
            toast.error(response?.data?.error);
          } else if(response?.data?.otperror){
            formik.setFieldError("otp", response?.data?.otperror);
          }
        } else if (steps === 3) {
          const response = await axios.post("/api/changepassword", {
            email: formik.values.email,
            password: formik.values.password,
          });
          if (response?.data?.success) {
            router.replace("/login");
            setSteps(1);
            formik.resetForm();
            toast.success(response?.data?.success);
          } else if (response?.data?.error) {
            toast.error(response?.data?.error);
          }
        }
      setLoading(false);
    },
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center overflow-hidden">
      <section className="w-full py-16 px-6 md:px-16 mt-24 flex justify-center items-center">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-xl backdrop-blur-md">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-semibold text-teal-400">Reset Password</h2>
          </div>

          <form className="space-y-8 mt-8" onSubmit={formik.handleSubmit}>
            {steps === 1 && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-300"
                >
                  Email
                </label>
                <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 
                      ${formik.touched.email && formik.errors.email ? "border-2 border-red-500" : "border border-transparent"}`}
                    placeholder="Your Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}
              </div>
            )}

            {steps === 2 && (
              <div>
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-300">
                  OTP
                </label>
                <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                  <input
                    id="otp"
                    name="otp"
                    type="password"
                    className={`w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 
                      ${formik.touched.otp && formik.errors.otp ? "border-2 border-red-500" : "border border-transparent"}`}
                    placeholder="Enter OTP"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                  />
                </div>
                {formik.touched.otp && formik.errors.otp && (
                  <div className="text-red-500 text-sm">{formik.errors.otp}</div>
                )}
              </div>
            )}

            {steps === 3 && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    New Password
                  </label>
                  <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 
                        ${formik.touched.password && formik.errors.password ? "border-2 border-red-500" : "border border-transparent"}`}
                      placeholder="New Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 
                        ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-2 border-red-500" : "border border-transparent"}`}
                      placeholder="Confirm New Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                  )}
                </div>
              </>
            )}

            {loading ? (
              <ButtonLoader />
            ) : (
              <button
                type="submit"
                className="w-full py-3 px-6 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-300"
              >
                {steps === 1
                  ? "Send OTP"
                  : steps === 2
                  ? "Verify OTP"
                  : "Reset Password"}
              </button>
            )}
          </form>

          <div className="text-center mt-6">
            <Link href="/login" className="text-teal-400 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordForm;
