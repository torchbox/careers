import Image from "next/image";
import styles from "styles/ImageGrid.module.scss";

const ImageGrid = () => {
    return (
        <div className={styles.imageGrid}>
            <Image
                src="https://source.unsplash.com/450x450/?work"
                alt=""
                width="450"
                height="450"
                priority
            />
            <Image
                src="https://source.unsplash.com/450x450/?work"
                alt=""
                width="450"
                height="450"
                priority
            />
            <Image
                src="https://source.unsplash.com/450x450/?work"
                alt=""
                width="450"
                height="450"
                priority
            />
        </div>
    );
};

export default ImageGrid;
