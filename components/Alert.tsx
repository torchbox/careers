import styles from "styles/Alert.module.scss";

export const Alert: React.FC<{ preview: boolean }> = ({ preview }) => {
    return (
        <>
            {preview ? (
                <div className={styles.container}>
                    <p className={styles.message}>
                        This is page is a preview.{" "}
                        <a href="/api/exit-preview">Click here</a> to exit
                        preview mode.
                    </p>
                </div>
            ) : null}
        </>
    );
};

export default Alert;
