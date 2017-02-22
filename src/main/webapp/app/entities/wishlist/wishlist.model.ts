import { Product } from '../product';
import { Customer } from '../customer';
export class Wishlist {
    constructor(
        public id?: number,
        public title?: string,
        public restricted?: boolean,
        public product?: Product,
        public customer?: Customer,
    ) { }
}
