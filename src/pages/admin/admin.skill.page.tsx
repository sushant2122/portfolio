import { FaEdit, FaEye, FaInfo, FaPlus, FaTrash } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"

import { useState } from "react";
function AdminSkillPage() {
    const [iscreateopen, setiscreateopen] = useState(false);
    const [isreadopen, setisreadopen] = useState(false);
    const [iseditopen, setiseditopen] = useState(false);
    const [isdeleteopen, setisdeleteopen] = useState(false);
    return (
        <>
            {/* <!-- Start block --> */}
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <h1 className="text-3xl font-bold text-primary-gold dark:text-white  my-4 p-3 ">
                    Skill
                </h1>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    {/* <!-- Start coding here --> */}
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                                        </div>
                                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search experience..." />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={() => setiscreateopen(true)}
                                    type="button" data-modal-target="createExperienceModal" data-modal-toggle="createExperienceModal" className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">
                                    <FaPlus className="mr-2" />
                                    Add Experience
                                </button>

                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-4">Organization</th>
                                        <th scope="col" className="px-4 py-3">Position</th>

                                        <th scope="col" className="px-4 py-3">From Date</th>
                                        <th scope="col" className="px-4 py-3">To Date</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Microsoft</th>
                                        <td className="px-4 py-3">Software Engineer</td>

                                        <td className="px-4 py-3">2018-06-01</td>
                                        <td className="px-4 py-3">2020-12-31</td>
                                        <td className="px-4 py-3 flex items-center">

                                            <div className=" z-10 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                                                <ul className=" flex flex-wrap gap-3 text-sm" aria-labelledby="dropdownButton2">
                                                    <li>
                                                        <button type="button"
                                                            onClick={() => { setisreadopen(true) }}
                                                            data-modal-target="readExperienceModal" data-modal-toggle="readExperienceModal" className="flex items-center justify-center p-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                                            <FaEye />

                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button"
                                                            onClick={() => { setiseditopen(true) }}
                                                            data-modal-target="updateExperienceModal" data-modal-toggle="updateExperienceModal" className="flex items-center p-2 justify-center  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                                            <FaEdit />

                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button type="button"
                                                            onClick={() => { setisdeleteopen(true) }} data-modal-target="deleteModal" data-modal-toggle="deleteModal" className="flex items-center p-2 items-center justify-center  hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
                                                            <FaTrash />

                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Create Experience Modal --> */}
            <div id="createExperienceModal" aria-hidden="true" className={`${iscreateopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Experience</h3>
                            <button type="button"
                                onClick={() => setiscreateopen(false)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="createExperienceModal">
                                <FaXmark className="text-xl" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#">
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
                                    <input type="text" name="organization" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter organization name" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                    <input type="text" name="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your position" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Date</label>
                                    <input type="date" name="fromDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Date</label>
                                    <input type="date" name="toDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                <FaPlus className="mr-2" />
                                Add Experience
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* <!-- Update Experience Modal --> */}
            <div id="updateExperienceModal" aria-hidden="true" className={`${iseditopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Experience</h3>
                            <button type="button"
                                onClick={() => { setiseditopen(false) }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateExperienceModal">
                                <FaXmark className="text-xl" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#">
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
                                    <input type="text" name="organization" defaultValue="Google" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                    <input type="text" name="position" defaultValue="Senior Frontend Developer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Date</label>
                                    <input type="date" name="fromDate" defaultValue="2021-01-15" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Date</label>
                                    <input type="date" name="toDate" defaultValue="2024-03-20" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Update Experience</button>
                                <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    <FaTrash className="mr-2" />
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <!-- Read Experience Modal --> */}
            <div id="readExperienceModal" aria-hidden="true" className={`${isreadopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <h3 className="font-semibold mb-3">Google</h3>
                                <p className="font-bold">Senior Frontend Developer</p>
                            </div>
                            <div>
                                <button type="button"
                                    onClick={() => { setisreadopen(false) }}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readExperienceModal">
                                    <FaXmark className="text-xl" />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        <dl>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Duration</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">From: 2021-01-15 To: 2024-03-20</dd>


                        </dl>

                    </div>
                </div>
            </div>

            {/* <!-- Delete Modal --> */}
            <div id="deleteModal" aria-hidden="true" className={`${isdeleteopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button type="button"
                            onClick={() => { setisdeleteopen(false) }}
                            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                            <FaXmark className="text-xl" />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <FaInfo className="text-4xl text-gray-500 dark:text-gray-400 mb-4 mx-auto" />
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this experience entry?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button data-modal-toggle="deleteModal"
                                onClick={() => { setisdeleteopen(false) }}
                                type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">Yes, I'm sure</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSkillPage