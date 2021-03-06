import { Keyboard, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useScreen } from 'hooks/useScreen';
import React, { useRef } from 'react';
import { CarouselArrowButton } from 'components/Button/Button';
import { ImageTypes } from 'types/Base';
import Image from 'components/Image';
import ArrowLoopLeft from 'components/SVG/ArrowLoop/ArrowLoopLeft';
import styles from './ValuesCarousel.module.scss';
import 'swiper/css';

type CarouselIntroductionProps = {
    title: string;
    children: React.ReactNode;
};

const CarouselIntroduction = ({
    title,
    children,
}: CarouselIntroductionProps) => (
    <div className={styles.container}>
        <div className={styles.textContainer}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.description}>{children}</div>
        </div>
        <ArrowLoopLeft className={styles.image} />
    </div>
);

type Value = {
    valueImage: ImageTypes;
};

type ValuesCarouselProps = {
    title: string;
    values: Value[];
    children: React.ReactNode;
};

const ValuesCarousel = ({ title, values, children }: ValuesCarouselProps) => {
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const previousButtonRef = useRef<HTMLButtonElement>(null);

    const slides = values.map((value: Value, index: number) => (
        <SwiperSlide className={styles.slide} key={index}>
            <Image
                className={styles.slideImage}
                src={value.valueImage.url}
                alt={value.valueImage.description}
            />
        </SwiperSlide>
    ));

    const screen = useScreen();

    let slidesPerView: number | 'auto' = 'auto';

    if (screen.includes('medium')) slidesPerView = 2.2;
    if (screen.includes('large')) slidesPerView = 2.8;
    if (screen.includes('site-width')) slidesPerView = 3;

    return (
        <div className={styles.pageContainer}>
            <CarouselIntroduction title={title}>
                {children}
            </CarouselIntroduction>
            <section
                aria-label="Decorative carousel element containing images of Torchbox's
                values"
            >
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
            </section>
        </div>
    );
};

export default ValuesCarousel;
