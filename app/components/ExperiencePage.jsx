"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useData } from "../context/contextProvider";
import LoadingSpinner from "../effects/LoadingSpinner";

const ExperiencePage = () => {
  const { loading, data, theme } = useData();

  if(loading) return <LoadingSpinner/>

  return (
    <div
      className={`w-full min-h-screen px-4 py-8 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Experience Section */}
      <motion.section
        className={`w-full py-16 px-6 md:px-16 mt-12 flex flex-col items-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2
          className={`text-3xl font-semibold ${
            theme === "dark" ? "bg-teal-500" : "bg-indigo-500"
          } mb-6 text-white py-2 px-4 rounded-lg shadow-md`}
        >
          Experience
        </h2>
        {data?.experience?.length > 0 && (
          <div className="mt-4 space-y-6 w-full max-w-4xl">
            {data?.experience?.map((experience, index) => (
              <div key={index} className="w-full">
                <motion.div
                  className={`relative ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } text-white p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6 transition-transform transform hover:scale-105`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Image Section */}
                  {experience?.imageURL && (
                    <div className="relative w-60 h-36 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={experience?.imageURL}
                        alt={experience?.name}
                        width={120}
                        height={120}
                        className="h-full w-full object-fill rounded-lg"
                      />
                    </div>
                  )}

                  {/* Text Content Section */}
                  <div className="text-center md:text-left w-full">
                    <h3 className={`text-2xl font-semibold ${theme === "dark" ? "text-teal-500" : "text-indigo-500"}  mb-2`}>
                      {experience?.name}
                    </h3>
                    <p className="text-lg text-gray-400 mb-2">
                      {experience?.title} |{" "}
                      {new Date(experience?.start).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {experience?.present
                        ? "Present"
                        : new Date(experience?.end).toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                          })}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default ExperiencePage;