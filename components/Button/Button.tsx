import Link from 'next/link';
import { ChevronIcon } from '../Icons/ChevronIcon';
import styles from './Button.module.scss';

type ButtonProps = {
    className?: string;
    url: string;
    jobs: number;
    children: React.ReactNode;
};

export const Button = ({ className, url, jobs = 0, children }: ButtonProps) => (
    <Link href={url}>
        <a
            className={[styles.button, styles.radialBackground, className].join(
                ' ',
            )}
        >
            <div className={styles.textContainer}>
                {children}
                <ChevronIcon className={styles.endingChevron} size={20} />
            </div>
            {jobs > 0 && <div className={styles.jobsBadge}>{jobs}</div>}
        </a>
    </Link>
);

export const SwishButton = ({
    className,
    url,
    jobs = 0,
    children,
}: ButtonProps) => (
    <Link href={url}>
        <a
            className={[styles.button, styles.radialBackground, className].join(
                ' ',
            )}
        >
            <div className={styles.overflowHider}>
                <div className={styles.swishBackground} />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.text}>{children}</div>
                <ChevronIcon className={styles.endingChevron} size={20} />
            </div>
            {jobs > 0 && <div className={styles.jobsBadge}>{jobs}</div>}
        </a>
    </Link>
);

type CarouselArrowButtonProps = {
    leftFacing?: boolean;
    carouselButtonRef: React.RefObject<HTMLButtonElement>;
    className?: string;
};

export const CarouselArrowButton = ({
    leftFacing = false,
    carouselButtonRef,
    className,
}: CarouselArrowButtonProps) => {
    return (
        <button
            type="button"
            ref={carouselButtonRef}
            className={[styles.button, styles.chevronButton, className].join(
                ' ',
            )}
            aria-hidden
        >
            <ChevronIcon
                className={`${styles.centerChevron} ${
                    leftFacing ? styles.centerChevronFacingLeft : ''
                }`}
            />
        </button>
    );
};
