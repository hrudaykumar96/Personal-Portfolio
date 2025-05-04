import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Cloudinary from "./Cloudinary";
import MongoDB from "./MongoDB";
import Vercel from "./Vercel";
import { SiCloudinary } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { IoLogoVercel } from "react-icons/io5";

const tabs = [
  { name: "Cloudinary", icon: <SiCloudinary className="mr-3 size-5" /> },
  { name: "MongoDB", icon: <DiMongodb className="mr-3 size-5" /> },
  { name: "Vercel", icon: <IoLogoVercel className="mr-3 size-5" /> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Reports() {
  const [selectedTab, setSelectedTab] = useState("");

  const renderContent = () => {
    switch (selectedTab) {
      case "Cloudinary":
        return <Cloudinary />;
      case "MongoDB":
        return <MongoDB />;
      case "Vercel":
        return <Vercel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full p-4">
      {/* Show message only on small and medium screens */}
      <div className="sm:hidden text-center text-gray-600">
        <p>Page not supported on this screen size.</p>
      </div>

      {/* Hide everything on small and medium screens */}
      <div className="hidden sm:block">
        {/* Tab selection for small screens (mobile dropdown) */}
        <div className="grid grid-cols-1 sm:hidden mb-4">
          <select
            value={selectedTab}
            aria-label="Select a tab"
            onChange={(e) => setSelectedTab(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          >
            <option key="">Select Tab</option>
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
          />
        </div>

        {/* Tabs for medium and large screens */}
        <div className="hidden sm:block border-b border-gray-200 mb-4">
          <nav
            aria-label="Tabs"
            className="-mb-px flex items-center justify-around"
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setSelectedTab(tab.name)}
                className={classNames(
                  tab.name === selectedTab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium"
                )}
              >
                <span className="flex items-center justify-center">
                  {tab.icon}
                  {tab.name}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content for the selected tab */}
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
}