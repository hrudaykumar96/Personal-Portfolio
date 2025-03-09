"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(1);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Enter Email Address")
        .email("Enter Valid Email"),
      password: yup.string().required("Enter Password"),
      otp: yup.string().when("steps", {
        is: 2,
        then: yup.string().length(6, "OTP must be 6 digits").required("Enter OTP"),
      }),
    }),

    validate: (values)=>{
      const errors = {};
      if(steps === 2){
        if (!values.otp) {
          errors.otp = "Enter OTP";
        } else if (values.otp.length !== 6) {
          errors.otp = "OTP must be 6 digits";
        }
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (steps === 1) {

        setLoading(true);

          const response = await axios.post("/api/login", {
            email: values.email,
            password: values.password,
          });

          if (response?.data) {
            if (response?.data?.emailError) {
              formik.setErrors({ email: response?.data?.emailError });
              setLoading(false);
            } else if (response?.data?.passwordError) {
              formik.setErrors({ password: response?.data?.passwordError });
              setLoading(false);
            } else if (response?.data?.success) {
              toast.success(response?.data?.success);
              setSteps(2);
              setLoading(false);
            } else if (response?.data?.error) {
              toast.error(response?.data?.error);
              setLoading(false);
            }
          }


      } else if (steps === 2) {

        setLoading(true);

          const response = await axios.post("/api/verifyotp", {
            email: formik.values.email,
            otp: formik.values.otp,
          });

          if (response?.data?.success) {
            toast.success("OTP verified successfully");
            formik.resetForm();
            router.push("/administration");
            setLoading(false);
          } else if(response?.data?.error) {
            toast.error(response?.data?.error);
            setLoading(false);
          } else if(response?.data?.otperror){
            formik.setErrors({ otp: response?.data?.otperror });
            setLoading(false);
          }

      }
    },
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center overflow-hidden">
      <section className="w-full py-16 px-6 md:px-16 mt-24 flex justify-center items-center">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-xl backdrop-blur-md">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-semibold text-teal-400">Login</h2>
          </div>

          <form className="space-y-8 mt-8" onSubmit={formik.handleSubmit}>

            {steps === 1 && (
              <>
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

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Password
                  </label>
                  <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500 
                        ${formik.touched.password && formik.errors.password ? "border-2 border-red-500" : "border border-transparent"}`}
                      placeholder="Your Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  )}
                </div>
              </>
            )}


            {steps === 2 && (
              <>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-semibold text-gray-300"
                  >
                    Enter OTP
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
              </>
            )}


            {loading ? (
              <ButtonLoader />
            ) : (
              <button
                type="submit"
                className="w-full py-3 px-6 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-300"
              >
                {steps === 1 ? "Login" : "Verify OTP"}
              </button>
            )}

            <div className="text-center mt-4">
              <Link href="/resetpassword" className="text-sm text-teal-500 hover:underline">
                Forgot your password?
              </Link>
            </div>


            {formik.errors.general && (
              <div className="text-red-500 text-sm text-center mt-4">{formik.errors.general}</div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
