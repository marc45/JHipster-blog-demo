import { Wishlist } from '../wishlist';
import { Category } from '../category';
export class Product {
    constructor(
        public id?: number,
        public title?: string,
        public keywords?: string,
        public description?: string,
        public rating?: number,
        public dateAdded?: any,
        public dateModified?: any,
        public wishlist?: Wishlist,
        public category?: Category,
    ) { }
}
