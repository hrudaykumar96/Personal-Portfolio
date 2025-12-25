"use client";

import Image from "next/image";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useData } from "../context/contextProvider";
import LoadingSpinner from "../effects/LoadingSpinner";
import Link from "next/link";
import { FaServer, FaGlobe, FaLaptopCode } from "react-icons/fa";

const AboutPage = () => {
  const { data, loading, theme } = useData();

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } min-h-screen flex flex-col items-center overflow-hidden`}
    >
      <motion.section
        className="w-full py-16 px-6 md:px-16 mt-24 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          className={`max-w-6xl w-full ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } p-8 rounded-lg shadow-xl backdrop-blur-md`}
        >
          <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <motion.div
                className={`relative w-64 h-64 rounded-lg overflow-hidden mb-6 border-4 ${
                  theme === "dark" ? "border-teal-400" : "shadow-lg"
                }  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:grayscale`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {data?.profileURL && (
                  <Image
                    src={data?.profileURL}
                    alt="profile"
                    width={256}
                    height={256}
                    className="object-fill w-full h-full"
                  />
                )}
              </motion.div>
            </div>

            {/* Info Section */}
            <div className="text-center md:text-left space-y-6">
              <motion.h2
                className={`text-4xl font-semibold ${
                  theme === "dark" ? "text-teal-400" : "text-indigo-600"
                } `}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                I'm {data?.name}
              </motion.h2>
              <motion.p
                className={`text-xl ${
                  theme === "dark" ? "text-teal-300" : "text-indigo-500"
                } `}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {data?.designation}
              </motion.p>
              <motion.p
                className={`text-sm normal-case ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }  leading-relaxed text-justify`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {data?.summary}
              </motion.p>
              <Link href={data?.resumeURL || ""} target="_blank">
                <motion.div
                  className={`py-3 px-8 max-w-fit ${
                    theme === "dark"
                      ? "bg-teal-500 hover:bg-teal-600"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }  text-white font-semibold rounded-lg  transition-all duration-300 mt-6`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Download Resume
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section (Appears after scrolling into view) */}
      <motion.section
        className="skills py-16 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className={`text-3xl font-semibold flex items-center justify-center ${
              theme === "dark" ? "text-teal-400" : "text-indigo-600"
            }  mb-8`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="mr-2">
              <FaLaptopCode />
            </span>
            Skills&nbsp;&&nbsp;
            <span className="text-yellow-500">Abilities</span>
          </motion.h2>
          <div
            className={`w-full ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }  p-8 rounded-3xl shadow-xl transform transition-all duration-500`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {data?.skills?.length > 0 &&
                data?.skills?.map((skill, index) => (
                  <motion.div
                    key={index}
                    className={`${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-teal-600"
                        : "bg-indigo-50 hover:bg-indigo-100"
                    }  rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="text-center flex flex-col gap-3 items-center">
                      <span
                        className={`${
                          theme === "dark" ? "text-teal-500" : "text-indigo-600"
                        }  text-xl font-semibold`}
                      >
                        {skill?.name}
                      </span>
                      {skill?.imageURL && (
                        <Image
                          src={skill?.imageURL || null}
                          alt={skill?.name || null}
                          width={256}
                          height={100}
                          className="object-fill w-20 h-20"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
