import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { WishlistComponent } from './wishlist.component';
import { WishlistDetailComponent } from './wishlist-detail.component';
import { WishlistPopupComponent } from './wishlist-dialog.component';
import { WishlistDeletePopupComponent } from './wishlist-delete-dialog.component';

import { Principal } from '../../shared';


export const wishlistRoute: Routes = [
  {
    path: 'wishlist',
    component: WishlistComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.wishlist.home.title'
    }
  }, {
    path: 'wishlist/:id',
    component: WishlistDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.wishlist.home.title'
    }
  }
];

export const wishlistPopupRoute: Routes = [
  {
    path: 'wishlist-new',
    component: WishlistPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.wishlist.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'wishlist/:id/edit',
    component: WishlistPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.wishlist.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'wishlist/:id/delete',
    component: WishlistDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.wishlist.home.title'
    },
    outlet: 'popup'
  }
];
