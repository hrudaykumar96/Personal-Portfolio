"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import LoadingSpinner from "../effects/LoadingSpinner";
import { useData } from "../context/contextProvider";
import {
  FaBriefcase,
} from "react-icons/fa";

const ExperiencePage = () => {
  const { loading, data, theme } = useData();

  if (loading) return <LoadingSpinner />;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`w-full min-h-screen px-4 py-8 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <motion.section
        className="w-full py-16 px-4 md:px-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2
          className={`text-3xl font-semibold mb-10 py-2 px-4 rounded-lg shadow-md flex items-center ${
            theme === "dark"
              ? "bg-teal-500 text-white"
              : "bg-indigo-500 text-white"
          }`}
        >
          <span className="mr-2"><FaBriefcase/></span>
          Experience
        </h2>

        {data?.experience?.length > 0 && (
          <VerticalTimeline
            lineColor={theme === "dark" ? "#4B5563" : "#6c7a8f"}
          >
            {data.experience.map((experience, index) => {
              const start = new Date(experience.start).toLocaleString(
                "default",
                {
                  month: "long",
                  year: "numeric",
                }
              );
              const end = experience.present
                ? "Present"
                : new Date(experience.end).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  });

              return (
                <VerticalTimelineElement
                  key={index}
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: theme === "dark" ? "#1F2937" : "#fff",
                    color: theme === "dark" ? "#fff" : "#000",
                    borderRadius: "1rem",
                    position: "relative",
                    boxShadow: "0 6px 15px rgba(55, 65, 81, 0.3)",
                  }}
                  contentArrowStyle={{
                    borderRight: `10px solid ${
                      theme === "dark" ? "#1F2937" : "#fff"
                    }`,
                    boxShadow: "none",
                  }}
                  iconStyle={{
                    background: "transparent",
                    boxShadow: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0",
                  }}
                  icon={
                    <div className="relative rounded-full overflow-hidden">
                      <Image
                        src={experience.imageURL}
                        alt={experience.name}
                        width={48}
                        height={48}
                      />
                    </div>
                  }
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={itemVariants}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex flex-col"
                  >
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        theme === "dark" ? "text-teal-400" : "text-indigo-600"
                      }`}
                    >
                      {experience.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-700"
                      }  mb-1`}
                    >
                      {experience.title}
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-700"
                      }  mb-1 italic`}
                    >
                      {start} - {end}
                    </p>
                  </motion.div>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        )}
      </motion.section>
    </div>
  );
};

export default ExperiencePage;
