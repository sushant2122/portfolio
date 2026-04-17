import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { FaEdit, FaEye, FaPlus, FaTrash, FaSearch, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import portfolioSvc from '../../services/portfolio.service';
import type { PortfolioType } from '../../services/portfolio.service';

export interface Project {
    portfolio_id: number;
    name: string;
    description: string;
    portfolio_img: string;
    git_URL: string;
    live_URL: string;
}

function AdminProjectPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

    // Validation schema for create (matches backend DTO)
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Project name is required"),
        description: Yup.string(),
        git_URL: Yup.string().url("Invalid URL format").required("GitHub URL is required"),
        live_URL: Yup.string().url("Invalid URL format"),
    });

    // Validation schema for update (all fields optional)
    const updateValidationSchema = Yup.object().shape({
        name: Yup.string(),
        description: Yup.string(),
        git_URL: Yup.string().url("Invalid URL format"),
        live_URL: Yup.string().url("Invalid URL format"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PortfolioType>({
        resolver: yupResolver(validationSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            git_URL: "",
            live_URL: "",
        }
    });

    const {
        register: updateRegister,
        handleSubmit: handleUpdateSubmit,
        formState: { errors: updateErrors },
        reset: updateReset,
    } = useForm<Partial<PortfolioType>>({
        resolver: yupResolver(updateValidationSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            git_URL: "",
            live_URL: "",
        }
    });

    // Fetch all portfolios
    const listPortfolio = async () => {
        try {
            setLoading(true);
            const response = await portfolioSvc.listPortfolio();
            setProjects(response.data.result || []);
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch portfolios");
        } finally {
            setLoading(false);
        }
    };

    // Create portfolio
    const createSubmitHandler: SubmitHandler<PortfolioType> = async (data) => {
        // Validate image manually
        if (!selectedImageFile) {
            setImageError("Project image is required");
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
            formData.append("git_URL", data.git_URL);

            if (data.description) {
                formData.append("description", data.description);
            }
            if (data.live_URL) {
                formData.append("live_URL", data.live_URL);
            }
            formData.append("portfolio_img", selectedImageFile);

            await portfolioSvc.createPortfolio(formData);
            toast.success("Project created successfully");
            setIsCreateModalOpen(false);
            reset();
            setImagePreview(null);
            setSelectedImageFile(null);
            await listPortfolio();
        } catch (error: any) {
            console.error("Create error:", error);
            toast.error(error.message || "Failed to create project");
        } finally {
            setCreateLoading(false);
        }
    };

    // Update portfolio
    const updateSubmitHandler: SubmitHandler<Partial<PortfolioType>> = async (data) => {
        console.log("Update data:", data);
        console.log("Selected update image file:", selectedUpdateImageFile);

        try {
            setUpdateLoading(true);
            if (!selectedProject) return;

            // Create FormData manually
            const formData = new FormData();

            if (data.name && data.name.trim() !== "") {
                formData.append("name", data.name);
            }
            if (data.description && data.description.trim() !== "") {
                formData.append("description", data.description);
            }
            if (data.git_URL && data.git_URL.trim() !== "") {
                formData.append("git_URL", data.git_URL);
            }
            if (data.live_URL && data.live_URL.trim() !== "") {
                formData.append("live_URL", data.live_URL);
            }
            if (selectedUpdateImageFile) {
                formData.append("portfolio_img", selectedUpdateImageFile);
            }

            console.log("Sending update FormData:", formData);

            await portfolioSvc.updatePortfolioDetail(selectedProject.portfolio_id, formData);
            toast.success("Project updated successfully");
            setIsUpdateModalOpen(false);
            updateReset();
            setUpdateImagePreview(null);
            setSelectedUpdateImageFile(null);
            await listPortfolio();
        } catch (error: any) {
            console.error("Update error:", error);
            toast.error(error.message || "Failed to update project");
        } finally {
            setUpdateLoading(false);
        }
    };

    // Delete portfolio
    const handleDeleteProject = async () => {
        if (!selectedProject) return;

        try {
            setDeleteLoading(true);
            await portfolioSvc.deletePortfolio(selectedProject.portfolio_id);
            toast.success("Project deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedProject(null);
            await listPortfolio();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete project");
        } finally {
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        listPortfolio();
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

    const handleView = (project: Project) => {
        setSelectedProject(project);
        setIsViewModalOpen(true);
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsUpdateModalOpen(true);
        updateReset({
            name: project.name,
            description: project.description,
            git_URL: project.git_URL,
            live_URL: project.live_URL,
        });
        setSelectedUpdateImageFile(null);
        setUpdateImagePreview(null);
    };

    const handleDeleteClick = (project: Project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <h1 className="text-3xl font-bold text-primary-gold dark:text-white my-4 p-3">
                    Projects
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
                                            placeholder="Search projects..."
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
                                    Add Project
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-w-full">
                            {loading && !projects.length ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Image</th>
                                            <th scope="col" className="px-4 py-4">Project Name</th>
                                            <th scope="col" className="px-4 py-3">Description</th>
                                            <th scope="col" className="px-4 py-3">Links</th>
                                            <th scope="col" className="px-4 py-3">
                                                <span className="">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProjects.map((project) => (
                                            <tr key={project.portfolio_id} className="border-b dark:border-gray-700">
                                                <th scope="row" className="px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="text-3xl text-blue-600 rounded-full">
                                                        <img src={project.portfolio_img} className="w-10 h-10 object-cover rounded" alt={project.name} />
                                                    </div>
                                                </th>
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                    {project.name}
                                                </td>
                                                <td className="px-4 py-3 max-w-xs truncate">
                                                    {project.description || "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <a
                                                            href={project.git_URL}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                                            title="GitHub Repository"
                                                        >
                                                            <FaGithub className="text-lg" />
                                                        </a>
                                                        {project.live_URL && (
                                                            <a
                                                                href={project.live_URL}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                                                                title="Live Demo"
                                                            >
                                                                <FaExternalLinkAlt className="text-sm" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 flex items-center">
                                                    <div className="z-10 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                                                        <ul className="flex flex-wrap gap-3 text-sm" aria-labelledby="dropdownButton2">
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleView(project)}
                                                                    className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200 rounded"
                                                                >
                                                                    <FaEye />
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleEdit(project)}
                                                                    className="flex items-center p-2 justify-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200 rounded"
                                                                >
                                                                    <FaEdit />
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteClick(project)}
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
                            {filteredProjects.length === 0 && !loading && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">No projects found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Create Project Modal */}
            <div id="createProjectModal" aria-hidden="true" className={`${isCreateModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Project</h3>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Image *</label>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name *</label>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter project name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description (Optional)</label>
                                    <textarea
                                        {...register("description")}
                                        rows={3}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter project description (optional)"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub URL *</label>
                                    <input
                                        type="url"
                                        {...register("git_URL")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="https://github.com/username/repo"
                                    />
                                    {errors.git_URL && (
                                        <p className="mt-1 text-sm text-red-600">{errors.git_URL.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Live Demo URL (Optional)</label>
                                    <input
                                        type="url"
                                        {...register("live_URL")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="https://project-demo.com (optional)"
                                    />
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
                                Add Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Update Project Modal */}
            <div id="updateProjectModal" aria-hidden="true" className={`${isUpdateModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Project</h3>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Image (Optional)</label>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                ref={updateFileInputRef}
                                                onChange={handleUpdateImageChange}
                                                accept="image/jpeg, image/png, image/gif, image/svg+xml"
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (Max 2MB) - Leave empty to keep current image</p>
                                        </div>
                                        {updateImagePreview ? (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={updateImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : selectedProject && (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={selectedProject.portfolio_img} alt={selectedProject.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name (Optional)</label>
                                    <input
                                        type="text"
                                        {...updateRegister("name")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave empty to keep current name"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description (Optional)</label>
                                    <textarea
                                        {...updateRegister("description")}
                                        rows={3}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave empty to keep current description"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub URL (Optional)</label>
                                    <input
                                        type="url"
                                        {...updateRegister("git_URL")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave empty to keep current GitHub URL"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Live Demo URL (Optional)</label>
                                    <input
                                        type="url"
                                        {...updateRegister("live_URL")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave empty to keep current live URL"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={updateLoading}
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 disabled:opacity-50"
                            >
                                {updateLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                                ) : null}
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* View Project Modal */}
            <div id="readProjectModal" aria-hidden="true" className={`${isViewModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={selectedProject?.portfolio_img} className="w-16 h-16 object-cover rounded" alt={selectedProject?.name} />
                                    <h3 className="font-semibold text-xl">{selectedProject?.name}</h3>
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
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Description</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                {selectedProject?.description || "No description provided"}
                            </dd>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Links</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                <div className="flex gap-4">
                                    <a
                                        href={selectedProject?.git_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-2"
                                    >
                                        <FaGithub /> GitHub Repository
                                    </a>
                                    {selectedProject?.live_URL && (
                                        <a
                                            href={selectedProject.live_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:text-green-800 dark:text-green-400 flex items-center gap-2"
                                        >
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
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
                            Are you sure you want to delete the project <span className="font-semibold">{selectedProject?.name}</span>?
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
                                onClick={handleDeleteProject}
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

export default AdminProjectPage;