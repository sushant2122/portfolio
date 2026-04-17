import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { useState } from "react";
import logo from "../assets/code.svg";
import authSvc from "../services/auth.service";

export type PasswordResetType = {
    password: string;
    confirmpassword: string;
}

function PasswordResetPage() {
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>(); // Get token from URL params
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation schema
    const resetPasswordDTO = Yup.object({
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
            .required("Password is required"),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password')], "Passwords must match")
            .required("Please confirm your password")
    });

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<PasswordResetType>({
        resolver: yupResolver(resetPasswordDTO)
    });

    // Submit handler
    const submitEvent = async (data: PasswordResetType) => {
        // Check if token exists
        if (!token) {
            toast.error("Invalid reset link. Please request a new password reset.");
            navigate('/forgot-password');
            return;
        }

        try {
            // Call API to reset password
            const response = await authSvc.resetPassword(
                {
                    password: data.password,
                    confirmpassword: data.password
                },
                token
            );

            console.log("Reset password response:", response);
            toast.success("Password reset successful! Please login with your new password.");

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (exception: any) {
            console.error("Reset password error:", exception);

            // Better error message handling
            let errorMessage = "Failed to reset password. Please try again.";

            if (exception?.response?.data?.message) {
                errorMessage = exception.response.data.message;
            } else if (exception?.data?.message) {
                errorMessage = exception.data.message;
            } else if (exception?.message) {
                errorMessage = exception.message;
            }

            // Handle token expired or invalid cases
            if (errorMessage.toLowerCase().includes('expired') ||
                errorMessage.toLowerCase().includes('invalid')) {
                toast.error("Reset link has expired or is invalid. Please request a new one.");
                setTimeout(() => {
                    navigate('/forgot-password');
                }, 3000);
            } else {
                toast.error(errorMessage);
            }
        }
    };

    return (
        <>
            <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sm:max-w-md xl:p-0">
                        <div className="flex flex-wrap justify-center pt-6">
                            <Link
                                to="/"
                                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                            >
                                <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                                <span className="text-primary-gold">Sushant Paudyal</span>
                            </Link>
                        </div>

                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Set your new password
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Please enter your new password below. Make sure it's strong and secure.
                            </p>

                            <form onSubmit={handleSubmit(submitEvent)} className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...register("password")}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                            focus:ring-primary-gold focus:border-primary-gold outline-none 
                                            dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                                            block w-full p-2.5 pr-10"
                                            placeholder="••••••••"
                                            disabled={isSubmitting}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <span className="text-red-700 text-sm mt-1 block">
                                            {errors.password.message}
                                        </span>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">
                                        Password must be at least 6 characters and include uppercase, lowercase, number, and special character.
                                    </p>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register("confirmpassword")}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                            focus:ring-primary-gold focus:border-primary-gold outline-none 
                                            dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                                            block w-full p-2.5 pr-10"
                                            placeholder="••••••••"
                                            disabled={isSubmitting}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmpassword && (
                                        <span className="text-red-700 text-sm mt-1 block">
                                            {errors.confirmpassword.message}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full text-white bg-gray-700 hover:bg-primary-gold 
                                    focus:ring-4 focus:outline-none focus:ring-yellow-300 
                                    font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                    disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? "Resetting Password..." : "Reset Password"}
                                </button>

                                <div className="text-center mt-4">
                                    <Link to="/login" className="text-sm text-primary-gold hover:underline">
                                        Back to Sign In
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PasswordResetPage;