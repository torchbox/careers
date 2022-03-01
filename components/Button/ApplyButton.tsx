import { ChevronIcon } from 'components/Icons/ChevronIcon';
import { useScreen } from 'hooks/useScreen';
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
}: ApplyButtonProps) => {
    const screen = useScreen();
    let size = 22;
    if (screen.includes('medium')) size = 28;

    return (
        <a
            href={url}
            className={[styles.button, styles.radialBackground, className].join(
                ' ',
            )}
        >
            <div className={styles.overflowHider}>
                <div className={styles.swishBackground} />
            </div>
            <div className={styles.titleContainer}>
                <p className={styles.title}>{title}</p>
                <ChevronIcon className={styles.chevron} size={size} />
            </div>
            <div className={styles.text}>{children}</div>
        </a>
    );
};
