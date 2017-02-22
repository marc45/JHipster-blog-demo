import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlogBlogModule } from './blog/blog.module';
import { BlogEntryModule } from './entry/entry.module';
import { BlogTagModule } from './tag/tag.module';
import { BlogAddressModule } from './address/address.module';
import { BlogCategoryModule } from './category/category.module';
import { BlogCustomerModule } from './customer/customer.module';
import { BlogProductModule } from './product/product.module';
import { BlogWishlistModule } from './wishlist/wishlist.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BlogBlogModule,
        BlogEntryModule,
        BlogTagModule,
        BlogAddressModule,
        BlogCategoryModule,
        BlogCustomerModule,
        BlogProductModule,
        BlogWishlistModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntityModule {}
