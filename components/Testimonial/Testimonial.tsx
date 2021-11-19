import type { NextPage } from "next";
import styles from "styles/Testimonial.module.scss";

type TestimonialProps = {
    quote: string;
    attribution?: string;
    role?: string;
};

const Testimonial: NextPage<TestimonialProps> = ({
    quote,
    attribution,
    role,
}) => {
    return (
        <blockquote className={styles.testimonial}>
            <svg
                className={styles.testimonialIcon}
                viewBox="0 0 222.5 170.6"
                aria-hidden="true"
            >
                <path
                    className="quote_svg__st0"
                    d="M92.182 143.122L174.782.058l47.717 27.55-82.6 143.064zM.03 132.42l55.4-95.953 38.363 22.15-55.4 95.953z"
                ></path>
            </svg>
            <div>
                <p className={styles.testimonialText}>{quote}</p>
                <cite className={styles.testimonialCite}>
                    {attribution ? (
                        <span className={styles.testimonialAttribution}>
                            {attribution}
                        </span>
                    ) : null}

                    {role ? (
                        <span className={styles.testimonialRole}>{role}</span>
                    ) : null}
                </cite>
            </div>
        </blockquote>
    );
};

export default Testimonial;
