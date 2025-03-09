import React from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi'; 

const Skills = ({ formik }) => {
  // Function to handle adding a new skill entry at the top
  const handleAddSkill = () => {
    formik.setFieldValue("skills", ['', ...formik.values.skills]);
  };

  // Function to handle removing a skill entry
  const handleRemoveSkill = (index) => {
    const newSkills = formik.values.skills.filter((_, i) => i !== index);
    formik.setFieldValue("skills", newSkills);
  };

  return (
    <>
      <div className="text-center mb-5">
        <h5 className="text-4xl font-semibold text-teal-400">Skills</h5>
      </div>

      {/* Add another skill button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddSkill}
          className="flex items-center justify-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all"
        >
          <FiPlus className="mr-2" /> Add Another Skill
        </button>
      </div>

      {/* Render dynamic list of skill entries */}
      {formik.values.skills.map((skill, index) => (
        <div key={index} className={`mb-6 ${formik.values.skills.length > 1 ? 'border-b border-gray-300 pb-6' : ''}`}>
          <div className="mb-3">
            <label htmlFor={`skills[${index}]`} className="block text-xl font-semibold text-gray-300">Skill</label>
            <input
              type="text"
              placeholder="Enter Skill"
              name={`skills[${index}]`}
              value={skill}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Remove button */}
          {formik.values.skills.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
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

export default Skills;