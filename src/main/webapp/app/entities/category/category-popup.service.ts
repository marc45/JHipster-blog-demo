import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Category } from './category.model';
import { CategoryService } from './category.service';
@Injectable()
export class CategoryPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private categoryService: CategoryService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.categoryService.find(id).subscribe(category => {
                if (category.dateAdded) {
                    category.dateAdded = {
                        year: category.dateAdded.getFullYear(),
                        month: category.dateAdded.getMonth() + 1,
                        day: category.dateAdded.getDate()
                    };
                }
                if (category.dateModified) {
                    category.dateModified = {
                        year: category.dateModified.getFullYear(),
                        month: category.dateModified.getMonth() + 1,
                        day: category.dateModified.getDate()
                    };
                }
                this.categoryModalRef(component, category);
            });
        } else {
            return this.categoryModalRef(component, new Category());
        }
    }

    categoryModalRef(component: Component, category: Category): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.category = category;
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
