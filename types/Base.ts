import { Document } from '@contentful/rich-text-types';

export type Theme = 'LIGHT' | 'DARK' | 'INDIGO';

// Light theme used on the EOT and Jobs page
// Indigo theme used on the landing page
// Dark theme used on the life at torchbox page

export type NavLink = {
    title: string;
    url: string;
    isCareersSiteInternalLink?: boolean;
};

export type ImageTypes = {
    description: string;
    url: string;
    width: number;
    height: number;
};

export type VideoTypes = {
    description: string;
    url: string;
};

export type Person = {
    name: string;
    role: string;
    image: ImageTypes;
};

export type TestimonialTypes = {
    quote: string;
    quotee: Person;
};

export type BlogPost = {
    title: string;
    date: string;
    slug: string;
    author: Person;
};

export type AcademyTypes = {
    title: string;
    subtitle: string;
    description: { json: Document };
    applicationLink: string;
};

export type CharacterType = 'MICROPHONE' | 'COFFEE';
