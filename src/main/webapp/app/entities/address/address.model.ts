import { Customer } from '../customer';
export class Address {
    constructor(
        public id?: number,
        public address1?: string,
        public address2?: string,
        public city?: string,
        public postcode?: string,
        public country?: string,
        public customer?: Customer,
    ) { }
}
