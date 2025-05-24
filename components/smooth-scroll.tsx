    "use client";
    import React, { useEffect, useRef } from 'react';
    import LocomotiveScroll from 'locomotive-scroll';
    import 'locomotive-scroll/dist/locomotive-scroll.css';
    import { useRouter } from 'next/router';
    const SmoothScroll: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
        const containerRef = useRef<HTMLDivElement | null>(null);
        const locomotiveRef = useRef<LocomotiveScroll | null>(null);
        const router = useRouter();

        useEffect(() => {
            if (!containerRef.current) return;

            locomotiveRef.current = new LocomotiveScroll({
                el: containerRef.current,
                smooth: true,
                // Add any other options you need
            });

            // Update Locomotive Scroll on route changes (important for Next.js)
            const routerChangeHandler = () => {
                (locomotiveRef.current as any)?.update?.();
            };

            router.events.on('routeChangeComplete', routerChangeHandler);

            return () => {
                router.events.off('routeChangeComplete', routerChangeHandler);
                locomotiveRef.current?.destroy();
            };
        }, [router]);

        useEffect(() => {
            (locomotiveRef.current as any)?.update?.();
        }, [children]);

        return (
            <div className="app-container" data-scroll-container ref={containerRef}>
                {children}
            </div>
        );
    };

    export default SmoothScroll;
