import { animateWithOptions, drawSVGPath } from 'lib/animations';
import { RefObject, useEffect, useRef } from 'react';
import styles from './ArrowLoop.module.scss';

type ArrowLoopLeftProps = {
    size?: number;
    className?: string;
};

export const ArrowLoopLeft = ({
    size = 217,
    className,
}: ArrowLoopLeftProps) => {
    const containerRef: RefObject<SVGSVGElement> = useRef<SVGSVGElement | null>(
        null,
    );

    // Animate the entrance of the SVG arrow loop.
    // Prefers reduced motion styles are applied in `PageNav.module.scss` to prevent this animation.
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

                    // Emotion: airy, graceful. Avoid the second path feeling like a tick box check. Draw the user down the page
                    animateWithOptions(
                        pathElements[0] as SVGElement,
                        drawSVGPath,
                        {
                            duration: 1700,
                            easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
                        },
                    );
                    animateWithOptions(
                        pathElements[1] as SVGElement,
                        drawSVGPath,
                        { delay: 1700, duration: 500, easing: 'ease' },
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

    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 171 217"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
            stroke="#251657"
            ref={containerRef}
        >
            <path
                className={styles.svgArrowLoopPath}
                pathLength="1"
                stroke="#251657"
                d="M169.491 38.0196C95 140-28 71 5.484 9.235 9.693 1.621 12.69 1.776 17.621 2.872 51 8 123 124 55 214"
            />
            <path
                className={styles.svgArrowLoopPath}
                pathLength="1"
                stroke="#251657"
                d="M52.8 197.184 54.084 214.904 70.378 213.0"
            />
        </svg>
    );
};

export default ArrowLoopLeft;
