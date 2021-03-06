import { LocationIcon } from 'components/Icons/LocationIcon';
import RichText from 'components/RichText';
import styles from './AtWorkAtPlay.module.scss';

type AtWorkAtPlayProps = {
    atWorkTitle: string;
    atPlayTitle: string;
    atWorkDescription: any;
    atPlayDescription: any;
    locations: any;
};

export const AtWorkAtPlay = ({
    atWorkTitle,
    atPlayTitle,
    atWorkDescription,
    atPlayDescription,
    locations,
}: AtWorkAtPlayProps) => {
    const workLocations = locations.map((location: any) => (
        <li className={styles.officeLocation} key={location.locationName}>
            <LocationIcon
                width={40}
                height={40}
                className={styles.locationIcon}
            />{' '}
            {location.locationName}
        </li>
    ));
    return (
        <div className={styles.container}>
            <div className={styles.atWork}>
                <h2 className={styles.title}>{atWorkTitle}</h2>
                <RichText theme="DARK" content={atWorkDescription} />
                <ul className={styles.officeLocationList}>{workLocations}</ul>
            </div>
            <div className={styles.atPlay}>
                <h2 className={styles.title}>{atPlayTitle}</h2>
                <RichText theme="DARK" content={atPlayDescription} />
            </div>
        </div>
    );
};

export default AtWorkAtPlay;
