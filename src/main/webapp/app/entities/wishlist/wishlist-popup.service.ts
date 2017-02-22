import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';
@Injectable()
export class WishlistPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private wishlistService: WishlistService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.wishlistService.find(id).subscribe(wishlist => {
                this.wishlistModalRef(component, wishlist);
            });
        } else {
            return this.wishlistModalRef(component, new Wishlist());
        }
    }

    wishlistModalRef(component: Component, wishlist: Wishlist): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.wishlist = wishlist;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
