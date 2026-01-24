'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';

interface CloeCanvasProps {
    scrollProgress: MotionValue<number>;
    onLoaded: () => void;
}

const FRAME_COUNT = 192;

export default function CloeCanvas({ scrollProgress, onLoaded }: CloeCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        // Pre-allocate array
        for (let i = 0; i < FRAME_COUNT; i++) {
            loadedImages[i] = new Image();
        }

        const onImageLoad = () => {
            loadedCount++;
            if (loadedCount === FRAME_COUNT) {
                setImages(loadedImages);
                setIsLoaded(true);
                onLoaded();
            }
        };

        // Trigger loads
        loadedImages.forEach((img, i) => {
            const frameNum = String(i).padStart(3, '0');
            img.src = `/frames/${frameNum}.jpg`;
            img.onload = onImageLoad;
            // Fallback for error?
            img.onerror = onImageLoad;
        });

        return () => {
            loadedImages.forEach(img => {
                img.onload = null;
                img.onerror = null;
            });
        };
    }, [onLoaded]);

    // Draw Logic
    const renderFrame = (progress: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Map progress 0..1 to image index 0..(FRAME_COUNT-1)
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(progress * FRAME_COUNT)
        );

        const image = images[frameIndex];
        if (!image) return;

        // Clear and draw
        // Efficient clearing? actually if the image covers full canvas, we might not need clear,
        // but the user said "contain", so there might be empty space.
        // The canvas is screen size.

        // Resize canvas to match window if needed (handled by logic below or CSS)
        // We'll rely on CSS for size, but internal resolution should match pixel density.

        // Scaling logic to "contain"
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = image.width || 1920;
        const imgHeight = image.height || 1080;

        // Determine if mobile (CSS pixels)
        const isMobile = window.innerWidth < 768;

        // Desktop: Contain (Math.min), Mobile: Cover (Math.max)
        const scale = isMobile
            ? Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
            : Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

        const x = (canvasWidth / 2) - (imgWidth * scale / 2);
        const y = (canvasHeight / 2) - (imgHeight * scale / 2);

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(image, x, y, imgWidth * scale, imgHeight * scale);
    };

    // Sync with scroll
    useMotionValueEvent(scrollProgress, "change", (latest) => {
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Initial draw when loaded
    useEffect(() => {
        if (isLoaded) {
            renderFrame(scrollProgress.get());
        }
    }, [isLoaded, scrollProgress]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // High DPI support
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // We need to re-render immediately
                renderFrame(scrollProgress.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, scrollProgress]); // Re-bind if loaded changes? No, closure accesses state. 
    // Actually closure captures `images` from useState if not listed in deps? 
    // `renderFrame` uses `images` from state.
    // It's better to use `images` in dependency or Ref. 
    // Since `images` is set once, it's fine. But to be safe let's add `images` to deps of `renderFrame` (implicitly by recreating it or using refs).
    // Actually `renderFrame` is defined inside component so it captures scope.
    // But `useEffect` for resize needs to see fresh `renderFrame`.

    return (
        <canvas
            ref={canvasRef}
            className="block w-full h-full object-contain"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
