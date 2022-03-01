import { Document } from '@contentful/rich-text-types';
import { ImageTypes } from '../Base';

export type Job = {
    metadataTitle: string;
    metadataDescription: string;
    metadataSocialMediaImage: ImageTypes;
    hiringPolicyTitle: string;
    hiringPolicyDescription: { json: Document };
    itemsCollection: any;
};
