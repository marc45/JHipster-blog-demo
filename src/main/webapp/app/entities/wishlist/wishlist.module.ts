import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';

import {
    WishlistService,
    WishlistPopupService,
    WishlistComponent,
    WishlistDetailComponent,
    WishlistDialogComponent,
    WishlistPopupComponent,
    WishlistDeletePopupComponent,
    WishlistDeleteDialogComponent,
    wishlistRoute,
    wishlistPopupRoute,
} from './';

let ENTITY_STATES = [
    ...wishlistRoute,
    ...wishlistPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WishlistComponent,
        WishlistDetailComponent,
        WishlistDialogComponent,
        WishlistDeleteDialogComponent,
        WishlistPopupComponent,
        WishlistDeletePopupComponent,
    ],
    entryComponents: [
        WishlistComponent,
        WishlistDialogComponent,
        WishlistPopupComponent,
        WishlistDeleteDialogComponent,
        WishlistDeletePopupComponent,
    ],
    providers: [
        WishlistService,
        WishlistPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogWishlistModule {}
