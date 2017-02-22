import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';

@Component({
    selector: 'jhi-wishlist-detail',
    templateUrl: './wishlist-detail.component.html'
})
export class WishlistDetailComponent implements OnInit, OnDestroy {

    wishlist: Wishlist;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private wishlistService: WishlistService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['wishlist']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.wishlistService.find(id).subscribe(wishlist => {
            this.wishlist = wishlist;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
