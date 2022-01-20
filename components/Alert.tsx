import styles from "styles/Alert.module.scss";

const exitPreview = () => {
    document.location.href = "/api/exit-preview";
};

export const Alert: React.FC<{ preview: boolean }> = ({ preview }) => {
    return (
        <>
            {preview ? (
                <div className={styles.container}>
                    <p className={styles.message}>
                        This is a preview page.{" "}
                        <a className={styles.link} onClick={exitPreview}>
                            Click here
                        </a>{" "}
                        to exit preview mode.
                    </p>
                </div>
            ) : null}
        </>
    );
};

export default Alert;
