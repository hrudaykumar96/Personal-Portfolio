"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MongoDB = () => {
  const [mongoDb, setMongoDB] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/mongodbreports");
        if (response?.data?.success) {
          setMongoDB(response?.data?.success)
        }
      } catch (error) {
        toast.error("Please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  const MAX_STORAGE_MB = 512;
  const MAX_CONNECTIONS = 500;
  const MAX_OPS_PER_SEC = 100;
  const MAX_NETWORK_BYTES_IN_MB = 100;
  const MAX_NETWORK_BYTES_OUT_MB = 100;
  const MAX_NETWORK_REQUESTS = 5000;

  const currentConnections = mongoDb?.connections?.current || 0;
  const totalCreatedConnections = mongoDb?.connections?.totalCreated || 0;
  const commandOps = mongoDb?.opcounters?.command || 0;
  const readOps = mongoDb?.opcounters?.query || 0;
  const totalOps = commandOps + readOps;

  const estimatedStorageUsed = Math.min((totalOps / 1000) * 100, 512);

  const networkBytesIn = mongoDb?.network?.bytesIn || 0;
  const networkBytesOut = mongoDb?.network?.bytesOut || 0;
  const numRequests = mongoDb?.network?.numRequests || 0;

  const convertBytesToMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);
  const convertBytesToGB = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2);

  const totalNetworkBytesInMB = convertBytesToMB(networkBytesIn);
  const totalNetworkBytesOutMB = convertBytesToMB(networkBytesOut);

  const estimatedStorageUsedGB = (estimatedStorageUsed / 1024).toFixed(2);

  const chartData = {
    labels: ["Usage Metrics"],
    datasets: [
      {
        label: "Storage Usage (GB)",
        data: [estimatedStorageUsedGB],
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
      {
        label: "Storage Limit (GB)",
        data: [MAX_STORAGE_MB / 1024],
        backgroundColor: "#E0E0E0",
        borderColor: "#E0E0E0",
        borderWidth: 1,
      },
      {
        label: "Active Connections",
        data: [currentConnections],
        backgroundColor: "#FF9800",
        borderColor: "#FF9800",
        borderWidth: 1,
      },
      {
        label: "Connections Limit",
        data: [MAX_CONNECTIONS],
        backgroundColor: "#E0E0E0",
        borderColor: "#E0E0E0",
        borderWidth: 1,
      },
      {
        label: "Ops per Second",
        data: [totalOps],
        backgroundColor: "#3F51B5",
        borderColor: "#3F51B5",
        borderWidth: 1,
      },
      {
        label: "Ops Limit",
        data: [MAX_OPS_PER_SEC],
        backgroundColor: "#E0E0E0",
        borderColor: "#E0E0E0",
        borderWidth: 1,
      },
      {
        label: "Bytes In (MB)",
        data: [totalNetworkBytesInMB],
        backgroundColor: "#00BCD4",
        borderColor: "#00BCD4",
        borderWidth: 1,
      },
      {
        label: "Bytes Out (MB)",
        data: [totalNetworkBytesOutMB],
        backgroundColor: "#FF5722",
        borderColor: "#FF5722",
        borderWidth: 1,
      },
      {
        label: "Requests",
        data: [numRequests],
        backgroundColor: "#9C27B0",
        borderColor: "#9C27B0",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h2 className="text-4xl font-semibold text-center text-gray-900 mb-8">
        MongoDB Usage Reports
      </h2>
{ mongoDb ? <>
      <div className="w-[50rem] h-[30rem] bg-white p-6 rounded-lg shadow-lg mb-8 mx-auto">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const value = context.raw;
                    const label = context.dataset.label || "";
                    if (label.includes("Bytes")) {
                      return `${label}: ${value} MB`;
                    }
                    if (label.includes("Storage")) {
                      return `${label}: ${value} GB`;
                    }
                    return `${label}: ${value}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: Math.max(
                  MAX_STORAGE_MB / 1024,
                  MAX_CONNECTIONS,
                  MAX_OPS_PER_SEC,
                  MAX_NETWORK_BYTES_IN_MB,
                  MAX_NETWORK_BYTES_OUT_MB,
                  MAX_NETWORK_REQUESTS
                ) + 100,
                ticks: {
                  callback: function (value) {
                    if (value >= 1024) {
                      return `${(value / 1024).toFixed(2)} GB`;
                    }
                    return `${value} MB`;
                  },
                },
              },
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            MongoDB Free Tier Limits
          </h3>
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <p>
                <strong>Storage Limit:</strong> {MAX_STORAGE_MB} MB (
                {MAX_STORAGE_MB / 1024} GB)
              </p>
              <p>
                <strong>Ops Limit:</strong> {MAX_OPS_PER_SEC}
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                <strong>Max Connections:</strong> {MAX_CONNECTIONS}
              </p>
              <p>
                <strong>Max Network In:</strong> {MAX_NETWORK_BYTES_IN_MB} MB
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                <strong>Max Network Out:</strong> {MAX_NETWORK_BYTES_OUT_MB} MB
              </p>
              <p>
                <strong>Max Requests:</strong> {MAX_NETWORK_REQUESTS}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Current Usage
          </h3>
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <p>
                <strong>Storage Used:</strong> {estimatedStorageUsedGB} GB
              </p>
              <p>
                <strong>Ops per Second:</strong> {totalOps}
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                <strong>Active Connections:</strong> {currentConnections}
              </p>
              <p>
                <strong>Network In (MB):</strong> {totalNetworkBytesInMB} MB
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                <strong>Network Out (MB):</strong> {totalNetworkBytesOutMB} MB
              </p>
              <p>
                <strong>Requests:</strong> {numRequests}
              </p>
            </div>
          </div>
        </div>
      </div>
      </>: <p className="text-center">No Data Found</p>}
    </div>
  );
};

export default MongoDB;
