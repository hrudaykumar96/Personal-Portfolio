import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";

const Documents = ({ userData, setUserData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    const validTypes = ["application/pdf"];

    if (selected && validTypes.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please upload a valid document (PDF, DOC, DOCX).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!file) {
      setLoading(false);
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response?.data;

    if (data?.success) {
      setUserData(data.success);
      setFile(null);
      toast.success("Uploaded successfully!");
    } else if (data?.error) {
      toast.error(data.error);
    } else {
      toast.error("Unexpected server response.");
    }

    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload Your Resume
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${
              error ? "border-red-500" : "border-gray-300"
            } rounded cursor-pointer hover:border-blue-500 transition`}
          >
            <input
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <p className="text-gray-500 text-sm">
              Drag & drop or{" "}
              <span className="text-blue-500 underline">browse</span> your file
            </p>
            {file && <p className="mt-2 text-green-600 text-sm">{file.name}</p>}
          </label>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Upload
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Accepted: PDF, DOC, DOCX | Max: 5MB
          </p>
        </form>
      </div>
      <div className="flex justify-center mt-4">
        {userData?.resumeURL && (
          <Link
            href={userData?.resumeURL}
            target="_blank"
            className="flex items-center justify-center text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition w-fit px-4"
          >
            <FaDownload className="mr-2" />
            Download
          </Link>
        )}
      </div>
    </div>
  );
};

export default Documents;