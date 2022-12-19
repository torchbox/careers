import { animateWithOptions, drawSVGPath } from 'lib/animations';
import { useEffect } from 'react';

export const useArrowAnimation = (containerRef: any) => {
    // Animate the entrance of the SVG arrow loop.
    useEffect(() => {
        const containerNode = containerRef?.current;
        const hasIOSupport = !!window.IntersectionObserver;
        if (!hasIOSupport || !containerNode) return;

        const callback = (
            entries: IntersectionObserverEntry[],
            observer: IntersectionObserver,
        ) => {
            // Look at all intersection observer event entries reported
            entries.forEach((entry) => {
                // If the event entry is of a target element intersecting with the observer
                if (entry.isIntersecting) {
                    const pathElements = entry.target.children;

                    // Movement should be graceful. Avoid the second path feeling like a tick box check.
                    animateWithOptions(
                        pathElements[0] as SVGElement,
                        drawSVGPath,
                        {
                            duration: 1600,
                            easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
                        },
                    );
                    animateWithOptions(
                        pathElements[1] as SVGElement,
                        drawSVGPath,
                        { delay: 1600, duration: 500, easing: 'ease' },
                    );

                    // Stop observing so the animation doesn't replay if they scroll down again.
                    observer.unobserve(entry.target);
                }
            });
        };

        let observerThreshold = 0.1;

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: observerThreshold,
        });

        observer.observe(containerNode);

        return () => observer.disconnect();
    });
};
