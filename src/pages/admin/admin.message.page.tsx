import { FaEnvelope, FaEnvelopeOpen, FaReply, FaTrash } from "react-icons/fa";
import { BiMessageCheck, BiMessageDetail } from "react-icons/bi";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { useState } from "react";

interface Message {
    id: number;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

function AdminMessagePage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            email: "sushantpaudyal@gmail.com",
            subject: "Inquiry about service",
            message: "Hello, I want to know more about your services. Could you please provide me with detailed information about pricing and availability?",
            is_read: false,
            created_at: "2024-01-15 10:30 AM"
        },
        {
            id: 2,
            email: "test@gmail.com",
            subject: "Booking Issue",
            message: "I am facing issues while booking futsal. The payment gateway keeps failing. Please help me resolve this issue.",
            is_read: true,
            created_at: "2024-01-14 03:45 PM"
        },
        {
            id: 3,
            email: "john.doe@example.com",
            subject: "Partnership Opportunity",
            message: "We are interested in partnering with your platform. Let's discuss potential collaboration opportunities.",
            is_read: false,
            created_at: "2024-01-16 09:15 AM"
        }
    ]);

    const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleMarkAsRead = (id: number): void => {
        setMessages(messages.map(msg =>
            msg.id === id ? { ...msg, is_read: true } : msg
        ));
    };

    const handleMarkAsUnread = (id: number): void => {
        setMessages(messages.map(msg =>
            msg.id === id ? { ...msg, is_read: false } : msg
        ));
    };

    const handleDelete = (id: number): void => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            setMessages(messages.filter(msg => msg.id !== id));
            if (selectedMessage?.id === id) {
                setIsModalOpen(false);
                setSelectedMessage(null);
            }
        }
    };

    const handleViewMessage = (message: Message): void => {
        setSelectedMessage(message);
        setIsModalOpen(true);
        if (!message.is_read) {
            handleMarkAsRead(message.id);
        }
    };

    const handleReply = (email: string): void => {
        window.location.href = `mailto:${email}`;
    };

    const filteredMessages = messages.filter(msg => {
        if (filter === "read") return msg.is_read === true;
        if (filter === "unread") return msg.is_read === false;
        return true;
    });

    const getUnreadCount = (): number => {
        return messages.filter(msg => !msg.is_read).length;
    };

    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-primary-gold dark:text-blue-400 mb-2">
                            Messages
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage and respond to customer inquiries
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-primary-gold">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Messages</p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{messages.length}</p>
                                </div>
                                <FaEnvelope className="text-3xl text-primary-gold opacity-50" />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Unread Messages</p>
                                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{getUnreadCount()}</p>
                                </div>
                                <MdMarkEmailUnread className="text-3xl text-red-500 opacity-50" />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Read Messages</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{messages.filter(m => m.is_read).length}</p>
                                </div>
                                <MdMarkEmailRead className="text-3xl text-green-500 opacity-50" />
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex space-x-4 p-4">
                                <button
                                    onClick={() => setFilter("all")}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === "all"
                                        ? "bg-primary-gold text-white"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    All Messages
                                </button>
                                <button
                                    onClick={() => setFilter("unread")}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === "unread"
                                        ? "bg-red-300 text-white"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Unread
                                    {getUnreadCount() > 0 && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                                            {getUnreadCount()}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setFilter("read")}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === "read"
                                        ? "bg-green-600 text-white"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Read
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredMessages.length === 0 ? (
                                <div className="text-center py-12">
                                    <FaEnvelope className="text-6xl text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">No messages found</p>
                                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                                        {filter === "unread" ? "All messages have been read" : filter === "read" ? "No read messages yet" : "No messages in inbox"}
                                    </p>
                                </div>
                            ) : (
                                filteredMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${!msg.is_read ? "bg-blue-50 dark:bg-primary-gold/10" : ""
                                            }`}
                                        onClick={() => handleViewMessage(msg)}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3 flex-1">
                                                {/* Icon */}
                                                <div className="flex-shrink-0">
                                                    {!msg.is_read ? (
                                                        <div className="w-10 h-10 rounded-full bg-gold-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                            <FaEnvelope className="text-primary-gold-600 dark:text-primary-gold" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                            <FaEnvelopeOpen className="text-gray-500 dark:text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span className="font-semibold text-gray-900 dark:text-white">
                                                            {msg.email}
                                                        </span>
                                                        {!msg.is_read && (
                                                            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                                                                New
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {msg.created_at}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                                                        {msg.subject}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                        {msg.message}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                                {!msg.is_read ? (
                                                    <button
                                                        onClick={() => handleMarkAsRead(msg.id)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                        title="Mark as read"
                                                    >
                                                        <BiMessageCheck size={18} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMarkAsUnread(msg.id)}
                                                        className="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors"
                                                        title="Mark as unread"
                                                    >
                                                        <MdMarkEmailUnread size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleReply(msg.email)}
                                                    className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                                    title="Reply"
                                                >
                                                    <FaReply size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Message Detail Modal */}
            {isModalOpen && selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <BiMessageDetail className="text-2xl text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {selectedMessage.subject}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            From: {selectedMessage.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Received</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedMessage.created_at}</p>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </p>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => handleReply(selectedMessage.email)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <FaReply /> Reply
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete(selectedMessage.id);
                                        setIsModalOpen(false);
                                    }}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <FaTrash /> Delete
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminMessagePage;