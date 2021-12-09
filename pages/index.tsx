import type { NextPage } from "next";
import TestimonialCarousel from "components/TestimonialCarousel/TestimonialCarousel";
import styles from "styles/Home.module.scss";

import { testimonialsData } from "data/testimonials";

const Home: NextPage = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Why Torchbox</h1>
            </div>
            <TestimonialCarousel testimonials={testimonialsData} />
        </>
    );
};

export default Home;
