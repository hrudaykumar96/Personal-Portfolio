import React from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import Image from 'next/image';

const EducationalInformation = ({ formik }) => {
  // Function to handle adding a new education entry

  const handleAddEducation = () => {
    formik.setFieldValue("education", [
      { school: '', degree: '', field: '', grade: '', start: '', end: '', image: null },
      ...formik.values.education,
    ]);
  };

  // Function to handle removing an education entry
  const handleRemoveEducation = (index) => {
    const newEducation = formik.values.education.filter((_, i) => i !== index);
    formik.setFieldValue("education", newEducation);
  };

  return (
    <>
      <div className="text-center mb-5">
        <h5 className="text-4xl font-semibold text-teal-400">Educational Information</h5>
      </div>

      {/* Add another education entry button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center justify-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all"
        >
          <FiPlus className="mr-2" /> Add Another
        </button>
      </div>

      {/* Render dynamic list of education entries */}
      {formik.values.education.map((_, index) => (
        <div key={index} className={`mb-6 ${formik.values.education.length > 1 ? 'border-b border-gray-300 pb-6' : ''}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-3">
              <label htmlFor={`education[${index}].school`} className="block text-xl font-semibold text-gray-300">School</label>
              <input
                type="text"
                placeholder="Enter School Name"
                name={`education[${index}].school`}
                value={formik.values.education[index].school}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor={`education[${index}].degree`} className="block text-xl font-semibold text-gray-300">Degree</label>
              <input
                type="text"
                placeholder="Enter Degree Name"
                name={`education[${index}].degree`}
                value={formik.values.education[index].degree}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor={`education[${index}].field`} className="block text-xl font-semibold text-gray-300">Field of Study</label>
              <input
                type="text"
                placeholder="Enter Field of Study"
                name={`education[${index}].field`}
                value={formik.values.education[index].field}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor={`education[${index}].grade`} className="block text-xl font-semibold text-gray-300">Grade</label>
              <input
                type="text"
                placeholder="Enter Grade"
                name={`education[${index}].grade`}
                value={formik.values.education[index].grade}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor={`education[${index}].start`} className="block text-xl font-semibold text-gray-300">Start Date</label>
              <input
                type="date"
                name={`education[${index}].start`}
                value={formik.values.education[index].start}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor={`education[${index}].end`} className="block text-xl font-semibold text-gray-300">End Date</label>
              <input
                type="date"
                name={`education[${index}].end`}
                value={formik.values.education[index].end}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>
          </div>

          {/* File input */}
          <div className="mb-6">
            <label htmlFor={`education[${index}].image`} className="block text-xl font-semibold text-gray-300">Image</label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              name={`education[${index}].image`}
              onChange={(e) => formik.setFieldValue(`education[${index}].image`, e.currentTarget.files[0])}
              className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          {formik.values.education[index].image && (
                      <div className="mt-4">
                        <Image
                          src={URL.createObjectURL(formik.values.education[index].image)}
                          alt="Certification image preview"
                          width={200} height={150}
                          className="w-60 h-50"
                        />
                      </div>
                    )}

          {/* Remove button */}
          {formik.values.education.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
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

export default EducationalInformation;