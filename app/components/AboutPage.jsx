"use client";

import Image from "next/image";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion"; 
import { useData } from "../context/contextProvider";
import LoadingSpinner from "../effects/LoadingSpinner";
import Link from 'next/link';

const AboutPage = () => {

  const { data, loading } = useData();

  if(loading) return <LoadingSpinner/>

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center overflow-hidden">
      
      {/* Initial Header / Introduction Section */}
      <motion.section
        className="w-full py-16 px-6 md:px-16 mt-24 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl w-full bg-gray-800 p-8 rounded-lg shadow-xl backdrop-blur-md">
          <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <motion.div
                className="relative w-64 h-64 rounded-lg overflow-hidden mb-6 border-4 border-teal-400 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:grayscale"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                { data?.profileURL && 
                <Image
                  src={data?.profileURL}
                  alt="profile"
                  width={256}
                  height={256}
                  className="object-fill w-full h-full"
                />
              }
              </motion.div>
            </div>

            {/* Info Section */}
            <div className="text-center md:text-left space-y-6">
              <motion.h2
                className="text-4xl font-semibold text-teal-400"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                I'm {data?.name}
              </motion.h2>
              <motion.p
                className="text-xl text-teal-300"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {data?.designation}
              </motion.p>
              <motion.p
                className="text-sm text-gray-300 leading-relaxed text-justify"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {data?.summary}
              </motion.p>
              <Link href={data?.resumeURL || ''} target="_blank">
      <motion.div
        className="py-3 px-8 max-w-fit bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-300 mt-6"
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
            className="text-3xl font-semibold text-teal-400 mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Skills & <span className="text-yellow-500">Abilities</span>
          </motion.h2>
          <div className="w-full bg-gray-800 p-8 rounded-3xl shadow-xl transform transition-all duration-500">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {data?.skills?.length > 0 && data?.skills?.slice()?.reverse()?.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:bg-teal-600 hover:shadow-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-center">
                    <span className="text-teal-500 text-xl font-semibold">{skill}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Info Section (Appears after scrolling into view) */}
      <motion.section
        className="w-full py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-gray-700 p-6 z-50 rounded-xl text-center shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-4xl text-teal-500" />
            </div>
            <h4 className="text-xl text-teal-300">Email</h4>
            <p className="text-lg text-white">{data?.email}</p>
          </motion.div>

          <motion.div
            className="bg-gray-700 p-6 z-50 rounded-xl text-center shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <FaPhoneAlt className="text-4xl text-teal-500" />
            </div>
            <h4 className="text-xl text-teal-300">Mobile</h4>
            <p className="text-lg text-white">+91-{data?.mobile}</p>
          </motion.div>

          <motion.div
            className="bg-gray-700 z-50 p-6 rounded-xl text-center shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
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

export default AboutPage;
