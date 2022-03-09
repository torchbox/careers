import styles from './ReasonsToJoin.module.scss';

type ReasonsToJoinProps = {
    title: string;
    children: React.ReactNode;
};

export const ReasonsToJoin = ({ title, children }: ReasonsToJoinProps) => (
    <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.textContainer}>{children}</div>
    </div>
);

export default ReasonsToJoin;
