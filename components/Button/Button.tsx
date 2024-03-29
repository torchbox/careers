import Link from 'next/link';
import { ChevronIcon } from 'components/Icons/ChevronIcon';
import styles from './Button.module.scss';

type ButtonTheme = 'INDIGO' | 'CORAL' | 'WHITE';

type ButtonProps = {
    className?: string;
    url: string;
    jobs?: number;
    internal?: boolean;
    theme?: ButtonTheme;
    children: React.ReactNode;
};

export const Button = ({
    className,
    url,
    jobs = 0,
    internal = true,
    theme = 'INDIGO',
    children,
}: ButtonProps) => {
    let backgroundClass;

    switch (theme) {
        case 'INDIGO':
            backgroundClass = styles.radialBackground;
            break;
        case 'CORAL':
            backgroundClass = styles.coralBackground;
            break;
        case 'WHITE':
            backgroundClass = styles.whiteBackground;
    }

    return (
        <>
            {internal ? (
                <Link href={url} scroll={false} legacyBehavior>
                    <a
                        className={[
                            styles.button,
                            backgroundClass,
                            className,
                        ].join(' ')}
                    >
                        <div className={styles.textContainer}>
                            {children}
                            <ChevronIcon
                                className={styles.endingChevron}
                                size={18}
                            />
                        </div>
                        {jobs > 0 && (
                            <div className={styles.jobsBadge}>{jobs}</div>
                        )}
                    </a>
                </Link>
            ) : (
                <a
                    className={[styles.button, backgroundClass, className].join(
                        ' ',
                    )}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className={styles.textContainer}>
                        {children}
                        <ChevronIcon
                            className={styles.endingChevron}
                            size={18}
                        />
                    </div>
                    {jobs > 0 && <div className={styles.jobsBadge}>{jobs}</div>}
                </a>
            )}
        </>
    );
};

export const SwishButton = ({
    className,
    url,
    jobs = 0,
    children,
}: ButtonProps) => (
    <Link href={url} scroll={false} legacyBehavior>
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
            className={[styles.button, styles.carouselButton, className].join(
                ' ',
            )}
            aria-label={
                leftFacing ? 'Carousel button left' : 'Carousel button right'
            }
        >
            <ChevronIcon
                className={`${styles.centerChevron} ${
                    leftFacing ? styles.centerChevronFacingLeft : ''
                }`}
            />
        </button>
    );
};
