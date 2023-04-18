import { Document } from '@contentful/rich-text-types';
import RichText from 'components/RichText';
import MicrophonePerson from 'components/SVG/MicrophonePerson';
import CoffeePerson from 'components/SVG/CoffeePerson';
import PostItNotePerson from 'components/SVG/PostItNotesPerson';
import Button from 'components/Button';
import { CharacterType } from 'types/Base';
import styles from './AcademyDayCards.module.scss';

type AcademyDay = {
    title: string;
    content: { json: Document };
    link: string;
    character: CharacterType;
};

const Card = ({ title, content, link, character }: AcademyDay) => (
    <div className={styles.card}>
        <div className={styles.icon}>
            {character === 'MICROPHONE' ? (
                <MicrophonePerson
                    className={[styles.person, styles.microphonePerson].join(
                        ' ',
                    )}
                />
            ) : null}
            {character === 'COFFEE' ? (
                <CoffeePerson className={styles.person} />
            ) : null}
            {character === 'POST_IT_NOTES' ? (
                <PostItNotePerson className={styles.person} />
            ) : null}
        </div>
        <h3 className={styles.title}>{title}</h3>

        <RichText theme="INDIGO" content={content} className={styles.content} />

        {link !== null ? (
            <Button url={link} theme="WHITE" className={styles.button} internal>
                Apply now
            </Button>
        ) : (
            <div className={styles.disabledButton}>Applications closed</div>
        )}
    </div>
);

type AcademyDayCardsProps = {
    academyDays: AcademyDay[];
};

export const AcademyDayCards = ({ academyDays }: AcademyDayCardsProps) => {
    const cards = academyDays.map((card, index) => (
        <Card
            title={card.title}
            content={card.content}
            link={card.link}
            character={card.character}
            key={`academy-card-${index}`}
        />
    ));

    return <div className={styles.container}>{cards}</div>;
};

export default AcademyDayCards;
