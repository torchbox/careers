import { Document } from '@contentful/rich-text-types';
import { ImageTypes } from 'types/Base';

export type BeingAtTorchbox = {
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
