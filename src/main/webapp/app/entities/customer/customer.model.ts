import { Address } from '../address';
import { Wishlist } from '../wishlist';
export class Customer {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public telephone?: string,
        public address?: Address,
        public whislist?: Wishlist,
    ) { }
}
