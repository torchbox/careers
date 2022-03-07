import { Document } from '@contentful/rich-text-types';
import { ImageTypes } from '.././Base';

export type TorchboxAcademy = {
    metadataTitle: string;
    metadataDescription: string;
    metadataSocialMediaImage: ImageTypes;
    heroImage: ImageTypes;
    heroSubtitle: { json: Document };
    reasonsToJoinTitle: string;
    reasonsToJoinContent: { json: Document };
    itemsCollection: any;
    meetOurGraduatesTitle: string;
    meetOurGraduatesIntroduction: { json: Document };
    applicationsOpenTitleIntro: string;
    applicationsOpenTitleEmphasis: string;
    applicationsOpenDescription: { json: Document };
    applicationsOpenImage: ImageTypes;
};
