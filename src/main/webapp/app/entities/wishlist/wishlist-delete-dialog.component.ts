import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Wishlist } from './wishlist.model';
import { WishlistPopupService } from './wishlist-popup.service';
import { WishlistService } from './wishlist.service';

@Component({
    selector: 'jhi-wishlist-delete-dialog',
    templateUrl: './wishlist-delete-dialog.component.html'
})
export class WishlistDeleteDialogComponent {

    wishlist: Wishlist;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private wishlistService: WishlistService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['wishlist']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.wishlistService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'wishlistListModification',
                content: 'Deleted an wishlist'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-wishlist-delete-popup',
    template: ''
})
export class WishlistDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private wishlistPopupService: WishlistPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.wishlistPopupService
                .open(WishlistDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
