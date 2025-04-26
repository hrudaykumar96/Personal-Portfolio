"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useData } from '../context/contextProvider';

const ExperiencePage = () => {
  const { data } = useData();

  return (
    <div className="w-full min-h-screen bg-gray-900 px-4 py-8">
      {/* Experience Section */}
      <motion.section
        className="w-full py-16 px-6 md:px-16 mt-12 flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-white mb-6 bg-teal-500 py-2 px-4 rounded-lg shadow-md">
          Experience
        </h2>
        {data?.education?.length > 0 && (
          <div className="mt-4 space-y-6 w-full max-w-4xl">
            {data?.experience?.length > 0 &&
              data?.experience?.map((experience, index) => (
                <div key={index} className="w-full">
                  <motion.div
                    className="relative bg-gray-800 text-white p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6 transition-transform transform hover:scale-105"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {/* Image Section */}
                    {experience?.imageURL && (
                      <div className="relative w-52 h-32 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={experience?.imageURL}
                          alt={experience?.name}
                          width={120}
                          height={120}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Text Content Section */}
                    <div className="text-center md:text-left w-full">
                      <h3 className="text-2xl font-semibold text-teal-500 mb-2">
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
                          : new Date(experience?.end).toLocaleString(
                              "default",
                              {
                                month: "long",
                                year: "numeric",
                              }
                            )}
                      </p>
                      <p className="text-gray-300 text-base">{experience?.grade}</p>
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
