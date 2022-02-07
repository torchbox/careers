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
        <a className={[styles.button, className].join(' ')}>
            {children}
            <ChevronIcon className={styles.chevron} />
            {jobs > 0 ? <div className={styles.jobsBadge}>{jobs}</div> : null}
        </a>
    </Link>
);
