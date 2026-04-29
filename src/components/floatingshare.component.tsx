
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {

    TwitterShareButton,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TelegramShareButton,

    EmailShareButton,
    FacebookMessengerIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramIcon,

    EmailIcon,
} from 'react-share';
import { FaLink, FaShareAlt } from 'react-icons/fa';

const shareUrl = 'https://www.sushantpaudyal.info.np/';
const title = 'Sushant Paudyal - Portfolio';

export const FloatingShareButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-full right-0 mb-4 flex flex-col gap-3"
                    >
                        <FacebookMessengerShareButton url={shareUrl} appId={import.meta.env.VITE_FB_APP_ID}>
                            <FacebookMessengerIcon size={48} round />
                        </FacebookMessengerShareButton>

                        <TwitterShareButton url={shareUrl} title={title}>
                            <TwitterIcon size={48} round />
                        </TwitterShareButton>

                        <LinkedinShareButton url={shareUrl} title={title}>
                            <LinkedinIcon size={48} round />
                        </LinkedinShareButton>

                        <WhatsappShareButton url={shareUrl} title={title}>
                            <WhatsappIcon size={48} round />
                        </WhatsappShareButton>

                        <TelegramShareButton url={shareUrl} title={title}>
                            <TelegramIcon size={48} round />
                        </TelegramShareButton>

                        <EmailShareButton url={shareUrl} subject={title} body="Check this out!">
                            <EmailIcon size={48} round />
                        </EmailShareButton>

                        <button
                            onClick={copyToClipboard}
                            className="w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                        >
                            <FaLink className="text-white w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary-gold to-primary-gold/80 shadow-xl flex items-center justify-center"
            >
                <FaShareAlt className="text-white w-6 h-6" />
            </motion.button>

            {copied && (
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-green-500 text-white text-sm rounded">
                    Copied!
                </div>
            )}
        </div>
    );
};


