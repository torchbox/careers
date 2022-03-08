import { Document } from '@contentful/rich-text-types';
import { ImageTypes } from '../Base';

export type Jobs = {
    metadataTitle: string;
    metadataDescription: string;
    metadataSocialMediaImage: ImageTypes;
    firstTitleLine: string;
    secondTitleLine: string;
    subtitle: { json: Document };
    ctaTitle: string;
    ctaDescription: { json: Document };
};
