import { animateWithOptions, drawSVGPath } from 'lib/animations';
import { RefObject, useRef, useEffect } from 'react';
import styles from './ArrowLoop.module.scss';

type ArrowLoopRightProps = {
    className?: string;
    width?: number;
    height?: number;
};

export const ArrowLoopRight = ({
    className = '',
    width = 95,
    height = 123,
}: ArrowLoopRightProps): React.ReactElement => {
    const containerRef: RefObject<SVGSVGElement> = useRef<SVGSVGElement | null>(
        null,
    );

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
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 70 85"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.6"
            stroke="#251657"
            ref={containerRef}
        >
            <path
                className={styles.svgArrowLoopPath}
                pathLength="1"
                d="M6.6 1.8C.2 37 2.8 55.8 37.4 47 72.4 39.4 53.8 5.4 33.2 22 11 41.6 17.4 69.8 29.4 83.4"
            ></path>
            <path
                className={styles.svgArrowLoopPath}
                pathLength="1"
                d="M18.8 79.8 29.4 83.4 32.3 73.9"
            ></path>
        </svg>
    );
};
