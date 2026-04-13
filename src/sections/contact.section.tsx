import { motion } from "framer-motion"

function ContactSection() {
    return (
        <>
            <section id="contact" className="bg-white dark:bg-gray-900">
                <div className="  py-8 lg:py-16 px-4 mx-auto max-w-screen-lg rounded">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Get in touch<span className="text-primary-gold">  with Us</span>
                        </h2>

                    </motion.div>

                    <form action="#" className="space-y-8 border border-white p-10 rounded">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-primary-gold focus:border-primary-gold block w-full p-2.5 " placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-primary-gold focus:border-primary-gold" placeholder="Let us know how we can help you" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-primary-gold focus:border-primary-gold " placeholder="Leave a comment..."></textarea>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-black self-place-center sm:w-fit hover:bg-primary-gold focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                        </div>

                    </form>
                </div>
            </section>

        </>
    )
}

export default ContactSection