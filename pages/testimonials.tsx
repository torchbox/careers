import type { NextPage } from "next";
import { getAllTestimonials } from "./api/hello";

interface Quotee {
    name: string;
    role: string;
}

interface Testimonial {
    quote: string;
    quotee: {
        [key: string]: Quotee;
    };
}

type TestimonialProps = {
    allTestimonials: Testimonial[];
};

const Testimonials: NextPage<TestimonialProps> = ({ allTestimonials }) => {
    return (
        <div>
            {allTestimonials.map((testimonial, index) => (
                <div key={index}>
                    <blockquote>{testimonial.quote}</blockquote>
                    <p>
                        {testimonial.quotee.name} - {testimonial.quotee.role}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;

export async function getStaticProps({ preview = false }) {
    const allTestimonials = (await getAllTestimonials(preview)) ?? [];
    return {
        props: { preview, allTestimonials },
    };
}
