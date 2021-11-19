import type { NextPage } from "next";
import Image from "next/image";
import styles from "styles/ImageGrid.module.scss";

interface Image {
    url: string;
    alt: string;
}

type ImageGridProps = {
    images: Image[];
};

const ImageGrid: NextPage<ImageGridProps> = ({ images }) => {
    return (
        <div className={styles.imageGrid}>
            {images.map((image, index) => {
                return (
                    <Image
                        key={index}
                        src={image.url}
                        alt={image.alt}
                        width="450"
                        height="450"
                        priority
                    />
                );
            })}
        </div>
    );
};

export default ImageGrid;
