"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub, FaTelegram } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { useData } from "../context/contextProvider";
import LoadingSpinner from "../effects/LoadingSpinner";

const HomePage = () => {
  const [typedReady, setTypedReady] = useState(false);
  const [nameColor, setNameColor] = useState("text-white");
  const { loading, data } = useData();

  

  useEffect(() => {
    setTypedReady(true);

    const rainbowColors = [
      "text-red-500",
      "text-orange-500",
      "text-yellow-500",
      "text-green-500",
      "text-blue-500",
      "text-indigo-500",
      "text-violet-500"
    ];

    let colorIndex = 0;
    const colorChangeInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % rainbowColors.length;
      setNameColor(rainbowColors[colorIndex]);
    }, 1000);

    return () => clearInterval(colorChangeInterval);
  }, []);

  const socialLinks = [
    
    {
      name: 'Facebook',
      href: `${data?.facebook}`,
      icon: <FaFacebook className="h-8 w-8 text-gray-400 hover:text-gray-300" />,
    },
    {
      name: 'LinkedIn',
      href: `${data?.linkedin}`,
      icon: <FaLinkedin className="h-8 w-8 text-gray-400 hover:text-gray-300" />,
    },
    {
      name: 'Instagram',
      href: `${data?.instagram}`,
      icon: <FaInstagram className="h-8 w-8 text-gray-400 hover:text-gray-300" />,
    },
    {
      name: 'GitHub',
      href: `${data?.github}`,
      icon: <FaGithub className="h-8 w-8 text-gray-400 hover:text-gray-300" />,
    },
    {
      name: 'Telegram',
      href: `${data?.telegram}`,
      icon: <FaTelegram className="h-8 w-8 text-gray-400 hover:text-gray-300" />,
    },
  ];


  if(loading) return <LoadingSpinner/>

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 md:px-8">

      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl space-y-8 md:space-y-0 md:space-x-12 gap-5"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center md:text-left text-white space-y-6 md:space-y-8">
          <h4 className="text-lg sm:text-xl font-semibold text-gray-400 uppercase tracking-wider">Hello, I'm</h4>
          
          {/* Name Text with Animated Color Change */}
          <motion.p
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${nameColor}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            { data?.name}
          </motion.p>

          {/* Typewriter Text Animation */}
          {typedReady && (
            <motion.div
              className="relative overflow-hidden text-gray-400 text-xl sm:text-2xl md:text-3xl font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              viewport={{ once: true }}
            >
              I'm a <span></span>
              { data?.technologies?.length > 0 && 
              <ReactTyped
                strings={data?.technologies?.length > 0
                  ? data?.technologies
                  : []}
                typeSpeed={100}
                backSpeed={50}
                backDelay={1000}
                loop={true}
                showCursor={true}
              />
            }
            </motion.div>
          )}

          {/* Social Icons */}
          <motion.div
            className="flex space-x-6 mt-8 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="blank"
                className="transition duration-300 transform hover:scale-110"
                aria-label={link.name}
              >
                {link.icon}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Profile Picture with Hover Animation */}
        <motion.div
          className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mb-8 md:mb-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="rounded-full overflow-hidden w-full h-full border-4 border-teal-500 bg-teal-500">
            { data?.profileURL && 
             <Image
              src={data.profileURL}
              alt="profile"
              width={500}
              height={500}
              className="object-fill w-full h-full transform transition duration-300 ease-in-out hover:scale-110 hover:grayscale hover:shadow-2xl"
              priority
            /> 
}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;