import styles from './MainContent.module.scss';

type MainContentProps = {
    firstLine: string;
    secondLine: string;
    thirdLine: string;
    children: React.ReactNode;
};

export const MainContent = ({
    firstLine,
    secondLine,
    thirdLine,
    children,
}: MainContentProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.title}>
                        {firstLine}
                        <span className={styles.accent}>{secondLine}</span>
                        {thirdLine}
                    </h2>
                </div>
                {children}
            </div>
        </div>
    );
};

export default MainContent;
