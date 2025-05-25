"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useData } from "../context/contextProvider";
import LoadingSpinner from "../effects/LoadingSpinner";

const QualificationPage = () => {
  const { loading, data, theme } = useData();

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`w-full min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }  px-4 py-8`}
    >
      {/* Education Section */}
      <motion.section
        className="w-full py-16 px-6 md:px-16 mt-12 flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2
          className={`text-3xl font-semibold ${
            theme === "dark"
              ? "text-white mb-6 bg-teal-500"
              : "text-white bg-indigo-500"
          }  py-2 px-4 rounded-lg shadow-md`}
        >
          Education
        </h2>
        {data?.education?.length > 0 && (
          <div className="mt-4 space-y-6 w-full max-w-4xl">
            {data?.education?.length > 0 &&
              data?.education?.map((qualification, index) => (
                <div key={index}>
                  <motion.div
                    className={`relative ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    }  p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-x-0 md:space-x-6 hover:scale-105 transform transition-all duration-300 ease-in-out`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {qualification?.imageURL && (
                      <div className="relative p-2.5 shrink-0 overflow-hidden w-36 h-36">
                        <Image
                          src={qualification?.imageURL}
                          alt=""
                          width={100}
                          height={100}
                          className="h-full w-full rounded-md md:rounded-lg object-fill"
                        />
                      </div>
                    )}
                    <div className="text-center md:text-left mt-4 md:mt-0">
                      <h3
                        className={`text-xl font-semibold ${
                          theme === "dark" ? "text-teal-500" : "text-indigo-500"
                        } `}
                      >
                        {qualification?.degree}
                      </h3>
                      <p
                        className={`${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        } `}
                      >
                        {qualification?.school}{" "}
                      </p>
                      <p
                        className={`${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        } `}
                      >
                        {new Date(qualification?.start).getFullYear()} -{" "}
                        {new Date(qualification?.end).getFullYear()}
                      </p>

                      <p
                        className={`${
                          theme === "dark" ? "text-gray-300" : "text-gray-500"
                        } `}
                      >
                        {qualification?.grade}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
          </div>
        )}
      </motion.section>

      {/* Certifications Section */}
      {data?.certifications?.length > 0 && (
        <motion.section
          className="w-full py-16 px-6 md:px-16 mt-16 flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl font-semibold ${
              theme === "dark"
                ? "text-white mb-6 bg-teal-500"
                : "text-white bg-indigo-500"
            }  py-2 px-4 rounded-lg shadow-md`}
          >
            Certifications
          </h2>
          <div className="mt-4 space-y-6 w-full max-w-4xl">
            {data?.certifications?.length > 0 &&
              data?.certifications?.map((certification, index) => (
                <div key={index}>
                  <motion.div
                    className={`relative ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    }  p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-x-0 md:space-x-6 hover:scale-105 transform transition-all duration-300 ease-in-out`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {certification?.imageURL && (
                      <div className="relative p-2.5 shrink-0 overflow-hidden w-36 h-36">
                        <Image
                          src={certification?.imageURL}
                          alt={certification?.name}
                          width={100}
                          height={100}
                          className="h-full w-full rounded-md md:rounded-lg object-fill"
                        />
                      </div>
                    )}
                    <div className="text-center md:text-left mt-4 md:mt-0">
                      <h3
                        className={`text-xl font-semibold ${
                          theme === "dark" ? "text-teal-500" : "text-indigo-500"
                        } `}
                      >
                        {certification?.name}
                      </h3>
                      <p
                        className={`${
                          theme === "dark" ? "text-teal-500" : "text-indigo-500"
                        } `}
                      >
                        <span className="font-semibold">Issued by:</span>{" "}
                        <span
                          className={` ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {certification?.organization}
                        </span>
                      </p>
                      <p
                        className={`font-semibold ${
                          theme === "dark" ? "text-teal-500" : "text-indigo-500"
                        } `}
                      >
                        Issued on:{" "}
                        <span
                          className={` ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {new Date(certification?.issued).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long" }
                          )}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default QualificationPage;
