import { Document } from '@contentful/rich-text-types';
import RichText from 'components/RichText';
import FruitBowl from 'components/SVG/FruitBowl';
import { PeopleChatting } from 'components/SVG/PeopleChatting/PeopleChatting';
import styles from './TypicalDay.module.scss';

type TypicalDayProps = {
    title: string;
    firstHeading: string;
    firstContent: { json: Document };
    secondHeading: string;
    secondContent: { json: Document };
};

export const TypicalDay = ({
    title,
    firstHeading,
    firstContent,
    secondHeading,
    secondContent,
}: TypicalDayProps) => (
    <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.dayContainer}>
            <div className={styles.textContainer}>
                <h3 className={styles.subheading}>{firstHeading}</h3>
                <RichText theme="LIGHT" content={firstContent} />
            </div>
            <FruitBowl className={styles.fruitBowl} />
        </div>
        <div className={styles.dayContainer}>
            <div className={styles.textContainer}>
                <h3 className={styles.subheading}>{secondHeading}</h3>
                <RichText theme="LIGHT" content={secondContent} />
            </div>
            <PeopleChatting className={styles.peopleChatting} />
        </div>
    </div>
);

export default TypicalDay;
