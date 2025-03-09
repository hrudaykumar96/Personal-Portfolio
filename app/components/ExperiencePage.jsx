"use client"

import React from "react";
import { motion } from "framer-motion";
import { useData } from "../context/contextProvider";
import LoadingSpinner from "../effects/LoadingSpinner";


const ExperiencePage = () => {

  const { data, loading } = useData();

  const experiences = data?.experience?.length > 0
  ? data.experience.map((experience) => {

      const startDate = new Date(experience.start);
      const endDate = experience.present ? 'Present' : new Date(experience.end);
      
      const formattedStart = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      const formattedEnd = endDate === 'Present' 
        ? 'Present' 
        : new Date(endDate).toLocaleString('default', { month: 'long', year: 'numeric' });

      return {
        company: experience.name,
        year: `${formattedStart} - ${formattedEnd}`,
        role: experience.title,
      };
    })
  : [];
  


  if(loading) return <LoadingSpinner/>

  return (
    <div className="w-full min-h-screen bg-gray-900 px-4 py-32 flex flex-col items-center">
      {/* Heading for My Experience */}
      <h1 className="text-4xl font-extrabold text-center text-white mb-12  bg-teal-500 px-4 py-2 rounded-lg shadow-md">
        My Experience
      </h1>

{ data?.experience?.length > 0 && 
      <div className="relative w-full max-w-6xl">
        {/* Vertical Timeline Line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-teal-500 h-full hidden md:block"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 2 }}
        ></motion.div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "md:justify-start justify-center" : "md:justify-end justify-center"
            } relative w-full mb-12 px-4`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Start from left or right
            whileInView={{ opacity: 1, x: 0 }} // Animate to center position
            viewport={{ once: true, amount: 0.5 }} // Start animation when half of the element is in view
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Box Positioned Directly on the Vertical Line */}
            <div
              className={`absolute ${
                index % 2 === 0
                  ? "left-1/2 transform -translate-x-1/2"
                  : "right-1/2 transform translate-x-1/2"
              } top-1/2 -translate-y-1/2 w-6 h-6 bg-teal-500 rounded-full border-2 border-gray-900 hidden md:block`}
            ></div>

            <div className="w-full md:w-2/5 flex md:justify-end justify-center px-0 relative">
              {/* Experience Card */}
              <motion.div
                className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-xl relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Slide from left or right
                whileInView={{ opacity: 1, x: 0 }} // Slide to center
                transition={{ duration: 1, delay: 0.4 }} // Delay for better effect
              >
                <h3 className="text-2xl font-semibold text-teal-500 mb-2">
                  {exp.company}
                </h3>
                <p className="text-gray-400 text-lg">{exp.year}</p>
                <p className="text-gray-300 text-base mt-2">{exp.role}</p>
              </motion.div>

              {/* Arrow Pointing from Box to Timeline Dot */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 ${
                  index % 2 === 0
                    ? "right-0 translate-x-full"
                    : "left-0 -translate-x-full"
                } hidden md:block`}
              >
                <div
                  className={`w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-teal-500 ${
                    index % 2 !== 0 ? "rotate-180" : ""
                  }`}
                ></div>
              </div>
            </div>

            {/* Timeline Dot */}
            <span className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 bg-teal-500 rounded-full border-4 border-gray-900 hidden md:block"></span>
          </motion.div>
        ))}
      </div>
      }
    </div>
  );
};

export default ExperiencePage;