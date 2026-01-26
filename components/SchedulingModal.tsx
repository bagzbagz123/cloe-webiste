'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

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

    // Load Cal.com script
    useEffect(() => {
        if (isOpen) {
            (function (C: any, A: string, L: string) {
                const p = function (a: any, ar: any) { a.q.push(ar); };
                const d = C.document;
                C.Cal = C.Cal || function (...args: any[]) {
                    const cal = C.Cal;
                    if (!cal.loaded) {
                        cal.ns = {};
                        cal.q = cal.q || [];
                        const script = d.createElement("script");
                        script.src = A;
                        d.head.appendChild(script);
                        cal.loaded = true;
                    }
                    if (args[0] === L) {
                        const api: any = function (...apiArgs: any[]) { p(api, apiArgs); };
                        const namespace = args[1];
                        api.q = api.q || [];
                        if (typeof namespace === "string") {
                            cal.ns[namespace] = cal.ns[namespace] || api;
                            p(cal.ns[namespace], args);
                            p(cal, ["initNamespace", namespace]);
                        } else p(cal, args);
                        return;
                    }
                    p(cal, args);
                };
            })(window, "https://app.cal.com/embed/embed.js", "init");

            (window as any).Cal("init", "30min", { origin: "https://app.cal.com" });

            (window as any).Cal.ns["30min"]("inline", {
                elementOrSelector: "#my-cal-inline-30min",
                config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
                calLink: "ivans-qbhhss/30min",
            });

            (window as any).Cal.ns["30min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
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
                                {/* Cal.com Inline Widget */}
                                <div
                                    id="my-cal-inline-30min"
                                    className="w-full h-full min-h-[700px] overflow-scroll"
                                />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
