"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../effects/Loader";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Cloudinary = () => {
  const [loading, setLoading] = useState(true);
  const [cloudinaryData, setCloudinaryData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/cloudinaryreports");
      if (response?.data?.success) {
        setCloudinaryData(response?.data.success);
      }
    } catch (error) {
      setCloudinaryData(null);
      toast.error('Please try again later')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const convertToMB = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const freePlanLimits = {
    storage: 5 * 1024 * 1024 * 1024,
    bandwidth: 20 * 1024 * 1024 * 1024,
    requests: 25000,
    creditLimit: 25,
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Cloudinary Usage Report
      </h1>
      {cloudinaryData ? (
        <>
          <div className="w-full max-w-4xl mx-auto mb-8 bg-white p-4 rounded-lg shadow">
            <Bar
              data={{
                labels: [
                  "Bandwidth (MB)",
                  "Storage (MB)",
                  "Requests",
                  "Credits",
                ],
                datasets: [
                  {
                    label: "Usage Data",
                    data: [
                      convertToMB(cloudinaryData?.bandwidth?.usage || 0),
                      convertToMB(cloudinaryData?.storage?.usage || 0),
                      cloudinaryData?.requests || 0,
                      cloudinaryData?.credits?.usage || 0,
                    ],
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                  },
                  {
                    label: "Free Plan Limits",
                    data: [
                      convertToMB(freePlanLimits.bandwidth),
                      convertToMB(freePlanLimits.storage),
                      freePlanLimits.requests,
                      freePlanLimits.creditLimit,
                    ],
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: { position: "top" },
                },
                layout: {
                  padding: 10,
                },
              }}
            />
          </div>

          <div className="metrics-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Bandwidth Usage</strong>
              <p className="text-lg">
                {convertToMB(cloudinaryData?.bandwidth?.usage)} MB
              </p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Credits Usage</strong>
              <p className="text-lg">{cloudinaryData?.credits?.usage}</p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Impressions</strong>
              <p className="text-lg">{cloudinaryData?.impressions?.usage}</p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Plan</strong>
              <p className="text-lg">{cloudinaryData?.plan || "Free"}</p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Last Updated</strong>
              <p className="text-lg">
                {formatDate(cloudinaryData?.last_updated)}
              </p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Storage Usage</strong>
              <p className="text-lg">
                {convertToMB(cloudinaryData?.storage?.usage)} MB
              </p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Requests</strong>
              <p className="text-lg">{cloudinaryData?.requests}</p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Free Plan Storage Limit</strong>
              <p className="text-lg">
                {convertToMB(freePlanLimits.storage)} MB
              </p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">
                Free Plan Bandwidth Limit
              </strong>
              <p className="text-lg">
                {convertToMB(freePlanLimits.bandwidth)} MB
              </p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">
                Free Plan Requests Limit
              </strong>
              <p className="text-lg">{freePlanLimits.requests}</p>
            </div>
            <div className="metric-card p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <strong className="text-gray-700">Free Plan Credit Limit</strong>
              <p className="text-lg">{freePlanLimits.creditLimit} credits</p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-700">No data available</div>
      )}
    </div>
  );
};

export default Cloudinary;