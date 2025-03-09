"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PersonalInformation from "./PersonalInformation";
import EducationalInformation from "./EducationalInformation";
import Certifications from "./Certifications";
import Skills from "./Skills";
import Others from "./Others";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import LoadingSpinner from "../effects/LoadingSpinner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useData } from "../context/contextProvider";
import Experience from "./Experience";
import ButtonLoader from "../effects/ButtonLoader";
import moment from 'moment';

const AdminForm = () => {
  const [steps, setSteps] = useState(1);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputFieldValue, setInputFieldValue] = useState(null);
  const { setData } = useData();
  const router = useRouter();
  const { setIsLogin } = useData();

  // Move to the previous section
  const prevSteps = () => {
    if (steps > 1) {
      setSteps(steps - 1);
    }
  };

  // Fetching data when the component mounts
  useEffect(() => {
    const getuserdata = async () => {
      setLoading(true);
      if (!inputFieldValue) {
        const response = await axios.get(`/api/userdata`);
        if (response?.data?.success) {
          setIsLogin(true);
          setInputFieldValue(response?.data?.success);
          setLoading(false);
          router.push('/administration');
        } else if (response?.data?.error) {
          setIsLogin(false);
          toast.error(response?.data?.error);
          setLoading(false);
          setInputFieldValue(null);
          router.push('/login');
        }
      } else {
        setLoading(false); // Ensure we handle loading state correctly
      }
    };
    getuserdata();
  }, [inputFieldValue]); // Add dependency to ensure re-run on data change

  // Move to the next section
  const nextSteps = () => {
    if (steps < 6) { // Make sure next step is only until step 5
      setSteps(steps + 1);
    }
  };


  // Form submission
  const onSubmit = async (values) => {
    setButtonLoading(true);
    const formData = new FormData();

    // Personal Information
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('designation', values.designation);
    formData.append('profile', values.profile);
    formData.append('address', values.address);
    formData.append('summary', values.summary);

    // Handle Education (Append each field separately)
    values.education?.forEach((edu, index) => {
      formData.append(`education[${index}].school`, edu.school || "");
      formData.append(`education[${index}].degree`, edu.degree || "");
      formData.append(`education[${index}].field`, edu.field || "");
      formData.append(`education[${index}].grade`, edu.grade || "");
      formData.append(`education[${index}].start`, edu.start || "");
      formData.append(`education[${index}].end`, edu.end || "");
      
      // If an image exists, append it separately
      if (edu.image) {
        formData.append(`education[${index}].image`, edu.image);
      }
    });

    // Handle Certifications (Append each field separately)
    values.certifications?.forEach((cert, index) => {
      formData.append(`certifications[${index}].name`, cert.name || "");
      formData.append(`certifications[${index}].organization`, cert.organization || "");
      formData.append(`certifications[${index}].issued`, cert.issued || "");
      
      // If an image exists, append it separately
      if (cert.image) {
        formData.append(`certifications[${index}].image`, cert.image);
      }
    });

    // Handle Experience (Append each field separately)
    values.experience?.forEach((exp, index) => {
      formData.append(`experience[${index}].title`, exp.title || "");
      formData.append(`experience[${index}].name`, exp.name || "");
      formData.append(`experience[${index}].start`, exp.start || "");
      formData.append(`experience[${index}].end`, exp.end || "");
      formData.append(`experience[${index}].present`, exp.present || "");
    });

    // Handle Skills
    values.skills?.forEach((skill) => {
      formData.append('skills', skill);
    });

    // Handle Social Links
    formData.append('facebook', values.facebook);
    formData.append('instagram', values.instagram);
    formData.append('linkedin', values.linkedin);
    formData.append('telegram', values.telegram);
    formData.append('github', values.github);
    formData.append('resume', values.resume);

    // Handle Technologies
    const technologies = Array.isArray(values.technologies) ? values.technologies : [values.technologies];
    technologies.forEach((tech) => {
      formData.append('technologies', tech);
    });



      const response = await axios.post("/api/updatedata", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      if (response?.data?.success) {
        setInputFieldValue(response?.data?.success);
        setData(response?.data?.success);
        toast.success("Data updated successfully");
        setButtonLoading(false);
        // Redirect after submission
      } else if(response?.data?.error){
        toast.error(response?.data?.error);
        setButtonLoading(false);
      }
  };

  const formik = useFormik({
    initialValues: {
      name: inputFieldValue?.name || "",
      email: inputFieldValue?.email || "",
      mobile: inputFieldValue?.mobile || "",
      designation: inputFieldValue?.designation || "",
      profile: inputFieldValue?.profile || null,
      address: inputFieldValue?.address || "",
      summary: inputFieldValue?.summary || "",
      education: inputFieldValue?.education || [{ school: "", degree: "", field: "", grade: "", start: "", end: "", image: null }],
      certifications: inputFieldValue?.certifications || [{ name: "", organization: "", issued: "", image: null }],
      experience: inputFieldValue?.experience || [{ title: "", name: "", start: "", end: "", present: "" }],
      skills: inputFieldValue?.skills || [],
      facebook: inputFieldValue?.facebook || "",
      instagram: inputFieldValue?.instagram || "",
      linkedin: inputFieldValue?.linkedin || "",
      telegram: inputFieldValue?.telegram || "",
      github: inputFieldValue?.github || "",
      resume: inputFieldValue?.resume || null,
      technologies: inputFieldValue?.technologies || [],
    },
    onSubmit: (values) => onSubmit(values), // Calling onSubmit function to handle submission
  });

  // Handle file upload for certifications images
  const handleCertificationImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue(`certifications[${index}].image`, file);
    }
  };

  useEffect(() => {
    if (inputFieldValue) {
      formik.setFieldValue("name", inputFieldValue?.name || "");
      formik.setFieldValue("email", inputFieldValue?.email || "");
      formik.setFieldValue("mobile", inputFieldValue?.mobile || "");
      formik.setFieldValue("designation", inputFieldValue?.designation || "");
      formik.setFieldValue("address", inputFieldValue?.address || "");
      formik.setFieldValue("summary", inputFieldValue?.summary || "");

      formik.setFieldValue("education", inputFieldValue?.education?.map((educationItem) => {
        return {
          ...educationItem,
          start: educationItem.start ? moment(educationItem.start).format('YYYY-MM-DD') : "",
          end: educationItem.end ? moment(educationItem.end).format('YYYY-MM-DD') : "",
        };
      }) || [{ school: "", degree: "", field: "", grade: "", start: "", end: "", image: null }]);

      formik.setFieldValue("certifications", inputFieldValue?.certifications?.map((certificationItem) => {
        return {
          ...certificationItem,
          issued: certificationItem.issued ? moment(certificationItem.issued).format('YYYY-MM-DD') : "",
        };
      }) || [{ name: "", organization: "", issued: "", image: null }]);

      formik.setFieldValue("experience", inputFieldValue?.experience?.map((experienceItem) => {
        return {
          ...experienceItem,
          start: experienceItem.start ? moment(experienceItem.start).format('YYYY-MM-DD') : "",
          end: experienceItem.end ? moment(experienceItem.end).format('YYYY-MM-DD') : "", 
        };
      }) || [{ title: "", name: "", start: "", end: "", present: "" }]);

      formik.setFieldValue("skills", inputFieldValue?.skills || []);
      formik.setFieldValue("facebook", inputFieldValue?.facebook || "");
      formik.setFieldValue("instagram", inputFieldValue?.instagram || "");
      formik.setFieldValue("linkedin", inputFieldValue?.linkedin || "");
      formik.setFieldValue("telegram", inputFieldValue?.telegram || "");
      formik.setFieldValue("github", inputFieldValue?.github || "");
      formik.setFieldValue("resume", inputFieldValue?.resume || null);
      formik.setFieldValue("technologies", inputFieldValue?.technologies || []);
    }
  }, [inputFieldValue]);


  if (loading || buttonLoading){
    return <LoadingSpinner />
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full flex items-center justify-center text-white">
      <section className="w-full py-8 px-4 sm:px-6 md:px-16 mt-24 flex flex-col justify-center items-center">
        <form
          className="max-w-6xl w-full bg-gray-800 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-xl backdrop-blur-md"
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          {/* Personal information */}
          {steps === 1 && <PersonalInformation formik={formik} />}

          {/* Educational information */}
          {steps === 2 && <EducationalInformation formik={formik} />}

          {/* Certifications */}
          {steps === 3 && (
            <Certifications
              formik={formik}
              handleCertificationImageChange={handleCertificationImageChange}
            />
          )}

            {/* Experience */}
          {steps === 4 && <Experience formik={formik} />}

          {/* skills */}
          {steps === 5 && <Skills formik={formik} />}

          {/* Other Information */}
          {steps === 6 && <Others formik={formik} />}

          <div className="flex items-center justify-between mt-6 sm:mt-8">
            {/* Prev Button - Left */}
            {steps !== 1 && (
              <button
                type="button"
                onClick={prevSteps}
                className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold bg-teal-500 hover:bg-teal-600 rounded-lg transition duration-200 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Prev
              </button>
            )}

            {/* Next / Submit Button - Right */}
            <div className="ml-auto">
              {steps !== 6 ? (
                <button
                  type="button"
                  onClick={nextSteps}
                  className="px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold bg-teal-500 hover:bg-teal-600 rounded-lg transition duration-200 flex items-center"
                >
                  Next <FaArrowRight className="ml-2" />
                </button>
              ) : (
                 buttonLoading ? <ButtonLoader/> : 
                <input
                  type="submit"
                  value="Submit"
                  className="cursor-pointer px-4 py-2 sm:px-6 sm:py-3 text-lg sm:text-xl font-semibold bg-teal-500 hover:bg-teal-600 rounded-lg transition duration-200"
                />
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AdminForm;
