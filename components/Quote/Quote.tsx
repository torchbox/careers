import styles from './Quote.module.scss';

type QuoteProps = {
    name: string;
    role: string;
    children: React.ReactNode;
};

export const Quote = ({ name, role, children }: QuoteProps) => (
    <div className={styles.container}>
        <p className={styles.quote}>{children}</p>
        <p className={styles.quotee}>
            {name} - {role}
        </p>
    </div>
);

export default Quote;
