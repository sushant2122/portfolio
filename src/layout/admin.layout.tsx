import { Button } from "flowbite-react";
import { useState } from "react";
import { FaCode, FaEnvelope } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, Outlet } from "react-router";
import { GiFireworkRocket } from "react-icons/gi";
import { IoIosApps } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdFindInPage } from "react-icons/md";
function AdminLayout() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <>


            {/* Sidebar */}
            <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0 -translate-x-full"

            >
                <div className="flex flex-col justify-between h-full bg-gray-600 border-r border-gray-200 dark:bg-white dark:border-gray-700">



                    {/* Menu */}
                    <ul className="space-y-2 p-4">
                        <li className="pb-4">
                            <Link to="/admin" className="flex gap-2 items-center text-white">
                                <FaCode size={25} />
                                <span className=" self-center text-xl text-primary-black font-semibold whitespace-nowrap text-primary-gold">Sushant Paudyal</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin" className="flex flex-wrap gap-2 items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-primary-gold">
                                <LuLayoutDashboard />  Overview
                            </Link>
                        </li>

                        {/* Dropdown */}
                        <li>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center w-full p-2 text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-primary-gold justify-between"
                            >
                                <span className="flex flex-wrap items-center gap-2">
                                    <MdFindInPage /> Pages

                                </span>

                                {isDropdownOpen ? <><IoIosArrowUp /></> : <><IoIosArrowDown /></>}

                            </button>

                            {isDropdownOpen && (
                                <ul className="pl-6 mt-2 space-y-2 text-white">
                                    <li>
                                        <Link to="project" className="flex flex-wrap gap-2 items-center block p-2 rounded hover:bg-gray-100 hover:bg-primary-gold">
                                            <FaCodeFork /> Projects
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="experience" className=" flex flex-wrap gap-2 items-center block p-2 rounded hover:bg-gray-100 hover:bg-primary-gold">
                                            <GiFireworkRocket /> Experiences
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="skill" className=" flex flex-wrap gap-2 items-center block p-2 rounded hover:bg-gray-100 hover:bg-primary-gold">
                                            <IoIosApps /> Skills
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <Link to="message" className="flex items-center gap-2 p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:bg-primary-gold">
                                <FaEnvelope /> Messages
                                <span className="ml-auto text-xs bg-red-400 text-white px-2 py-0.5 rounded-full ">
                                    6
                                </span>
                            </Link>
                        </li>
                    </ul>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <Button className="w-full bg-primary-gold hover:bg-red-600">
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="p-4 sm:ml-64 overflow-x-hidden md:ml-64 h-auto ml-64">

                <Outlet />
            </div>
        </>
    );
}

export default AdminLayout;