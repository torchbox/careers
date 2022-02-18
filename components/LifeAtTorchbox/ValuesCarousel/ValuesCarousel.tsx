import { CarouselArrowButton } from 'components/Button/Button';
import { useScreen } from 'hooks/useScreen';
import React, { useRef } from 'react';
import { Keyboard, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageTypes } from 'types/Base';

import styles from './ValuesCarousel.module.scss';

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
        <div className={styles.image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="images/arrow-loop-left.svg" alt="" />
        </div>
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
        <SwiperSlide className={styles.carouselSlide} key={index}>
            {/* Nice to have - refactor to include Next/Image, a lot of CSS overrides required here! */}
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
                className={styles.slideImage}
                width={value.valueImage.width}
                height={value.valueImage.height}
                src={value.valueImage.url}
                alt={value.valueImage.description}
            />
        </SwiperSlide>
    ));

    const screen = useScreen();

    let slidesPerView: number | 'auto' = 'auto';

    if (screen.includes('medium')) slidesPerView = 2;
    if (screen.includes('large')) slidesPerView = 3.45;

    return (
        <>
            <CarouselIntroduction title={title}>
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
                            direction="LEFT"
                            className={styles.leftButton}
                        />
                        <CarouselArrowButton
                            carouselButtonRef={nextButtonRef}
                            direction="RIGHT"
                        />
                    </div>
                </Swiper>
            </div>
        </>
    );
};

export default ValuesCarousel;
