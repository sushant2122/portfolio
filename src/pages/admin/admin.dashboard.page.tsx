import { FaEnvelope, FaReply } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminStatsSvc from "../../services/admin-stats";

interface Stat {
    name: string;
    value: string;
}

interface Message {
    id: number;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
}

function AdminDashboardPage() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch admin stats
    const fetchStats = async () => {
        try {
            const response = await adminStatsSvc.listAdminStats();
            console.log("Stats response:", response);

            if (response?.data?.result) {
                setStats(response.data.result);
            }
        } catch (error: any) {
            console.error("Error fetching stats:", error);
            toast.error(error?.response?.data?.message || "Failed to load statistics");
        }
    };

    // Fetch recent messages
    const fetchMessages = async () => {
        try {
            const response = await adminStatsSvc.listRecentMessages();
            console.log("Messages response:", response);

            if (response?.data?.result) {
                setMessages(response.data.result.messages || []);
                setUnreadCount(response.data.result.unread_count || 0);
            }
        } catch (error: any) {
            console.error("Error fetching messages:", error);
            toast.error(error?.response?.data?.message || "Failed to load messages");
        }
    };

    // Get stat value by name
    const getStatValue = (name: string): string => {
        const stat = stats.find(s => s.name === name);
        return stat?.value || "0";
    };

    // Initial load
    useEffect(() => {
        const loadDashboard = async () => {
            setLoading(true);
            await Promise.all([fetchStats(), fetchMessages()]);
            setLoading(false);
        };

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="loading loading-spinner loading-lg text-primary-gold"></div>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-primary-gold dark:text-white my-4 p-3">
                Dashboard
            </h1>

            {/* Stats Section */}
            <div className="flex flex-wrap py-3 justify-center">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Skills</div>
                        <div className="stat-value text-primary">
                            {getStatValue("Total Skills")}
                        </div>
                        <div className="stat-desc">Upgrade your skills more.</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Portfolio</div>
                        <div className="stat-value text-secondary">
                            {getStatValue("Total Portfolio")}
                        </div>
                        <div className="stat-desc">Add more projects.</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Messages</div>
                        <div className="stat-value">
                            {getStatValue("Total Messages")}
                        </div>
                        <div className="stat-desc text-secondary">
                            {unreadCount} unread messages
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Unread Messages</div>
                        <div className="stat-value text-warning">
                            {getStatValue("Unread Messages")}
                        </div>
                        <div className="stat-desc">Need your attention</div>
                    </div>
                </div>
            </div>

            {/* Messages Section */}
            <div className="flex mt-10 justify-center">
                <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-xl">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between items-center">
                        <span>Recent Messages</span>
                        {unreadCount > 0 && (
                            <span className="badge badge-warning badge-sm">
                                {unreadCount} unread
                            </span>
                        )}
                    </li>

                    {messages.length === 0 ? (
                        <li className="p-8 text-center text-gray-500">
                            No messages yet
                        </li>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id}>
                                {/* Message Row */}
                                <li className={`list-row flex items-center justify-between p-3 border-b ${!msg.is_read ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                                    <label
                                        htmlFor={`modal-${msg.id}`}
                                        className="flex items-center gap-4 w-full cursor-pointer"
                                    >
                                        <FaEnvelope
                                            size={24}
                                            className={!msg.is_read ? "text-primary-gold" : "text-gray-400"}
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium flex items-center gap-2">
                                                {msg.email}
                                                {!msg.is_read && (
                                                    <span className="badge badge-warning badge-xs">New</span>
                                                )}
                                            </div>
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

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-end gap-3 mt-6">
                                            <label
                                                htmlFor={`modal-${msg.id}`}
                                                className="btn btn-outline"
                                            >
                                                Close
                                            </label>
                                        </div>
                                    </div>
                                    <label className="modal-backdrop" htmlFor={`modal-${msg.id}`}>Close</label>
                                </div>
                            </div>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
}

export default AdminDashboardPage;