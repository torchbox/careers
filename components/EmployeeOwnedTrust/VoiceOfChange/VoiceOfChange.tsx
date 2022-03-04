import styles from './VoiceOfChange.module.scss';

type VoiceOfChangeProps = {
    title: string;
    children: React.ReactNode;
};

export const VoiceOfChange = ({ title, children }: VoiceOfChangeProps) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </div>
    );
};

export default VoiceOfChange;
