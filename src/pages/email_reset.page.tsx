import { Link } from "react-router"

import logo from "../../public/code.svg";
function EmailResetPage() {
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

                            <form className="space-y-4 md:space-y-6">

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-primary-gold focus:border-primary-gold outline-none 
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
              block w-full p-2.5"
                                        placeholder="name@company.com"
                                    />
                                </div>




                                <button
                                    type="submit"
                                    className="w-full text-white bg-gray-700 hover:bg-primary-gold 
            focus:ring-4 focus:outline-none focus:ring-yellow-300 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Send
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmailResetPage