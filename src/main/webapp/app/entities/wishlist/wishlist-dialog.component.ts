import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Wishlist } from './wishlist.model';
import { WishlistPopupService } from './wishlist-popup.service';
import { WishlistService } from './wishlist.service';
import { Product, ProductService } from '../product';
import { Customer, CustomerService } from '../customer';
@Component({
    selector: 'jhi-wishlist-dialog',
    templateUrl: './wishlist-dialog.component.html'
})
export class WishlistDialogComponent implements OnInit {

    wishlist: Wishlist;
    authorities: any[];
    isSaving: boolean;

    products: Product[];

    customers: Customer[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private wishlistService: WishlistService,
        private productService: ProductService,
        private customerService: CustomerService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['wishlist']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.productService.query().subscribe(
            (res: Response) => { this.products = res.json(); }, (res: Response) => this.onError(res.json()));
        this.customerService.query().subscribe(
            (res: Response) => { this.customers = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.wishlist.id !== undefined) {
            this.wishlistService.update(this.wishlist)
                .subscribe((res: Wishlist) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.wishlistService.create(this.wishlist)
                .subscribe((res: Wishlist) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Wishlist) {
        this.eventManager.broadcast({ name: 'wishlistListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-wishlist-popup',
    template: ''
})
export class WishlistPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private wishlistPopupService: WishlistPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.wishlistPopupService
                    .open(WishlistDialogComponent, params['id']);
            } else {
                this.modalRef = this.wishlistPopupService
                    .open(WishlistDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
