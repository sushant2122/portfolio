import { FaEnvelope } from "react-icons/fa";
import { FaReply } from "react-icons/fa6";

function AdminDashboardPage() {


    const messages = [
        {
            id: 1,
            email: "sushantpaudyal@gmail.com",
            subject: "Inquiry about service",
            message: "Hello, I want to know more about your services."
        },
        {
            id: 2,
            email: "test@gmail.com",
            subject: "Booking Issue",
            message: "I am facing issues while booking futsal."
        }
    ];

    return (
        <>
            <h1 className="text-3xl font-bold text-primary-gold dark:text-white  my-4 p-3 ">
                Dashboard
            </h1>
            {/* Stats Section */}
            <div className="flex flex-wrap py-3 justify-center">
                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-title">Total Skills</div>
                        <div className="stat-value text-primary">20</div>
                        <div className="stat-desc">Upgrade your skills more.</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Projects</div>
                        <div className="stat-value text-secondary">6</div>
                        <div className="stat-desc">Add more projects.</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Messages</div>
                        <div className="stat-value">100</div>
                        <div className="stat-desc text-secondary">30 unread messages.</div>
                    </div>

                </div>
            </div>

            {/* Messages Section */}
            {/* Messages Section */}
            <div className="flex mt-10 justify-center">
                <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-xl">

                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                        Recent Messages
                    </li>

                    {messages.map((msg) => (
                        <div key={msg.id}>

                            {/* Message Row */}
                            <li className="list-row flex items-center justify-between p-3 border-b">

                                <label htmlFor={`modal-${msg.id}`} className="flex items-center gap-4 w-full cursor-pointer">
                                    <FaEnvelope size={24} className="text-primary-gold" />

                                    <div className="flex-1">
                                        <div className="font-medium">{msg.email}</div>
                                        <h3 className="text-sm font-semibold">{msg.subject}</h3>
                                        <p className="text-xs opacity-60 truncate">
                                            {msg.message}
                                        </p>
                                    </div>
                                </label>

                                <button className="btn btn-square btn-ghost bg-gray-200 hover:bg-primary-gold">
                                    <FaReply />
                                </button>
                            </li>

                            {/* Modal */}
                            <input type="checkbox" id={`modal-${msg.id}`} className="modal-toggle" />

                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg mb-2">{msg.subject}</h3>

                                    <p className="text-sm mb-2">
                                        <span className="font-semibold">From:</span> {msg.email}
                                    </p>

                                    <p className="py-2 text-gray-600">
                                        {msg.message}
                                    </p>

                                    {/* Reply Button */}
                                    <div className="flex items-center justify-end gap-3 mt-6">

                                        {/* Reply Button */}
                                        <button className="btn bg-primary-gold text-white flex items-center gap-2 px-4">
                                            <FaReply /> Reply
                                        </button>

                                        {/* Close Button */}
                                        <label
                                            htmlFor={`modal-${msg.id}`}
                                            className="btn btn-outline"
                                        >
                                            Close
                                        </label>

                                    </div>

                                </div>
                            </div>

                        </div>
                    ))}

                </ul>
            </div>
        </>
    );
}

export default AdminDashboardPage;