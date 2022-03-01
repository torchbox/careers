import Link from 'next/link';
import { ChevronIcon } from '../Icons/ChevronIcon';
import styles from './Button.module.scss';

type ButtonTheme = 'INDIGO' | 'CORAL';

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
    const backgroundClass =
        theme === 'INDIGO' ? styles.radialBackground : styles.coralBackground;

    return (
        <>
            {internal ? (
                <Link href={url}>
                    <a
                        className={[
                            styles.button,
                            backgroundClass,
                            className,
                        ].join(' ')}
                    >
                        {children}
                        <ChevronIcon className={styles.chevron} />
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
                    {children}
                    <ChevronIcon className={styles.chevron} />
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
    <Link href={url}>
        <a
            className={[styles.button, styles.radialBackground, className].join(
                ' ',
            )}
        >
            <div className={styles.overflowHider}>
                <div className={styles.swishBackground} />
            </div>
            <div className={styles.text}>{children}</div>
            <ChevronIcon className={styles.chevron} />
            {jobs > 0 && <div className={styles.jobsBadge}>{jobs}</div>}
        </a>
    </Link>
);
