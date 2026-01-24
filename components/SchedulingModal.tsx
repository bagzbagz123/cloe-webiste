'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface SchedulingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SchedulingModal({ isOpen, onClose }: SchedulingModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Load Calendly script
    useEffect(() => {
        if (isOpen) {
            const head = document.querySelector('head');
            const script = document.createElement('script');
            script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
            script.setAttribute('async', 'true');
            head?.appendChild(script);

            return () => {
                // Optional: cleanup if needed, though usually fine to leave script loaded
                // head?.removeChild(script); 
            };
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="pointer-events-auto w-full max-w-4xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <h2 className="text-2xl font-bold uppercase tracking-wider text-white">
                                    Schedule Your Call
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto bg-[#0a0a0a] min-h-[750px] relative">
                                {/* Calendly Inline Widget */}
                                <div
                                    className="calendly-inline-widget w-full h-full min-h-[700px]"
                                    data-url="https://calendly.com/contact-kolossmedia/one-on-one-fitness-coaching"
                                    style={{ minWidth: '320px', height: '700px' }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
