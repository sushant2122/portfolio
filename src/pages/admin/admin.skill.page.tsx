import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { FaEdit, FaEye, FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import skillSvc from '../../services/skill.service';
import type { SkillType } from '../../services/skill.service';

// Define the Skill interface matching API response
export interface Skill {
    skill_id: number;
    name: string;
    level: string;
    skill_img: string;
}

function AdminSkillPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [updateImagePreview, setUpdateImagePreview] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [selectedUpdateImageFile, setSelectedUpdateImageFile] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const updateFileInputRef = useRef<HTMLInputElement>(null);

    // Validation schema for create
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Skill name is required"),
        level: Yup.string().required("Skill level is required"),
    });

    // Validation schema for update
    const updateValidationSchema = Yup.object().shape({
        name: Yup.string(),
        level: Yup.string(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<SkillType>({
        resolver: yupResolver(validationSchema) as any,
        defaultValues: {
            name: "",
            level: "50",
        }
    });

    const {
        register: updateRegister,
        handleSubmit: handleUpdateSubmit,
        formState: { errors: updateErrors },
        reset: updateReset,
        setValue: setUpdateValue
    } = useForm<Partial<SkillType>>({
        resolver: yupResolver(updateValidationSchema) as any,
        defaultValues: {
            name: "",
            level: "50",
        }
    });

    // Fetch all skills
    const listSkills = async () => {
        try {
            setLoading(true);
            const response = await skillSvc.listSkill();
            setSkills(response.data.result || []);
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch skills");
        } finally {
            setLoading(false);
        }
    };

    // Create skill
    const createSubmitHandler: SubmitHandler<SkillType> = async (data) => {
        // Validate image manually
        if (!selectedImageFile) {
            setImageError("Skill icon is required");
            return;
        }

        setImageError("");
        console.log("Create data:", data);
        console.log("Selected image file:", selectedImageFile);

        try {
            setCreateLoading(true);

            // Create FormData manually
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("level", data.level);
            formData.append("skill_img", selectedImageFile);

            await skillSvc.createSkill(formData);
            toast.success("Skill created successfully");
            setIsCreateModalOpen(false);
            reset();
            setImagePreview(null);
            setSelectedImageFile(null);
            await listSkills();
        } catch (error: any) {
            console.error("Create error:", error);
            toast.error(error.message || "Failed to create skill");
        } finally {
            setCreateLoading(false);
        }
    };

    // Update skill
    const updateSubmitHandler: SubmitHandler<Partial<SkillType>> = async (data) => {
        console.log("Update data:", data);
        console.log("Selected update image file:", selectedUpdateImageFile);

        try {
            setUpdateLoading(true);
            if (!selectedSkill) return;

            // Create FormData manually
            const formData = new FormData();

            if (data.name && data.name.trim() !== "") {
                formData.append("name", data.name);
            }
            if (data.level && data.level.trim() !== "") {
                formData.append("level", data.level);
            }
            if (selectedUpdateImageFile) {
                formData.append("skill_img", selectedUpdateImageFile);
            }

            console.log("Sending update FormData:", formData);

            await skillSvc.updateSkillDetail(selectedSkill.skill_id, formData);
            toast.success("Skill updated successfully");
            setIsUpdateModalOpen(false);
            updateReset();
            setUpdateImagePreview(null);
            setSelectedUpdateImageFile(null);
            await listSkills();
        } catch (error: any) {
            console.error("Update error:", error);
            toast.error(error.message || "Failed to update skill");
        } finally {
            setUpdateLoading(false);
        }
    };

    // Delete skill
    const handleDeleteSkill = async () => {
        if (!selectedSkill) return;

        try {
            setDeleteLoading(true);
            await skillSvc.deleteSkill(selectedSkill.skill_id);
            toast.success("Skill deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedSkill(null);
            await listSkills();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete skill");
        } finally {
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        listSkills();
    }, []);

    // Handle image preview for create
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedImageFile(file);
            setImageError("");
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
            setSelectedImageFile(null);
        }
    };

    // Handle image preview for update
    const handleUpdateImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedUpdateImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setUpdateImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setUpdateImagePreview(null);
            setSelectedUpdateImageFile(null);
        }
    };

    const handleView = (skill: Skill) => {
        setSelectedSkill(skill);
        setIsViewModalOpen(true);
    };

    const handleEdit = (skill: Skill) => {
        setSelectedSkill(skill);
        setIsUpdateModalOpen(true);
        updateReset({
            name: skill.name,
            level: skill.level.replace('%', ''),
        });
        setSelectedUpdateImageFile(null);
        setUpdateImagePreview(null);
    };

    const handleDeleteClick = (skill: Skill) => {
        setSelectedSkill(skill);
        setIsDeleteModalOpen(true);
    };

    const filteredSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <h1 className="text-3xl font-bold text-primary-gold dark:text-white my-4 p-3">
                    Skills
                </h1>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
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
                                            placeholder="Search skills..."
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={() => {
                                        setIsCreateModalOpen(true);
                                        reset();
                                        setImagePreview(null);
                                        setSelectedImageFile(null);
                                        setImageError("");
                                    }}
                                    type="button"
                                    className="flex items-center justify-center text-white bg-secondary-gray hover:bg-primary-gold focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    <FaPlus className="mr-2" />
                                    Add Skill
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-w-full">
                            {loading && !skills.length ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Icon</th>
                                            <th scope="col" className="px-4 py-4">Skill Name</th>
                                            <th scope="col" className="px-4 py-3">Level</th>
                                            <th scope="col" className="px-4 py-3">
                                                <span className="">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSkills.map((skill) => (
                                            <tr key={skill.skill_id} className="border-b dark:border-gray-700">
                                                <th scope="row" className="px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="text-3xl text-blue-600 rounded-full">
                                                        <img src={skill.skill_img} className="w-10 h-10 object-cover rounded" alt={skill.name} />
                                                    </div>
                                                </th>
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                    {skill.name}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="w-32">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-xs">{skill.level}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`${getLevelColor(skill.level)} h-2 rounded-full`}
                                                                style={{ width: `${skill.level}%` }}
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
                                                                    onClick={() => handleDeleteClick(skill)}
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
                            )}
                            {filteredSkills.length === 0 && !loading && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">No skills found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Create Skill Modal */}
            <div id="createSkillModal" aria-hidden="true" className={`${isCreateModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Skill</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreateModalOpen(false);
                                    reset();
                                    setImagePreview(null);
                                    setSelectedImageFile(null);
                                    setImageError("");
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <FaXmark className="text-xl" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(createSubmitHandler)}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Icon *</label>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                accept="image/jpeg, image/png, image/gif, image/svg+xml"
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (Max 2MB)</p>
                                            {imageError && (
                                                <p className="mt-1 text-sm text-red-600">{imageError}</p>
                                            )}
                                        </div>
                                        {imagePreview && (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Name *</label>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter skill name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Proficiency Level: {"50"}%
                                    </label>
                                    <input
                                        type="range"
                                        {...register("level")}
                                        min="0"
                                        max="100"
                                        className="w-full "
                                        onChange={(e) => {
                                            setValue("level", e.target.value);
                                        }}
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Beginner</span>
                                        <span>Intermediate</span>
                                        <span>Advanced</span>
                                        <span>Expert</span>
                                    </div>
                                    {errors.level && (
                                        <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={createLoading}
                                className="text-white inline-flex items-center bg-secondary-gray hover:bg-primary-gold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 disabled:opacity-50"
                            >
                                {createLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <FaPlus className="mr-2" />
                                )}
                                Add Skill
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Update Skill Modal */}
            <div id="updateSkillModal" aria-hidden="true" className={`${isUpdateModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Skill</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsUpdateModalOpen(false);
                                    updateReset();
                                    setUpdateImagePreview(null);
                                    setSelectedUpdateImageFile(null);
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <FaXmark className="text-xl" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleUpdateSubmit(updateSubmitHandler)}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Icon (Optional)</label>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                ref={updateFileInputRef}
                                                onChange={handleUpdateImageChange}
                                                accept="image/jpeg, image/png, image/gif, image/svg+xml"
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (Max 2MB) - Leave empty to keep current icon</p>
                                        </div>
                                        {updateImagePreview ? (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={updateImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : selectedSkill && (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={selectedSkill.skill_img} alt={selectedSkill.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Name (Optional)</label>
                                    <input
                                        type="text"
                                        {...updateRegister("name")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave empty to keep current name"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Proficiency Level (Optional): {"50"}%
                                    </label>
                                    <input
                                        type="range"
                                        {...updateRegister("level")}
                                        min="0"
                                        max="100"
                                        className="w-full"
                                        onChange={(e) => {
                                            setUpdateValue("level", e.target.value);
                                        }}
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
                                disabled={updateLoading}
                                className="text-white bg-secondary-gray hover:bg-bprimary-gold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 disabled:opacity-50"
                            >
                                {updateLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                                ) : null}
                                Update Skill
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* View Skill Modal */}
            <div id="readSkillModal" aria-hidden="true" className={`${isViewModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={selectedSkill?.skill_img} className="w-12 h-12 object-cover rounded" alt={selectedSkill?.name} />
                                    <h3 className="font-semibold text-xl">{selectedSkill?.name}</h3>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <FaXmark className="text-xl" />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        <dl>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Proficiency Level</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{selectedSkill?.level}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className={`${getLevelColor(selectedSkill?.level || "0")} h-2.5 rounded-full`}
                                        style={{ width: `${selectedSkill?.level}%` }}
                                    ></div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <div id="deleteModal" aria-hidden="true" className={`${isDeleteModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <FaXmark className="text-xl" />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                            <FaTrash className="text-2xl text-red-600" />
                        </div>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">
                            Are you sure you want to delete the skill <span className="font-semibold">{selectedSkill?.name}</span>?
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                No, cancel
                            </button>
                            <button
                                onClick={handleDeleteSkill}
                                disabled={deleteLoading}
                                type="submit"
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 disabled:opacity-50"
                            >
                                {deleteLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block"></div>
                                ) : (
                                    "Yes, I'm sure"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSkillPage;