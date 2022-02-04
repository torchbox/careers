import { ImageTypes } from 'types/Base';
import styles from './ClientLogos.module.scss';
import Image from '../Image';

type ClientLogosProps = {
    logos: ImageTypes[];
};

export const ClientLogos = ({ logos }: ClientLogosProps) => {
    // Slice used to cap number of logos at 8, but this is also restricted to 8 items in Contentful
    const listOfClientLogos = logos.slice(0, 8).map((logo) => (
        <li className={styles.logo} key={logo.description}>
            <Image
                width={logo.width}
                height={logo.height}
                src={logo.url}
                alt={logo.description}
            />
        </li>
    ));

    return <ul className={styles.container}>{listOfClientLogos}</ul>;
};

export default ClientLogos;
