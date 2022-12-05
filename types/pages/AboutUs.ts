import { Document } from '@contentful/rich-text-types';
import { ImageTypes, VideoTypes } from 'types/Base';

export type AboutUsPage = {
    metadataTitle: string;
    metadataDescription: string;
    metadataSocialMediaImage: ImageTypes;
    heroImage: ImageTypes;
    heroVideo: VideoTypes;
    heroSubtitle: string;
    atWorkTitle: string;
    atPlayTitle: string;
    atWorkDescription: { json: Document };
    atPlayDescription: { json: Document };
    workLocations: any;
    heroDescription: { json: Document };
    mainContentTitleFirstLine: string;
    mainContentTitleSecondLine: string;
    mainContentTitleThirdLine: string;
    mainContent: any;
    itemsCollection: any;
    valueCarouselTitle: string;
    valueCarouselIntroduction: { json: Document };
    valuesDescription: { json: Document };
};
