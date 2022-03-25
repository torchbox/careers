import styles from './Quote.module.scss';

type QuoteProps = {
    name: string;
    position?: string;
    children: React.ReactNode;
};

export const Quote = ({ name, position, children }: QuoteProps) => (
    <div className={styles.container}>
        <p className={styles.quote}>{children}</p>
        <p className={styles.quotee}>
            {name}
            {position && ` - ${position}`}
        </p>
    </div>
);

export default Quote;
