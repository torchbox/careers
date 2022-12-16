/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { animate, animateWithOptions, drawSVGPath } from 'lib/animations';
import { RefObject, useEffect, useRef } from 'react';
import styles from './PageNav.module.scss';

type PageNavProps = {
    title: string;
    jobs?: number;
    children: React.ReactNode;
};

/*
const AnchorLinks = ({ jobs = 0 }: { jobs: number }) => {
    const smoothScrollToElement = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    const handleBenefitsLinkKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
        if (event.key === 'Enter') {
            smoothScrollToElement('#benefits');
        }
    };

    const handleLifeAtTorchboxLinkKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
        if (event.key === 'Enter') {
            smoothScrollToElement('#lifeAsATorchboxer');
        }
    };

    return (
        <ul className={styles.navigation}>
            <li className={styles.navItem}>
                <a
                    className={styles.navLink}
                    onClick={() => smoothScrollToElement('#benefits')}
                    onKeyDown={handleBenefitsLinkKeyDown}
                    tabIndex={0}
                >
                    Benefits
                </a>
            </li>
            <li className={styles.navItem}>
                <a
                    className={styles.navLink}
                    onClick={() => smoothScrollToElement('#lifeAsATorchboxer')}
                    onKeyDown={handleLifeAtTorchboxLinkKeyDown}
                    tabIndex={0}
                >
                    Life as a Torchboxer
                </a>
            </li>
            <li className={styles.jobNavItem}>
                <Link href="/jobs" scroll={false}>
                    <a className={styles.jobsLink}>
                        Jobs
                        {jobs > 0 ? (
                            <div className={styles.jobsBadge}>{jobs}</div>
                        ) : null}
                    </a>
                </Link>
            </li>
        </ul>
    );
};
*/

export const PageNav = ({ title, children }: PageNavProps) => {
    const containerRef: RefObject<HTMLDivElement> =
        useRef<HTMLDivElement | null>(null);

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
                    const pathElements =
                        entry.target.getElementsByTagName('path');

                    // for (let i = 0; i < pathElements.length; i += 1) {
                    //    animate(pathElements[i] as SVGElement, drawSVGPath);
                    // }

                    animate(pathElements[0] as SVGElement, drawSVGPath);
                    animateWithOptions(
                        pathElements[1] as SVGElement,
                        drawSVGPath,
                        { delay: 1800, duration: 500, easing: 'ease' },
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
        <div className={styles.container} ref={containerRef}>
            <svg
                id="svgArrow"
                className={styles.svgArrowLoop}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 70 85"
                fill="none"
            >
                <path
                    stroke="#251657"
                    strokeWidth="2"
                    className={styles.svgArrowLoopPath}
                    pathLength="1"
                    d="M6.6 1.8C.2 37 2.8 55.8 37.4 47 72.4 39.4 53.8 5.4 33.2 22 11 41.6 17.4 69.8 29.4 83.4"
                ></path>
                <path
                    stroke="#251657"
                    strokeWidth="2"
                    className={styles.svgArrowLoopPath}
                    pathLength="1"
                    d="M19.8 79.8 29.4 83.4 32.6 74.2"
                ></path>
            </svg>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.richText}>{children}</div>
        </div>
    );
};
export default PageNav;
