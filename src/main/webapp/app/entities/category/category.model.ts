
const enum CategoryStatus {
    'AVAILABLE',
    'RESTRICTED',
    'DISABLED'

};
import { Product } from '../product';
export class Category {
    constructor(
        public id?: number,
        public linky?: string,
        public description?: string,
        public sortOrder?: number,
        public dateAdded?: any,
        public dateModified?: any,
        public status?: CategoryStatus,
        public parent?: Category,
        public product?: Product,
    ) { }
}
