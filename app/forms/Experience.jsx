import React from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi'; // Optional: you can use icons for a more modern UI

const Experience = ({ formik }) => {
  // Function to handle adding a new experience entry
  const handleAddExperience = () => {
    formik.setFieldValue("experience", [
      { title: '', name: '', start: '', end: '', present: false },
      ...formik.values.experience,
    ]);
  };


  // Function to handle removing an experience entry
  const handleRemoveExperience = (index) => {
    const newExperience = formik.values.experience.filter((_, i) => i !== index);
    formik.setFieldValue("experience", newExperience);
  };

  return (
    <>
      <div className="text-center mb-5">
        <h5 className="text-4xl font-semibold text-teal-400">Experience</h5>
      </div>

      {/* Add another experience entry button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center justify-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all"
        >
          <FiPlus className="mr-2" /> Add Another Experience
        </button>
      </div>

      {/* Render dynamic list of experience entries */}
      {formik.values.experience.map((_, index) => (
        <div key={index} className={`mb-6 ${formik.values.experience.length > 1 ? 'border-b border-gray-300 pb-6' : ''}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-3">
              <label htmlFor={`experience[${index}].title`} className="block text-xl font-semibold text-gray-300">Job Title</label>
              <input
                type="text"
                placeholder="Enter Job Title"
                name={`experience[${index}].title`}
                value={formik.values.experience[index].title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor={`experience[${index}].name`} className="block text-xl font-semibold text-gray-300">Company Name</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                name={`experience[${index}].name`}
                value={formik.values.experience[index].name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor={`experience[${index}].start`} className="block text-xl font-semibold text-gray-300">Start Date</label>
              <input
                type="date"
                name={`experience[${index}].start`}
                value={formik.values.experience[index].start}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor={`experience[${index}].end`} className="block text-xl font-semibold text-gray-300">End Date</label>
              <input
                type="date"
                name={`experience[${index}].end`}
                value={formik.values.experience[index].end}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                
                disabled={formik.values.experience[index].present ? true : false}
              />
            </div>
          </div>

          {/* Checkbox for "Currently Working" */}
          <div className="mb-3 inline-flex">
            <input
              type="checkbox"
              name={`experience[${index}].present`}
              checked={formik.values.experience[index].present === 'true' || formik.values.experience[index].present === true}
              onChange={(e) => formik.setFieldValue(`experience[${index}].present`, e.target.checked)}
              onBlur={formik.handleBlur}
              className="mr-2 h-5 w-5 text-teal-500 focus:ring-teal-500"
            />
            <label htmlFor={`experience[${index}].present`} className="text-xl font-semibold text-gray-300">Currently Working</label>
          </div>

          {/* Remove button */}
          {formik.values.experience.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
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

export default Experience;