import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import logo from "../assets/code.svg";
import AuthContext from "../context/auth.context";
import authSvc from "../services/auth.service";

export type ResetType = {
    email: string;
}

function EmailResetPage() {
    const navigate = useNavigate();
    const auth: any = useContext(AuthContext);

    // Validation schema
    const resetDTO = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required")
    });

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ResetType>({
        resolver: yupResolver(resetDTO)
    });

    // Submit handler
    const submitEvent = async (data: ResetType) => {
        try {
            await authSvc.forgotPassword(data);
            toast.success("Password reset link has been sent to your email. Please check your inbox.");
            navigate('/login'); // Redirect to login page after success
        } catch (exception: any) {
            console.error("Forgot password error:", exception);

            // Better error message handling
            let errorMessage = "Failed to send reset email. Please try again.";

            if (exception?.response?.data?.message) {
                errorMessage = exception.response.data.message;
            } else if (exception?.data?.message) {
                errorMessage = exception.data.message;
            } else if (exception?.message) {
                errorMessage = exception.message;
            }

            toast.error(errorMessage);
        }
    };

    // Check if user is already logged in
    const loginCheck = async () => {
        try {
            if (auth.loggedInUser) {
                const role = auth.loggedInUser.role_title;
                navigate(role === 'Player' ? '/' : '/' + role);
            }
        } catch (exception) {
            console.log(exception);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('access') || null;
        if (token) {
            loginCheck();
        }
    }, [auth]);

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
                                Reset your password
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit(submitEvent)} className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-gold focus:border-primary-gold outline-none 
                                        dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                                        block w-full p-2.5"
                                        placeholder="name@company.com"
                                        disabled={isSubmitting}
                                    />
                                    {errors.email && (
                                        <span className="text-red-700 text-sm mt-1 block">
                                            {errors.email.message}
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
                                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                                </button>

                                <div className="text-center mt-4">
                                    <Link
                                        to="/login"
                                        className="text-sm text-primary-gold hover:underline"
                                    >
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

export default EmailResetPage;