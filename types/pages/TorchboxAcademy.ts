import { Document } from '@contentful/rich-text-types';
import { ImageTypes } from 'types/Base';

export type TorchboxAcademy = {
    metadataTitle: string;
    metadataDescription: string;
    metadataSocialMediaImage: ImageTypes;
    heroImage: ImageTypes;
    heroSubtitle: string;
    heroDescription: { json: Document };
    quote: string;
    quoteAuthor: string;
    introductionTitle: string;
    introductionContent: { json: Document };
    introductionPhoto: ImageTypes;
    mainSectionTitle: string;
    mainSectionContent: { json: Document };
    academyDaysCollection: {
        items: {
            title: string;
            description: { json: Document };
            applicationLink: string;
        };
    };
    inclusiveSectionTitle: string;
    inclusiveSectionContent: { json: Document };
    inclusiveSectionPhoto: ImageTypes;
    typicalDayTitle: string;
    typicalDayFirstHeading: string;
    typicalDayFirstContent: { json: Document };
    typicalDaySecondHeading: string;
    typicalDaySecondContent: { json: Document };
    applicationProcessTitle: string;
    applicationProcessDescription: { json: Document };
    applicationProcessStepOne: { json: Document };
    applicationProcessStepTwo: { json: Document };
    applicationProcessStepThree: { json: Document };
};
