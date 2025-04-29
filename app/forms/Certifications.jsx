import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import Image from "next/image";

const Certifications = ({ formik, data, theme }) => {
  // Function to handle adding a new certification entry
  const handleAddCertification = () => {
    formik.setFieldValue("certifications", [
      { name: "", organization: "", issued: "", image: null },
      ...formik.values.certifications,
    ]);
  };

  // Function to handle removing a certification entry
  const handleRemoveCertification = (index) => {
    const newCertifications = formik.values.certifications.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("certifications", newCertifications);
  };

  // Function to handle file change and reset input value to show "Choose File"
  const handleFileChange = (e, index) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue(`certifications[${index}].image`, file);
    // Reset the input field value to show "Choose File" after file is selected
    e.target.value = "";
  };

  return (
    <>
      <div className="text-center mb-5">
        <h5
          className={`text-4xl font-semibold ${
            theme === "dark" ? "text-teal-400" : "text-indigo-600"
          } `}
        >
          Certifications
        </h5>
      </div>

      {/* Add another certification entry button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddCertification}
          className={`flex items-center justify-center ${
            theme === "dark"
              ? "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          } font-semibold py-2 px-4 rounded-lg  focus:outline-none focus:ring-2  focus:ring-opacity-50 transition-all`}
        >
          <FiPlus className="mr-2" /> Add Another Certification
        </button>
      </div>

      {/* Render dynamic list of certification entries */}
      {formik.values.certifications.map((_, index) => (
        <div
          key={index}
          className={`mb-6 ${
            formik.values.certifications.length > 1
              ? "border-b border-gray-300 pb-6"
              : ""
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-3">
              <label
                htmlFor={`certifications[${index}].name`}
                className={`block text-xl font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } `}
              >
                Certification Name
              </label>
              <input
                type="text"
                placeholder="Enter Certification name"
                name={`certifications[${index}].name`}
                value={formik.values.certifications[index].name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-4 rounded-lg
                  ${
                    theme === "dark"
                      ? "bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                      : "bg-gray-300 text-black"
                  }`}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor={`certifications[${index}].organization`}
                className={`block text-xl font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } `}
              >
                Issuing Organization
              </label>
              <input
                type="text"
                placeholder="Enter Issuing organization"
                name={`certifications[${index}].organization`}
                value={formik.values.certifications[index].organization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-4 rounded-lg
                  ${
                    theme === "dark"
                      ? "bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                      : "bg-gray-300 text-black"
                  }`}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor={`certifications[${index}].start`}
                className={`block text-xl font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } `}
              >
                Issued Date
              </label>
              <input
                type="date"
                placeholder="Enter Issued Date"
                name={`certifications[${index}].issued`}
                value={formik.values.certifications[index].issued}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-4 rounded-lg
                  ${
                    theme === "dark"
                      ? "bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                      : "bg-gray-300 text-black"
                  }`}
              />
            </div>
          </div>

          {/* Image input */}
          <div className="mb-6">
            <label
              htmlFor={`certifications[${index}].image`}
              className={`block text-xl font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } `}
            >
              Image
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              name={`certifications[${index}].image`}
              onChange={(e) => handleFileChange(e, index)} // Handle file change
              className={`w-full p-4 rounded-lg
                ${
                  theme === "dark"
                    ? "bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                    : "bg-gray-300 text-black"
                }`}
            />
          </div>

          {/* Show image preview after uploading */}
          {formik?.values?.certifications[index]?.image ? (
            <div className="mt-4">
              <Image
                src={URL.createObjectURL(
                  formik?.values?.certifications[index]?.image
                )}
                alt="Education image preview"
                width={200}
                height={150}
                className="w-60 h-50"
              />
            </div>
          ) : data?.certifications?.[index]?.imageURL ? (
            <div className="mt-4">
              <Image
                src={data?.certifications[index]?.imageURL}
                alt="Saved education image"
                width={200}
                height={150}
                className="w-60 h-50"
              />
            </div>
          ) : null}

          {/* Remove button */}
          {formik.values.certifications.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveCertification(index)}
                className="flex items-center text-red-500 font-semibold hover:text-red-600 focus:outline-none transition-all"
              >
                <FiTrash className="mr-2" /> Remove
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Certifications;