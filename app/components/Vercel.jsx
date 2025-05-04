"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaGithub, FaCloud } from "react-icons/fa";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DEPLOYMENT_LIMIT = 10;

const Vercel = () => {
  const [loading, setLoading] = useState(true);
  const [vercel, setVercel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/vercelreports");
        if (response?.data?.success) {
          setVercel(response.data.success);
        } else {
          toast.error("No Vercel data found");
        }
      } catch {
        toast.error("Failed to fetch Vercel data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  const project = vercel?.[0];
  const deployments = project?.latestDeployments || [];
  const deployment = deployments?.[0];
  const usedDeployments = deployments.length;
  const remainingDeployments = DEPLOYMENT_LIMIT - usedDeployments;

  const chartData = {
    labels: ["Used", "Limit", "Remaining"],
    datasets: [
      {
        label: "Deployments",
        data: [usedDeployments, DEPLOYMENT_LIMIT, remainingDeployments],
        backgroundColor: ["#3b82f6", "#34D399", "#f87171"],
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: DEPLOYMENT_LIMIT + 2,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Vercel Usage Report
      </h2>
{ vercel ? <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <Bar data={chartData} options={chartOptions} />
        <div className="flex justify-between items-center mt-6 text-gray-700 text-sm">
          <p>
            <strong>Used:</strong> {usedDeployments}
          </p>
          <p>
            <strong>Limit:</strong> {DEPLOYMENT_LIMIT}
          </p>
          <p>
            <strong>Remaining:</strong>{" "}
            {remainingDeployments >= 0 ? remainingDeployments : 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaCloud className="text-blue-500" /> Project Info
          </h3>
          <p>
            <strong>Project Name:</strong> {project?.name}
          </p>
          <p>
            <strong>URL:</strong>{" "}
            <a
              href={`https://${deployment?.url}`}
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              {deployment?.url}
            </a>
          </p>
          <p>
            <strong>Domain:</strong>{" "}
            <a
              href={`https://${project?.alias?.[0]?.domain}`}
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project?.alias?.[0]?.domain}
            </a>
          </p>
          <p>
            <strong>Environment:</strong> {project?.alias?.[0]?.environment}
          </p>
        </div>

        {deployment?.meta && (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaGithub className="text-gray-700" /> GitHub Info
            </h3>
            <p>
              <strong>Repo:</strong> {deployment.meta.githubCommitRepo}
            </p>
            <p>
              <strong>Branch:</strong> {deployment.meta.githubCommitRef}
            </p>
            <p>
              <strong>Message:</strong> {deployment.meta.githubCommitMessage}
            </p>
            <p>
              <strong>Author:</strong> {deployment.meta.githubCommitAuthorName}
            </p>
          </div>
        )}
      </div>
      </>: <p className="text-center">No Data Found</p>}
    </div>
  );
};

export default Vercel;