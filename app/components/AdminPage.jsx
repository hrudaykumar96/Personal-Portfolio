"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  DocumentDuplicateIcon,
  XMarkIcon,
  PowerIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { FaCogs, FaAward, FaBriefcase, FaLink } from "react-icons/fa";
import PersonalInformation from "../forms/PersonalInformation";
import Link from "next/link";
import Certifications from "../forms/Certifications";
import EducationalInformation from "../forms/EducationalInformation";
import Skills from "../forms/Skills";
import Documents from "../forms/Documents";
import Experience from "../forms/Experience";
import SocialLinks from "../forms/SocialLinks";
import Technologies from "../forms/Technologies";
import { SiCoder } from "react-icons/si";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../effects/Loader";
import Reports from "./Reports";

const navigationItems = [
  { name: "Personal", icon: MdOutlinePersonalInjury },
  { name: "Education", icon: LuGraduationCap },
  { name: "Skills", icon: FaCogs },
  { name: "Certification", icon: FaAward },
  { name: "Documents", icon: DocumentDuplicateIcon },
  { name: "Experience", icon: FaBriefcase },
  { name: "Social Links", icon: FaLink },
  { name: "Technologies", icon: SiCoder },
  { name: "Reports", icon: ChartPieIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Personal");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchuserdata = async () => {
      setLoading(true);
      try {
        const result = await axios.get("/api/userdata");
        const response = result?.data;
        if (response) {
          if (response?.success) {
            setUserData(response?.success);
          } else if (response?.error) {
            setUserData([]);
            toast.error(response?.error);
          } else {
            setUserData([]);
            toast.error("Please try again later");
          }
        } else {
          setUserData([]);
          toast.error("Please try again later");
        }
      } catch (error) {
        toast.error("Please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchuserdata();
  }, []);

  const handleClick = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const logoutUser = async () => {
    setLoading(true);
    const response = await axios.post("/api/logout");
    setSidebarOpen(false);
    if (response?.data) {
      if (response.data.error) {
        toast.error(response.data.error);
        setLoading(false);
      } else if (response.data.success) {
        toast.success(response.data.success);
        setLoading(false);
        router.replace("/login");
        window.location.reload();
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0" />
          <div className="fixed inset-0 flex">
            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <Link className="text-white text-2xl font-bold" href="/">
                    Portfolio
                  </Link>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigationItems.map((item) => (
                          <li key={item.name}>
                            <Link
                              href=""
                              onClick={() => handleClick(item.name)}
                              className={classNames(
                                currentPage === item.name
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className="size-6 shrink-0"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <Link
                        href=""
                        onClick={logoutUser}
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <PowerIcon
                          aria-hidden="true"
                          className="size-6 shrink-0"
                        />
                        Logout
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link className="text-white text-2xl font-bold" href="/">
                Portfolio
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigationItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href="#"
                          onClick={() => handleClick(item.name)}
                          className={classNames(
                            currentPage === item.name
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className="size-6 shrink-0"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <Link
                    href=""
                    onClick={logoutUser}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <PowerIcon aria-hidden="true" className="size-6 shrink-0" />
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gray-100 px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 lg:hidden"
            />
            <h4 className="text-xl md:text-md sm:text-3xl font-semibold text-center w-full">
              {currentPage === "Personal"
                ? "Personal Information"
                : currentPage === "Education"
                ? "Educational Information"
                : currentPage === "Skills"
                ? "Skills"
                : currentPage === "Certification"
                ? "Certifications"
                : currentPage === "Documents"
                ? "Documents"
                : currentPage === "Experience"
                ? "Professional Information"
                : currentPage === "Social Links"
                ? "Social Links"
                : currentPage === "Technologies"
                ? "Technologies"
                : currentPage === "Reports"
                ? "Reports"
                : null}
            </h4>
          </div>
          <main className="py-10 bg-gray-100">
            <div className="px-4 sm:px-6 lg:px-8">
              {currentPage === "Personal" && <PersonalInformation userData={userData} setUserData={setUserData} />}
              {currentPage === "Education" && <EducationalInformation userData={userData} setUserData={setUserData} />}
              {currentPage === "Skills" && <Skills userData={userData} setUserData={setUserData} />}
              {currentPage === "Certification" && <Certifications userData={userData} setUserData={setUserData} />}
              {currentPage === "Documents" && <Documents userData={userData} setUserData={setUserData} />}
              {currentPage === "Experience" && <Experience userData={userData} setUserData={setUserData} />}
              {currentPage === "Social Links" && <SocialLinks userData={userData} />}
              {currentPage === "Technologies" && <Technologies userData={userData} setUserData={setUserData} />}
              {currentPage === "Reports" && <Reports userData={userData} setUserData={setUserData} />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}