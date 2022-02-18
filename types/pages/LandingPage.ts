import { ImageTypes } from '../Base';
import { Document } from '@contentful/rich-text-types';

export type LandingPage = {
    metadataTitle: string;
    metadataDescription: string;
    metadataSocialMediaImage: ImageTypes;
    heroImage: ImageTypes;
    heroTagline: { json: Document };
    missionTitle: string;
    missionDescription: { json: Document };
    itemsCollection: any;
    workForYouDescription: { json: Document };
    workForYouImage: ImageTypes;
    lifeAsATorchboxer: { json: Document };
    ctaTitle: string;
    ctaDescription: { json: Document };
};
