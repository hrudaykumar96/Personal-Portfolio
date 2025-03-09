import React from 'react';

const PersonalInformation = ({ formik }) => {
  return (
    <>
      <div className="text-center mb-5">
        <h5 className="text-4xl font-semibold text-teal-400">Personal Information</h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="mb-3">
          <label htmlFor="name" className="block text-xl font-semibold text-gray-300">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block text-xl font-semibold text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobile" className="block text-xl font-semibold text-gray-300">Mobile</label>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="designation" className="block text-xl font-semibold text-gray-300">Designation</label>
          <input
            type="text"
            placeholder="Enter your Designation"
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="profile" className="block text-xl font-semibold text-gray-300">Profile</label>
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp"
          name="profile"
          onChange={(e) => formik.setFieldValue("profile", e.currentTarget.files[0])}
          onBlur={formik.handleBlur}
          className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          
        />
      </div>

      <div className="mb-3">
        <label htmlFor="location" className="block text-xl font-semibold text-gray-300">Address</label>
        <textarea
          placeholder="Enter Your Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          
        />
      </div>

      <div className="mb-3">
        <label htmlFor="summary" className="block text-xl font-semibold text-gray-300">Summary</label>
        <textarea
          placeholder="Enter Profile Summary"
          name="summary"
          value={formik.values.summary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
          
        />
      </div>
    </>
  );
};

export default PersonalInformation;