import type { NextPage } from "next";
import { Carousel } from "react-responsive-carousel";
import Testimonial from "components/Testimonial/Testimonial";
import styles from "styles/TestimonialCarousel.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

interface Testimonial {
    quote: string;
    attribution?: string;
    role?: string;
}

type TestimonialCarouselProps = {
    testimonials: Testimonial[];
};

const TestimonialCarousel: NextPage<TestimonialCarouselProps> = ({
    testimonials,
}) => {
    return (
        <div className={styles.container}>
            <Carousel
                showArrows={false}
                showStatus={false}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    if (isSelected) {
                        return (
                            <button
                                className={styles.dot}
                                aria-label={`Selected: ${label} ${index + 1}`}
                                disabled
                            />
                        );
                    }
                    return (
                        <button
                            className={styles.dot}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-label={`${label} ${index + 1}`}
                        />
                    );
                }}
            >
                {testimonials.map((testimonial, index) => (
                    <Testimonial
                        quote={testimonial.quote}
                        attribution={testimonial.attribution}
                        role={testimonial.role}
                        key={index}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default TestimonialCarousel;
