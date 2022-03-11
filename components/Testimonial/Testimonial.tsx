import type { TestimonialTypes } from 'types/Base';
import Image from 'components/Image';
import styles from './Testimonial.module.scss';

type TestimonialProps = {
    testimonial: TestimonialTypes;
};

export const Testimonial = ({ testimonial }: TestimonialProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    className={styles.image}
                    layout="fill"
                    src={testimonial.quotee.image.url}
                    alt={testimonial.quotee.image.description}
                />
            </div>
            <div className={styles.quoteContainer}>
                <p className={styles.quote}>{testimonial.quote}</p>
                <p className={styles.quotee}>
                    {testimonial.quotee.name} - {testimonial.quotee.role}
                </p>
            </div>
        </div>
    );
};

export default Testimonial;
