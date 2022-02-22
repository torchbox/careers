import { ChevronIcon } from 'components/Icons/ChevronIcon';
import styles from './ApplyButton.module.scss';

type ApplyButtonProps = {
    className?: string;
    url: string;
    title: string;
    children: React.ReactNode;
};

export const ApplyButton = ({
    className,
    url,
    title,
    children,
}: ApplyButtonProps) => (
    <a
        href={url}
        className={[styles.button, styles.radialBackground, className].join(
            ' ',
        )}
    >
        <div className={styles.overflowHider}>
            <div className={styles.swishBackground} />
        </div>
        <div className={styles.title}>
            {title}{' '}
            <ChevronIcon className={styles.chevron} width={28} height={40} />
        </div>
        <div className={styles.text}>{children}</div>
    </a>
);
