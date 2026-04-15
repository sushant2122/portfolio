import { FaEdit, FaEye, FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";

// Define the Skill type
interface Skill {
    id: number;
    icon: string;
    title: string;
    level: string;
}

function AdminSkillPage() {
    const [iscreateopen, setiscreateopen] = useState<boolean>(false);
    const [isreadopen, setisreadopen] = useState<boolean>(false);
    const [iseditopen, setiseditopen] = useState<boolean>(false);
    const [isdeleteopen, setisdeleteopen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [previewIcon, setPreviewIcon] = useState<string>("");

    // Sample data structure
    const [skills, setSkills] = useState<Skill[]>([
        { id: 1, icon: "https://via.placeholder.com/40", title: "Git", level: "75%" },
        { id: 2, icon: "https://via.placeholder.com/40", title: "React", level: "85%" },
        { id: 3, icon: "https://via.placeholder.com/40", title: "JavaScript", level: "90%" }
    ]);

    const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        level: "50%",
        icon: ""
    });

    const handleView = (skill: Skill): void => {
        setCurrentSkill(skill);
        setisreadopen(true);
    };

    const handleEdit = (skill: Skill): void => {
        setCurrentSkill(skill);
        setFormData({
            title: skill.title,
            level: skill.level,
            icon: skill.icon
        });
        setPreviewIcon(skill.icon);
        setiseditopen(true);
    };

    const handleDelete = (skill: Skill): void => {
        setCurrentSkill(skill);
        setisdeleteopen(true);
    };

    const confirmDelete = (): void => {
        setSkills(skills.filter(skill => skill.id !== currentSkill?.id));
        setisdeleteopen(false);
        setCurrentSkill(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false): void => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const iconUrl = reader.result as string;
                if (isEdit) {
                    setFormData({ ...formData, icon: iconUrl });
                } else {
                    setFormData({ ...formData, icon: iconUrl });
                }
                setPreviewIcon(iconUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const newSkill: Skill = {
            id: skills.length + 1,
            title: formData.title,
            level: formData.level,
            icon: formData.icon || "https://via.placeholder.com/40"
        };
        setSkills([...skills, newSkill]);
        setiscreateopen(false);
        setFormData({ title: "", level: "50%", icon: "" });
        setPreviewIcon("");
    };

    const handleEditSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (currentSkill) {
            const updatedSkills = skills.map(skill =>
                skill.id === currentSkill.id
                    ? { ...skill, title: formData.title, level: formData.level, icon: formData.icon || skill.icon }
                    : skill
            );
            setSkills(updatedSkills);
            setiseditopen(false);
            setCurrentSkill(null);
            setFormData({ title: "", level: "50%", icon: "" });
            setPreviewIcon("");
        }
    };

    const filteredSkills: Skill[] = skills.filter(skill =>
        skill.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getLevelColor = (level: string): string => {
        const percentage = parseInt(level);
        if (percentage >= 80) return "bg-green-500";
        if (percentage >= 60) return "bg-blue-500";
        if (percentage >= 40) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <>
            {/* Start block */}
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-white my-4 p-3">
                    Skill
                </h1>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    {/* Start coding here */}
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FaSearch className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search skill..."
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={() => {
                                        setiscreateopen(true);
                                        setFormData({ title: "", level: "50%", icon: "" });
                                        setPreviewIcon("");
                                    }}
                                    type="button"
                                    className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    <FaPlus className="mr-2" />
                                    Add Skill
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-w-full">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Icon</th>
                                        <th scope="col" className="px-4 py-4">Title</th>
                                        <th scope="col" className="px-4 py-3">Level</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSkills.map((skill) => (
                                        <tr key={skill.id} className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="text-3xl text-blue-600 rounded-full">
                                                    <img src={skill.icon} className="w-10 h-10 object-cover rounded" alt={skill.title} />
                                                </div>
                                            </th>
                                            <td className="px-4 py-3">{skill.title}</td>
                                            <td className="px-4 py-3">
                                                <div className="w-32">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-xs">{skill.level}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`${getLevelColor(skill.level)} h-2 rounded-full`}
                                                            style={{ width: skill.level }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 flex items-center">
                                                <div className="z-10 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                                                    <ul className="flex flex-wrap gap-3 text-sm" aria-labelledby="dropdownButton2">
                                                        <li>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleView(skill)}
                                                                className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200 rounded"
                                                            >
                                                                <FaEye />
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEdit(skill)}
                                                                className="flex items-center p-2 justify-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200 rounded"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(skill)}
                                                                className="flex items-center p-2 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400 rounded"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredSkills.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">No skills found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Create Skill Modal */}
            <div id="createSkillModal" aria-hidden="true" className={`${iscreateopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Skill</h3>
                            <button
                                type="button"
                                onClick={() => setiscreateopen(false)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <FaXmark className="text-xl" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Icon (SVG/Image)</label>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*,.svg"
                                                onChange={(e) => handleFileUpload(e, false)}
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (Max 2MB)</p>
                                        </div>
                                        {previewIcon && (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={previewIcon} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter skill name"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proficiency Level: {formData.level}</label>
                                    <input
                                        type="range"
                                        name="level"
                                        min="0"
                                        max="100"
                                        value={parseInt(formData.level)}
                                        onChange={(e) => setFormData({ ...formData, level: `${e.target.value}%` })}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Beginner</span>
                                        <span>Intermediate</span>
                                        <span>Advanced</span>
                                        <span>Expert</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                <FaPlus className="mr-2" />
                                Add Skill
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Update Skill Modal */}
            <div id="updateSkillModal" aria-hidden="true" className={`${iseditopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Skill</h3>
                            <button
                                type="button"
                                onClick={() => setiseditopen(false)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <FaXmark className="text-xl" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Icon (SVG/Image)</label>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*,.svg"
                                                onChange={(e) => handleFileUpload(e, true)}
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (Max 2MB)</p>
                                        </div>
                                        {previewIcon ? (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={previewIcon} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : currentSkill && (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={currentSkill.icon} alt={currentSkill.title} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proficiency Level: {formData.level}</label>
                                    <input
                                        type="range"
                                        name="level"
                                        min="0"
                                        max="100"
                                        value={parseInt(formData.level)}
                                        onChange={(e) => setFormData({ ...formData, level: `${e.target.value}%` })}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                >
                                    Update Skill
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Read Skill Modal */}
            <div id="readSkillModal" aria-hidden="true" className={`${isreadopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={currentSkill?.icon} className="w-12 h-12 object-cover rounded" alt={currentSkill?.title} />
                                    <h3 className="font-semibold">{currentSkill?.title}</h3>
                                </div>
                                <p className="font-bold">Proficiency Level: {currentSkill?.level}</p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setisreadopen(false)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <FaXmark className="text-xl" />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        <dl>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Skill Details</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div
                                        className={`${getLevelColor(currentSkill?.level || "0%")} h-2.5 rounded-full`}
                                        style={{ width: currentSkill?.level }}
                                    ></div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div id="deleteModal" aria-hidden="true" className={`${isdeleteopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button
                            type="button"
                            onClick={() => setisdeleteopen(false)}
                            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <FaXmark className="text-xl" />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                            <FaTrash className="text-2xl text-red-600" />
                        </div>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this skill?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={() => setisdeleteopen(false)}
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                No, cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                type="submit"
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSkillPage;