import { animateWithOptions, drawSVGPath } from 'lib/animations';
import { RefObject, useEffect } from 'react';

/**
 * This hook draws a the paths of a SVG arrow as it scrolls into the viewport.
 * Note that this hook specifically draws only two SVG paths. This should be refactored for more complex SVGs.
 * The SVG path strokeDashArray and strokeDashoffset should be set to 1 in scss.
 * To use, add a ref to the SVG and pass it to this hook.
 *
 * @param svgRef element that contains the paths to be animated
 */
export const useDrawArrow = (svgRef: RefObject<SVGSVGElement>) => {
    // Animate the entrance of the SVG arrow loop.
    useEffect(() => {
        const containerNode = svgRef?.current;
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

                    // Movement should be graceful, adjust easing carefully here.
                    // Avoid the second path feeling like a tick box check.
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
