import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { useContext } from "react";
import logo from '../assets/code.svg';

import AuthContext from "../context/auth.context";
import authSvc from "../services/auth.service";

export type CredentialType = {
    email: string;
    password: string;
}

function LoginPage() {
    const navigate = useNavigate();
    const auth: any = useContext(AuthContext);

    // Validation schema
    const loginDTO = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required")
    });

    // React Hook Form setup
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialType>({
        resolver: yupResolver(loginDTO)
    });

    // Submit handler
    // Submit handler - Updated with better debugging
    const submitEvent = async (credentials: CredentialType) => {
        try {
            console.log("Attempting login with:", credentials.email);

            // API call to login
            const loginResponse = await authSvc.login(credentials);
            console.log("Login response:", loginResponse);

            // Check if login was successful
            if (!loginResponse || !loginResponse.data) {
                throw new Error("Invalid response from server");
            }

            // Get logged-in user details
            const userResponse = await authSvc.getLoggedInUser();
            console.log("User response:", userResponse);

            // Set user in context
            if (userResponse?.data?.result) {
                auth.setLoggedInUser(userResponse.data.result);
                toast.success("User successfully logged in.");

                // Navigate based on role or default to admin
                const role = userResponse.data.result.role;
                if (role) {
                    navigate(role === 'Admin' ? '/admin' : '/');
                } else {
                    navigate('/admin');
                }
            } else {
                throw new Error("No user data received");
            }

        } catch (exception: any) {
            console.error("Login error details:", exception);

            // Better error message handling
            let errorMessage = "Login failed. Please try again.";

            if (exception?.response?.data?.message) {
                errorMessage = exception.response.data.message;
            } else if (exception?.data?.message) {
                errorMessage = exception.data.message;
            } else if (exception?.message) {
                errorMessage = exception.message;
            }

            toast.error(errorMessage);
        }
    }

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
                                Sign in to your account
                            </h1>

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
                                    />
                                    {errors.email && (
                                        <span className="text-red-700 text-sm mt-1 block">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-primary-gold outline-none focus:border-primary-gold 
                                        dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                                        block w-full p-2.5"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && (
                                        <span className="text-red-700 text-sm mt-1 block">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <Link
                                        to="/reset"
                                        className="text-sm font-medium text-primary-gold hover:underline dark:text-primary-gold"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-gray-700 hover:bg-primary-gold 
                                    focus:ring-4 focus:outline-none focus:ring-yellow-300 
                                    font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                                >
                                    login
                                </button>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage;