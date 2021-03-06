import { ImageTypes } from 'types/Base';
import Image from 'components/Image';
import styles from './ClientLogos.module.scss';

type ClientLogosProps = {
    logos: ImageTypes[];
};

export const ClientLogos = ({ logos }: ClientLogosProps) => {
    // Slice used to cap number of logos at 8, but this is also restricted to 8 items in Contentful
    const listOfClientLogos = logos.slice(0, 8).map((logo, index) => (
        <li className={styles.logo} key={index}>
            <Image src={logo.url} alt={logo.description} />
        </li>
    ));

    return <ul className={styles.container}>{listOfClientLogos}</ul>;
};

export default ClientLogos;
