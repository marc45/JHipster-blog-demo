import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { WishlistDetailComponent } from '../../../../../../main/webapp/app/entities/wishlist/wishlist-detail.component';
import { WishlistService } from '../../../../../../main/webapp/app/entities/wishlist/wishlist.service';
import { Wishlist } from '../../../../../../main/webapp/app/entities/wishlist/wishlist.model';

describe('Component Tests', () => {

    describe('Wishlist Management Detail Component', () => {
        let comp: WishlistDetailComponent;
        let fixture: ComponentFixture<WishlistDetailComponent>;
        let service: WishlistService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [WishlistDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    WishlistService
                ]
            }).overrideComponent(WishlistDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WishlistDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WishlistService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Wishlist(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.wishlist).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
