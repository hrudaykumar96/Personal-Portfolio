import React from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi'; // Optional: you can use icons for better UI

const Others = ({ formik }) => {
  // Function to handle adding a new technology entry at the top
  const handleAddTechnology = () => {
    // Ensure `technologies` is initialized as an array
    const newTechnologies = formik.values.technologies ? [...formik.values.technologies] : [];
    formik.setFieldValue("technologies", ['', ...newTechnologies]); // Add new technology at the top
  };

  // Function to handle removing a technology entry
  const handleRemoveTechnology = (index) => {
    const newTechnologies = formik.values.technologies.filter((_, i) => i !== index);
    formik.setFieldValue("technologies", newTechnologies);
  };

  return (
    <>
      <div className="text-center mb-5">
        <h5 className="text-4xl font-semibold text-teal-400">Links & Tags</h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Other social links input fields (Facebook, Instagram, etc.) */}
        <div className="mb-3">
          <label htmlFor="facebook" className="block text-xl font-semibold text-gray-300">Facebook</label>
          <input
            type="text"
            placeholder="Enter Facebook Link"
            name="facebook"
            value={formik.values.facebook || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="instagram" className="block text-xl font-semibold text-gray-300">Instagram</label>
          <input
            type="text"
            placeholder="Enter Instagram Link"
            name="instagram"
            value={formik.values.instagram || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="linkedin" className="block text-xl font-semibold text-gray-300">Linkedin</label>
          <input
            type="text"
            placeholder="Enter Linkedin Link"
            name="linkedin"
            value={formik.values.linkedin || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telegram" className="block text-xl font-semibold text-gray-300">Telegram</label>
          <input
            type="text"
            placeholder="Enter Telegram Link"
            name="telegram"
            value={formik.values.telegram || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="github" className="block text-xl font-semibold text-gray-300">Github</label>
          <input
            type="text"
            placeholder="Enter Github Link"
            name="github"
            value={formik.values.github || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="resume" className="block text-xl font-semibold text-gray-300">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,application/pdf"
            name="resume"
            onChange={(e) => formik.setFieldValue("resume", e.currentTarget.files[0])}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Technologies List Section */}
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddTechnology}
          className="flex items-center justify-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all"
        >
          <FiPlus className="mr-2" /> Add Technology
        </button>
      </div>

      {/* Render dynamic list of technologies */}
      {formik.values.technologies && formik.values.technologies.map((technology, index) => (
        <div key={index} className={`mb-6 ${formik.values.technologies.length > 1 ? 'border-b border-gray-300 pb-6' : ''}`}>
          <div className="mb-3">
            <label htmlFor={`technologies[${index}]`} className="block text-xl font-semibold text-gray-300">Technology</label>
            <input
              type="text"
              placeholder="Enter Technology"
              name={`technologies[${index}]`}
              value={technology || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Remove button */}
          {formik.values.technologies.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveTechnology(index)}
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

export default Others;