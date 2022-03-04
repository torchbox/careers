//import { CarouselArrowButton } from 'components/Button/Button';
import { useScreen } from 'hooks/useScreen';
import React, { useRef } from 'react';
import { Keyboard, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TestimonialTypes } from 'types/Base';
import Image from 'components/Image';
import { CarouselArrowButton } from 'components/Button/Button';
import styles from './GraduateCarousel.module.scss';
import 'swiper/css';

type CarouselIntroductionProps = {
    titleFirstLine: string;
    titleSecondLine: string;
    children: React.ReactNode;
};

const CarouselIntroduction = ({
    titleFirstLine,
    titleSecondLine,
    children,
}: CarouselIntroductionProps) => (
    <div className={styles.container}>
        <div className={styles.textContainer}>
            <h2 className={styles.title}>
                {titleFirstLine}
                <span className={styles.emphasis}>{titleSecondLine}</span>
            </h2>
            <div className={styles.description}>{children}</div>
        </div>
        <div className={styles.image}>
            {/* Todo: Refactor to use SVG component (see polishing ticket) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="images/arrow-loop-left.svg" alt="" />
        </div>
    </div>
);

type GraduateCarouselProps = {
    titleFirstLine: string;
    titleSecondLine: string;
    graduates: TestimonialTypes[];
    children: React.ReactNode;
};

const GraduateCarousel = ({
    titleFirstLine,
    titleSecondLine,
    graduates,
    children,
}: GraduateCarouselProps) => {
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const previousButtonRef = useRef<HTMLButtonElement>(null);

    const slides = graduates.map(
        (testimonial: TestimonialTypes, index: number) => (
            <SwiperSlide className={styles.slide} key={index}>
                <Image
                    className={styles.slideImage}
                    width={testimonial.quotee.image.width}
                    height={testimonial.quotee.image.height}
                    src={testimonial.quotee.image.url}
                    alt={testimonial.quotee.image.description}
                />
                <div className={styles.slideContent}>
                    <h3 className={styles.slideName}>
                        {testimonial.quotee.name.split(' ').shift()}
                    </h3>
                    <p className={styles.slideQuote}>{testimonial.quote}</p>
                </div>
            </SwiperSlide>
        ),
    );

    const screen = useScreen();

    let slidesPerView: number | 'auto' = 'auto';

    if (screen.includes('medium')) slidesPerView = 2.2;
    if (screen.includes('large')) slidesPerView = 2.8;
    if (screen.includes('site-width')) slidesPerView = 3;

    return (
        <div className={styles.pageContainer}>
            <CarouselIntroduction
                titleFirstLine={titleFirstLine}
                titleSecondLine={titleSecondLine}
            >
                {children}
            </CarouselIntroduction>
            <div className={styles.carouselContainer}>
                <Swiper
                    className={styles.carousel}
                    spaceBetween={10}
                    slidesPerView={slidesPerView}
                    modules={[Keyboard, Navigation]}
                    keyboard
                    onBeforeInit={(swiper) => {
                        if (
                            swiper.params.navigation &&
                            typeof swiper.params.navigation !== 'boolean'
                        ) {
                            const { navigation } = swiper.params;
                            navigation.nextEl = nextButtonRef.current;
                            navigation.prevEl = previousButtonRef.current;
                        }
                    }}
                >
                    {slides}
                    <div className={styles.buttonNavigation}>
                        <CarouselArrowButton
                            carouselButtonRef={previousButtonRef}
                            className={styles.leftButton}
                            leftFacing
                        />
                        <CarouselArrowButton
                            carouselButtonRef={nextButtonRef}
                        />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default GraduateCarousel;
