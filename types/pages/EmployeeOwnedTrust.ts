import { Document } from '@contentful/rich-text-types';
import { ImageTypes } from 'types/Base';

export type EmployeeOwnedTrustPage = {
    metadataTitle: string;
    metadataDescription: string;
    metadataSocialMediaImage: ImageTypes;
    subtitle: string;
    content: { json: Document; links: Document };
    itemsCollection: any;
};
