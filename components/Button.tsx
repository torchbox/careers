import Link from 'next/link';
import { ChevronIcon } from './ChevronIcon';
import styles from '/styles/Button.module.scss';

type ButtonProps = {
    className?: string;
    url: string;
    jobs?: number;
    children: React.ReactNode;
};

export const Button = ({ className, url, jobs, children }: ButtonProps) => (
    <Link href={url}>
        <a
            className={
                className !== undefined
                    ? `${styles.button} ${className}`
                    : `${styles.button}`
            }
        >
            {children}
            <ChevronIcon className={styles.chevron} />
            {jobs !== undefined && jobs > 0 ? (
                <div className={styles.jobsBadge}>{jobs}</div>
            ) : null}
        </a>
    </Link>
);
