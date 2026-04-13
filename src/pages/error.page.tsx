
import { motion } from 'framer-motion'
import { Link } from 'react-router'


function ErrorPage() {
    return (
        <>
            <section className=" dark:bg-gray-900 ">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex justify-center bg-gray-50 mt-20 rounded">
                    <div
                        className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-gold dark:text-primary-500">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-primary-black md:text-4xl dark:text-white">Something's missing.</p>
                        <p className="mb-4 text-lg font-light text-priary-gray dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                        <Link to="/" className="inline-flex text-white bg-primary-black hover:bg-primary-gold focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
                    </div>
                </motion.div>
            </section>
        </>
    )
}

export default ErrorPage