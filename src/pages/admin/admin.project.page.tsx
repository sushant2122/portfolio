import { FaEdit, FaEye, FaPlus, FaTrash, FaSearch, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";

// Define the Project type
interface Project {
    id: number;
    name: string;
    git_url: string;
    live_url: string;
    project_img: string;
    description: string;
}

function AdminProjectPage() {
    const [iscreateopen, setiscreateopen] = useState<boolean>(false);
    const [isreadopen, setisreadopen] = useState<boolean>(false);
    const [iseditopen, setiseditopen] = useState<boolean>(false);
    const [isdeleteopen, setisdeleteopen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [previewImage, setPreviewImage] = useState<string>("");

    // Sample data structure
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            project_img: "https://via.placeholder.com/40",
            name: "E-Commerce Platform",
            description: "A full-stack e-commerce platform with payment integration",
            git_url: "https://github.com/example/ecommerce",
            live_url: "https://ecommerce-demo.com"
        },
        {
            id: 2,
            project_img: "https://via.placeholder.com/40",
            name: "Task Management App",
            description: "Project management tool with real-time updates",
            git_url: "https://github.com/example/taskmanager",
            live_url: "https://taskmanager-demo.com"
        },
        {
            id: 3,
            project_img: "https://via.placeholder.com/40",
            name: "Portfolio Website",
            description: "Modern portfolio website with animations",
            git_url: "https://github.com/example/portfolio",
            live_url: "https://portfolio-demo.com"
        }
    ]);

    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        git_url: "",
        live_url: "",
        project_img: "",
        description: ""
    });

    const handleView = (project: Project): void => {
        setCurrentProject(project);
        setisreadopen(true);
    };

    const handleEdit = (project: Project): void => {
        setCurrentProject(project);
        setFormData({
            name: project.name,
            git_url: project.git_url,
            live_url: project.live_url,
            project_img: project.project_img,
            description: project.description
        });
        setPreviewImage(project.project_img);
        setiseditopen(true);
    };

    const handleDelete = (project: Project): void => {
        setCurrentProject(project);
        setisdeleteopen(true);
    };

    const confirmDelete = (): void => {
        setProjects(projects.filter(project => project.id !== currentProject?.id));
        setisdeleteopen(false);
        setCurrentProject(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false): void => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                if (isEdit) {
                    setFormData({ ...formData, project_img: imageUrl });
                } else {
                    setFormData({ ...formData, project_img: imageUrl });
                }
                setPreviewImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const newProject: Project = {
            id: projects.length + 1,
            name: formData.name,
            git_url: formData.git_url,
            live_url: formData.live_url,
            project_img: formData.project_img || "https://via.placeholder.com/40",
            description: formData.description
        };
        setProjects([...projects, newProject]);
        setiscreateopen(false);
        setFormData({ name: "", git_url: "", live_url: "", project_img: "", description: "" });
        setPreviewImage("");
    };

    const handleEditSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (currentProject) {
            const updatedProjects = projects.map(project =>
                project.id === currentProject.id
                    ? { ...project, ...formData }
                    : project
            );
            setProjects(updatedProjects);
            setiseditopen(false);
            setCurrentProject(null);
            setFormData({ name: "", git_url: "", live_url: "", project_img: "", description: "" });
            setPreviewImage("");
        }
    };

    const filteredProjects: Project[] = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Start block */}
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-white my-4 p-3">
                    Projects
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
                                            placeholder="Search projects..."
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={() => {
                                        setiscreateopen(true);
                                        setFormData({ name: "", git_url: "", live_url: "", project_img: "", description: "" });
                                        setPreviewImage("");
                                    }}
                                    type="button"
                                    className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    <FaPlus className="mr-2" />
                                    Add Project
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-w-full">
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
                                        <tr key={project.id} className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="text-3xl text-blue-600 rounded-full">
                                                    <img src={project.project_img} className="w-10 h-10 object-cover rounded" alt={project.name} />
                                                </div>
                                            </th>
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                {project.name}
                                            </td>
                                            <td className="px-4 py-3 max-w-xs truncate">
                                                {project.description}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <a
                                                        href={project.git_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                                        title="GitHub Repository"
                                                    >
                                                        <FaGithub className="text-lg" />
                                                    </a>
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                                                        title="Live Demo"
                                                    >
                                                        <FaExternalLinkAlt className="text-sm" />
                                                    </a>
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
                                                                onClick={() => handleDelete(project)}
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
                            {filteredProjects.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">No projects found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Create Project Modal */}
            <div id="createProjectModal" aria-hidden="true" className={`${iscreateopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Project</h3>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Image</label>
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
                                        {previewImage && (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter project name"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter project description"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub URL</label>
                                    <input
                                        type="url"
                                        name="git_url"
                                        value={formData.git_url}
                                        onChange={(e) => setFormData({ ...formData, git_url: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="https://github.com/username/repo"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Live Demo URL</label>
                                    <input
                                        type="url"
                                        name="live_url"
                                        value={formData.live_url}
                                        onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="https://project-demo.com"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                <FaPlus className="mr-2" />
                                Add Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Update Project Modal */}
            <div id="updateProjectModal" aria-hidden="true" className={`${iseditopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Project</h3>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Image</label>
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
                                        {previewImage ? (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : currentProject && (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={currentProject.project_img} alt={currentProject.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GitHub URL</label>
                                    <input
                                        type="url"
                                        name="git_url"
                                        value={formData.git_url}
                                        onChange={(e) => setFormData({ ...formData, git_url: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Live Demo URL</label>
                                    <input
                                        type="url"
                                        name="live_url"
                                        value={formData.live_url}
                                        onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                >
                                    Update Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Read Project Modal */}
            <div id="readProjectModal" aria-hidden="true" className={`${isreadopen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={currentProject?.project_img} className="w-16 h-16 object-cover rounded" alt={currentProject?.name} />
                                    <h3 className="font-semibold text-xl">{currentProject?.name}</h3>
                                </div>
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
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Description</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                {currentProject?.description}
                            </dd>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Links</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                <div className="flex gap-4">
                                    <a
                                        href={currentProject?.git_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-2"
                                    >
                                        <FaGithub /> GitHub Repository
                                    </a>
                                    <a
                                        href={currentProject?.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-800 dark:text-green-400 flex items-center gap-2"
                                    >
                                        <FaExternalLinkAlt /> Live Demo
                                    </a>
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
                        <p className="mb-4 text-gray-500 dark:text-gray-300">
                            Are you sure you want to delete the project <span className="font-semibold">{currentProject?.name}</span>?
                        </p>
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

export default AdminProjectPage;