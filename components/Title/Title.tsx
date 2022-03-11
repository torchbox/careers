import styles from './Title.module.scss';

type TitleProps = {
    firstLine: string;
    secondLine: string;
};

export const Title = ({ firstLine, secondLine }: TitleProps) => (
    <h1 className={styles.title}>
        {firstLine} <br aria-hidden />
        <span className={styles.accent}>{secondLine}</span>
    </h1>
);
