'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { RainbowButton } from "@/components/ui/rainbow-button";

interface OverlayContentProps {
    scrollProgress: MotionValue<number>;
}

export default function OverlayContent({ scrollProgress }: OverlayContentProps) {
    // Beats Configuration
    // Beat A: 0-20%
    const opacityA = useTransform(scrollProgress, [0, 0.15, 0.20], [1, 1, 0]);
    const yA = useTransform(scrollProgress, [0, 0.20], [0, -50]);

    // Beat B: 25-50% (Fade in, then hold, then fade out)
    const opacityB = useTransform(scrollProgress, [0.20, 0.25, 0.45, 0.50], [0, 1, 1, 0]);
    const yB = useTransform(scrollProgress, [0.25, 0.45], [50, 0]);

    // Beat C: 55-75%
    const opacityC = useTransform(scrollProgress, [0.50, 0.55, 0.70, 0.75], [0, 1, 1, 0]);

    // Beat D: 80-100%
    const opacityD = useTransform(scrollProgress, [0.75, 0.80, 1], [0, 1, 1]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center">

            {/* BEAT A: THE VISION */}
            <motion.div
                style={{ opacity: opacityA, y: yA }}
                className="absolute flex flex-col items-center"
            >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white/90 mb-4 uppercase">
                    Wear Confidence.
                </h1>
                <p className="text-lg md:text-2xl text-white/50 tracking-widest uppercase text-center max-w-2xl px-4">
                    Sculpt a physique that demands attention and an energy that commands the room.
                </p>
            </motion.div>

            {/* BEAT B: THE THREE CORE PILLARS */}
            <motion.div
                style={{ opacity: opacityB, y: yB }}
                className="absolute max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
            >
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white/90 uppercase tracking-tight">Radiant Energy</h3>
                    <p className="text-base text-white/60 leading-relaxed">Fuel your life with a nutrition strategy that energizes your days and amplifies your focus.</p>
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white/90 uppercase tracking-tight">Effortless Strength</h3>
                    <p className="text-base text-white/60 leading-relaxed">Build a functional, toned physique that moves as beautifully as it looks.</p>
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white/90 uppercase tracking-tight">Unwavering Support</h3>
                    <p className="text-base text-white/60 leading-relaxed">Never feel lost. A partnership that guarantees you reach your destination.</p>
                </div>
            </motion.div>

            {/* BEAT C: THE PROOF */}
            <motion.div
                style={{ opacity: opacityC }}
                className="absolute w-full px-4 md:px-20"
            >
                <div className="flex flex-col md:flex-row justify-between items-end h-full w-full gap-10">
                    {/* Quote 1 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-none max-w-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                            <span className="text-xs uppercase tracking-widest text-white/70">Verified Result</span>
                        </div>
                        <p className="text-xl italic text-white/80 leading-relaxed">&quot;It&#39;s not just about the dress size. It&#39;s about walking into a room and feeling like I own it. Cloe unlocked a version of me I didn&#39;t know existed.&quot;</p>
                        <p className="mt-6 text-xs uppercase text-white/40 tracking-wider">— Jessica H., Tech Executive</p>
                    </div>
                    {/* Quote 2 positioned differently */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-none max-w-lg self-start md:mt-32">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                            <span className="text-xs uppercase tracking-widest text-white/70">Verified Result</span>
                        </div>
                        <p className="text-xl italic text-white/80 leading-relaxed">&quot;I have more energy for my kids and my career. The aesthetic change is a bonus; the lifestyle upgrade is the real win.&quot;</p>
                        <p className="mt-6 text-xs uppercase text-white/40 tracking-wider">— Amanda L., Entrepreneur</p>
                    </div>
                </div>
            </motion.div>

            {/* BEAT D: THE COMMITMENT */}
            <motion.div
                style={{ opacity: opacityD }}
                className="absolute flex flex-col items-center pointer-events-auto" // Enable pointer events for button
            >
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white/90 mb-6 text-center">
                    Step Into<br />Your Best Life
                </h2>
                <p className="text-base md:text-xl text-white/50 mb-10 tracking-widest uppercase text-center max-w-xl">
                    The only thing standing between you and your dream self is a decision.
                </p>
                <RainbowButton className="px-10 py-5 text-lg font-bold uppercase tracking-widest transition-all">
                    Claim Your Transformation
                </RainbowButton>
            </motion.div>

        </div>
    );
}
