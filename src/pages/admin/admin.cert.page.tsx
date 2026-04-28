import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { FaEdit, FaEye, FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import certSvc from '../../services/cert.service';

// Define the Certification interface matching API response
export interface Certification {
    cert_id: number;
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date?: string;
    credential_id?: string;
    verification_link?: string;
    cert_img: string;
    skills?: string;
    description?: string;
}

// Define the Certification type for form
export type CertificationType = {
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date?: string;
    credential_id?: string;
    verification_link?: string;
    skills?: string;
    description?: string;
};

function AdminCertificationPage() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
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
        title: Yup.string().required("Certification title is required"),
        issuer: Yup.string().required("Issuer name is required"),
        issue_date: Yup.string().required("Issue date is required"),
        expiry_date: Yup.string().nullable(),
        credential_id: Yup.string().nullable(),
        verification_link: Yup.string().url("Must be a valid URL").nullable(),
        skills: Yup.string().nullable(),
        description: Yup.string().nullable(),
    });

    // Validation schema for update
    const updateValidationSchema = Yup.object().shape({
        title: Yup.string(),
        issuer: Yup.string(),
        issue_date: Yup.string(),
        expiry_date: Yup.string().nullable(),
        credential_id: Yup.string().nullable(),
        verification_link: Yup.string().url("Must be a valid URL").nullable(),
        skills: Yup.string().nullable(),
        description: Yup.string().nullable(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CertificationType>({
        resolver: yupResolver(validationSchema) as any,
        defaultValues: {
            title: "",
            issuer: "",
            issue_date: "",
            expiry_date: "",
            credential_id: "",
            verification_link: "",
            skills: "",
            description: "",
        }
    });

    const {
        register: updateRegister,
        handleSubmit: handleUpdateSubmit,
        reset: updateReset,
    } = useForm<Partial<CertificationType>>({
        resolver: yupResolver(updateValidationSchema) as any,
        defaultValues: {
            title: "",
            issuer: "",
            issue_date: "",
            expiry_date: "",
            credential_id: "",
            verification_link: "",
            skills: "",
            description: "",
        }
    });

    // Fetch all certifications
    const listCertifications = async () => {
        try {
            setLoading(true);
            const response = await certSvc.listCert();
            setCertifications(response.data.result || []);
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch certifications");
        } finally {
            setLoading(false);
        }
    };

    // Create certification
    const createSubmitHandler: SubmitHandler<CertificationType> = async (data) => {
        // Validate image manually
        if (!selectedImageFile) {
            setImageError("Certificate image is required");
            return;
        }

        setImageError("");
        console.log("Create data:", data);
        console.log("Selected image file:", selectedImageFile);

        try {
            setCreateLoading(true);

            // Create FormData manually
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("issuer", data.issuer);
            formData.append("issue_date", data.issue_date);
            if (data.expiry_date) formData.append("expiry_date", data.expiry_date);
            if (data.credential_id) formData.append("credential_id", data.credential_id);
            if (data.verification_link) formData.append("verification_link", data.verification_link);
            if (data.skills) formData.append("skills", data.skills);
            if (data.description) formData.append("description", data.description);
            formData.append("cert_img", selectedImageFile);

            await certSvc.createCert(formData);
            toast.success("Certification created successfully");
            setIsCreateModalOpen(false);
            reset();
            setImagePreview(null);
            setSelectedImageFile(null);
            await listCertifications();
        } catch (error: any) {
            console.error("Create error:", error);
            toast.error(error.message || "Failed to create certification");
        } finally {
            setCreateLoading(false);
        }
    };

    // Update certification
    const updateSubmitHandler: SubmitHandler<Partial<CertificationType>> = async (data) => {
        console.log("Update data:", data);
        console.log("Selected update image file:", selectedUpdateImageFile);

        try {
            setUpdateLoading(true);
            if (!selectedCert) return;

            // Create FormData manually
            const formData = new FormData();

            if (data.title && data.title.trim() !== "") {
                formData.append("title", data.title);
            }
            if (data.issuer && data.issuer.trim() !== "") {
                formData.append("issuer", data.issuer);
            }
            if (data.issue_date && data.issue_date.trim() !== "") {
                formData.append("issue_date", data.issue_date);
            }
            if (data.expiry_date && data.expiry_date.trim() !== "") {
                formData.append("expiry_date", data.expiry_date);
            }
            if (data.credential_id && data.credential_id.trim() !== "") {
                formData.append("credential_id", data.credential_id);
            }
            if (data.verification_link && data.verification_link.trim() !== "") {
                formData.append("verification_link", data.verification_link);
            }
            if (data.skills && data.skills.trim() !== "") {
                formData.append("skills", data.skills);
            }
            if (data.description && data.description.trim() !== "") {
                formData.append("description", data.description);
            }
            if (selectedUpdateImageFile) {
                formData.append("cert_img", selectedUpdateImageFile);
            }

            console.log("Sending update FormData:", formData);

            await certSvc.updateCertDetail(selectedCert.cert_id, formData);
            toast.success("Certification updated successfully");
            setIsUpdateModalOpen(false);
            updateReset();
            setUpdateImagePreview(null);
            setSelectedUpdateImageFile(null);
            await listCertifications();
        } catch (error: any) {
            console.error("Update error:", error);
            toast.error(error.message || "Failed to update certification");
        } finally {
            setUpdateLoading(false);
        }
    };

    // Delete certification
    const handleDeleteCert = async () => {
        if (!selectedCert) return;

        try {
            setDeleteLoading(true);
            await certSvc.deleteCert(selectedCert.cert_id);
            toast.success("Certification deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedCert(null);
            await listCertifications();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete certification");
        } finally {
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        listCertifications();
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

    const handleView = (cert: Certification) => {
        setSelectedCert(cert);
        setIsViewModalOpen(true);
    };

    const handleEdit = (cert: Certification) => {
        setSelectedCert(cert);
        setIsUpdateModalOpen(true);
        updateReset({
            title: cert.title,
            issuer: cert.issuer,
            issue_date: cert.issue_date,
            expiry_date: cert.expiry_date || "",
            credential_id: cert.credential_id || "",
            verification_link: cert.verification_link || "",
            skills: cert.skills || "",
            description: cert.description || "",
        });
        setSelectedUpdateImageFile(null);
        setUpdateImagePreview(null);
    };

    const handleDeleteClick = (cert: Certification) => {
        setSelectedCert(cert);
        setIsDeleteModalOpen(true);
    };

    const filteredCertifications = certifications.filter(cert =>
        cert.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <h1 className="text-3xl font-bold text-primary-gold dark:text-white my-4 p-3">
                    Certifications
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
                                            placeholder="Search certifications..."
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
                                    Add Certification
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-w-full">
                            {loading && !certifications.length ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Image</th>
                                            <th scope="col" className="px-4 py-4">Title</th>
                                            <th scope="col" className="px-4 py-3">Issuer</th>
                                            <th scope="col" className="px-4 py-3">Issue Date</th>
                                            <th scope="col" className="px-4 py-3">Expiry Date</th>
                                            <th scope="col" className="px-4 py-3">
                                                <span className="">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCertifications.map((cert) => (
                                            <tr key={cert.cert_id} className="border-b dark:border-gray-700">
                                                <th scope="row" className="px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="text-3xl text-blue-600 rounded-full">
                                                        <img src={cert.cert_img} className="w-10 h-10 object-cover rounded" alt={cert.title} />
                                                    </div>
                                                </th>
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                    {cert.title}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {cert.issuer}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {formatDate(cert.issue_date)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {cert.expiry_date ? formatDate(cert.expiry_date) : "No Expiry"}
                                                </td>
                                                <td className="px-4 py-3 flex items-center">
                                                    <div className="z-10 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                                                        <ul className="flex flex-wrap gap-3 text-sm" aria-labelledby="dropdownButton2">
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleView(cert)}
                                                                    className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200 rounded"
                                                                >
                                                                    <FaEye />
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleEdit(cert)}
                                                                    className="flex items-center p-2 justify-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200 rounded"
                                                                >
                                                                    <FaEdit />
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteClick(cert)}
                                                                    className="flex  p-2 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400 rounded"
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
                            {filteredCertifications.length === 0 && !loading && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">No certifications found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Create Certification Modal */}
            <div id="createCertModal" aria-hidden="true" className={`${isCreateModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Certification</h3>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Certificate Image *</label>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Certification Title *</label>
                                    <input
                                        type="text"
                                        {...register("title")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter certification title"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issuer *</label>
                                    <input
                                        type="text"
                                        {...register("issuer")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter issuer name"
                                    />
                                    {errors.issuer && (
                                        <p className="mt-1 text-sm text-red-600">{errors.issuer.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue Date *</label>
                                    <input
                                        type="date"
                                        {...register("issue_date")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.issue_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.issue_date.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date (Optional)</label>
                                    <input
                                        type="date"
                                        {...register("expiry_date")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credential ID (Optional)</label>
                                    <input
                                        type="text"
                                        {...register("credential_id")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter credential ID"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verification Link (Optional)</label>
                                    <input
                                        type="url"
                                        {...register("verification_link")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="https://..."
                                    />
                                    {errors.verification_link && (
                                        <p className="mt-1 text-sm text-red-600">{errors.verification_link.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skills (Optional)</label>
                                    <input
                                        type="text"
                                        {...register("skills")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Comma separated skills"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description (Optional)</label>
                                    <textarea
                                        {...register("description")}
                                        rows={3}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter certification description"
                                    ></textarea>
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
                                Add Certification
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Update Certification Modal */}
            <div id="updateCertModal" aria-hidden="true" className={`${isUpdateModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Certification</h3>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Certificate Image (Optional)</label>
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
                                        ) : selectedCert && (
                                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                                <img src={selectedCert.cert_img} alt={selectedCert.title} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Certification Title (Optional)</label>
                                    <input
                                        type="text"
                                        {...updateRegister("title")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave empty to keep current title"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issuer (Optional)</label>
                                    <input
                                        type="text"
                                        {...updateRegister("issuer")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave empty to keep current issuer"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue Date (Optional)</label>
                                    <input
                                        type="date"
                                        {...updateRegister("issue_date")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date (Optional)</label>
                                    <input
                                        type="date"
                                        {...updateRegister("expiry_date")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credential ID (Optional)</label>
                                    <input
                                        type="text"
                                        {...updateRegister("credential_id")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Leave empty to keep current credential ID"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verification Link (Optional)</label>
                                    <input
                                        type="url"
                                        {...updateRegister("verification_link")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skills (Optional)</label>
                                    <input
                                        type="text"
                                        {...updateRegister("skills")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Comma separated skills"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description (Optional)</label>
                                    <textarea
                                        {...updateRegister("description")}
                                        rows={3}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter certification description"
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={updateLoading}
                                className="text-white bg-secondary-gray hover:bg-primary-gold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 disabled:opacity-50"
                            >
                                {updateLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                                ) : null}
                                Update Certification
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* View Certification Modal */}
            <div id="readCertModal" aria-hidden="true" className={`${isViewModalOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-xl max-h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={selectedCert?.cert_img} className="w-12 h-12 object-cover rounded" alt={selectedCert?.title} />
                                    <h3 className="font-semibold text-xl">{selectedCert?.title}</h3>
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
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Issuer</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                {selectedCert?.issuer}
                            </dd>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Issue Date</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                {formatDate(selectedCert?.issue_date || "")}
                            </dd>
                            {selectedCert?.expiry_date && (
                                <>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Expiry Date</dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                        {formatDate(selectedCert.expiry_date)}
                                    </dd>
                                </>
                            )}
                            {selectedCert?.credential_id && (
                                <>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Credential ID</dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                        {selectedCert.credential_id}
                                    </dd>
                                </>
                            )}
                            {selectedCert?.verification_link && (
                                <>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Verification Link</dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                        <a
                                            href={selectedCert.verification_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            {selectedCert.verification_link}
                                        </a>
                                    </dd>
                                </>
                            )}
                            {selectedCert?.skills && (
                                <>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Skills</dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                        {selectedCert.skills}
                                    </dd>
                                </>
                            )}
                            {selectedCert?.description && (
                                <>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Description</dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 whitespace-pre-wrap">
                                        {selectedCert.description}
                                    </dd>
                                </>
                            )}
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
                            Are you sure you want to delete the certification <span className="font-semibold">{selectedCert?.title}</span>?
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
                                onClick={handleDeleteCert}
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

export default AdminCertificationPage;