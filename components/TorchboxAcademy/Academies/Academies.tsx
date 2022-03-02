import RichText from 'components/RichText';
import WomanLeanIn from 'components/SVG/WomanLeanIn';
import type { Academy } from 'types/Base';
import styles from './Academies.module.scss';

type AcademyProps = {
    academy: Academy;
};

const Academy = ({ academy }: AcademyProps) => (
    <div className={styles.academyContainer}>
        <h2 className={styles.academyTitle}>{academy.title}</h2>
        <p className={styles.academySubtitle}>{academy.subtitle}</p>
        <div className={styles.academyDescription}>
            <RichText theme="INDIGO" content={academy.description} />
        </div>
        <a
            className="underline-link underline-link--indigo underline-link--extrabold"
            href={academy.applicationLink}
        >
            Apply now
        </a>
    </div>
);

type AcademiesProps = {
    academies: Academy[];
};

export const Academies = ({ academies }: AcademiesProps) => {
    const academyComponents = academies.map((academy, index) => (
        <Academy academy={academy} key={index} />
    ));

    return (
        <div className={styles.container}>
            {academyComponents}
            <WomanLeanIn className={styles.womanLeanIn} />
        </div>
    );
};

export default Academies;
