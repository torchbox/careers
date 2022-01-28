import Link from 'next/link';
import { ChevronIcon } from './ChevronIcon';
import styles from '/styles/Button.module.scss';

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
            {children}
            <ChevronIcon className={styles.chevron} />
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
            <div className={styles.text}>{children}</div>
            <ChevronIcon className={styles.chevron} />
            {jobs > 0 && <div className={styles.jobsBadge}>{jobs}</div>}
        </a>
    </Link>
);
