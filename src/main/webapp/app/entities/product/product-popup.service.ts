import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { ProductService } from './product.service';
@Injectable()
export class ProductPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private productService: ProductService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.productService.find(id).subscribe(product => {
                if (product.dateAdded) {
                    product.dateAdded = {
                        year: product.dateAdded.getFullYear(),
                        month: product.dateAdded.getMonth() + 1,
                        day: product.dateAdded.getDate()
                    };
                }
                if (product.dateModified) {
                    product.dateModified = {
                        year: product.dateModified.getFullYear(),
                        month: product.dateModified.getMonth() + 1,
                        day: product.dateModified.getDate()
                    };
                }
                this.productModalRef(component, product);
            });
        } else {
            return this.productModalRef(component, new Product());
        }
    }

    productModalRef(component: Component, product: Product): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.product = product;
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
