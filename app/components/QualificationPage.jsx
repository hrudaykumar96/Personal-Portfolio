"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useData } from '../context/contextProvider';

const QualificationPage = () => {

  const { data } = useData();

  return (
    <div className="w-full min-h-screen bg-gray-900 px-4 py-8">

      {/* Education Section */}
      <motion.section
        className="w-full py-16 px-6 md:px-16 mt-12 flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-white mb-6 bg-teal-500 py-2 px-4 rounded-lg shadow-md">
          Education
        </h2>
        { data?.education?.length > 0 && 
        <div className="mt-4 space-y-6 w-full max-w-4xl">

          { data?.education?.length > 0 && data?.education?.map((qualification, index) =>(
            <div key={index}>
            <motion.div
            className="bg-gray-800 text-white p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-x-0 md:space-x-6 hover:scale-105 transform transition-all duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            { qualification?.imageURL && 
            <Image
              src={qualification?.imageURL}
              alt=""
              width={100}
              height={100}
              className="object-fill mix-blend-multiply w-24 h-24 md:w-32 md:h-32"
            />
          }
            <div className="text-center md:text-left mt-4 md:mt-0">
              <h3 className="text-xl font-semibold text-teal-500">
                {qualification?.degree}
              </h3>
              <p className="text-gray-400">
  {qualification?.school} | {new Date(qualification?.start).getFullYear()} - {new Date(qualification?.end).getFullYear()}
</p>

              <p className="text-gray-300">{qualification?.grade}</p>
            </div>
          </motion.div>
          </div>
          ))}
          
        </div>
        }
      </motion.section>

      {/* Certifications Section */}
{ data?.certifications?.length > 0 && 
      <motion.section
        className="w-full py-16 px-6 md:px-16 mt-16 flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-white mb-6 bg-teal-500 py-2 px-4 rounded-lg shadow-md">
          Certifications
        </h2>
        <div className="mt-4 space-y-6 w-full max-w-4xl">

          { data?.certifications?.length > 0 && data?.certifications?.map((certification, index)=>(
            <div key={index}>
            <motion.div
            className="bg-gray-800 text-white p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-x-0 md:space-x-6 hover:scale-105 transform transition-all duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            { certification?.imageURL && 
            <Image
              src={certification?.imageURL}
              alt={certification?.name}
              width={100}
              height={100}
              className="object-fill mix-blend-multiply w-24 h-24 md:w-32 md:h-32"
            />
          }
            <div className="text-center md:text-left mt-4 md:mt-0">
              <h3 className="text-xl font-semibold text-teal-500">
                {certification?.name}
              </h3>
              <p className="text-teal-500">
                <span className="font-semibold">Issued by:</span> <span className="text-gray-300">{certification?.organization}</span>
              </p>
              <p className="font-bold text-teal-500">Issued on: <span className='text-gray-300 '>{new Date(certification?.issued).getFullYear()}</span></p>
            </div>
          </motion.div>
          </div>
          ))}        

          
        </div>
      </motion.section>
      }
    </div>
  );
};

export default QualificationPage;