import { ImageTypes, VideoTypes } from '../Base';
import { Document } from '@contentful/rich-text-types';

export type LifeAtTorchboxPage = {
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
    itemsCollection: any;
    valueCarouselTitle: string;
    valueCarouselDescription: { json: Document };
};
