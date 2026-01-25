'use client';

import { useRef, useState } from 'react';
import { useScroll, useSpring, motion, AnimatePresence } from 'framer-motion';
import CloeCanvas from '@/components/CloeCanvas';
import OverlayContent from '@/components/OverlayContent';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main ref={containerRef} className="relative h-[500vh] bg-black">

      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-24 bg-white/20 overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-full w-full bg-white"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 animate-pulse">
                Initializing Experience
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 h-screen w-full overflow-hidden isolation-isolate">
        {/* Canvas Layer - Uses smooth spring physics */}
        {/* Canvas Layer */}
        <div className="absolute inset-0">
          <CloeCanvas
            scrollProgress={smoothProgress}
            onLoaded={() => setIsLoaded(true)}
          />
        </div>

        {/* Text Overlay Layer */}
        <div className="absolute inset-0">
          <OverlayContent scrollProgress={smoothProgress} />
        </div>

        {/* Subtle noise/texture overlay for "premium" feel? Optional */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
      </div>

    </main>
  );
}
