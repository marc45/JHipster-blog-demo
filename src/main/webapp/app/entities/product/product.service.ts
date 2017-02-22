import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Product } from './product.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class ProductService {

    private resourceUrl = 'api/products';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(product: Product): Observable<Product> {
        let copy: Product = Object.assign({}, product);
        copy.dateAdded = this.dateUtils
            .convertLocalDateToServer(product.dateAdded);
        copy.dateModified = this.dateUtils
            .convertLocalDateToServer(product.dateModified);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(product: Product): Observable<Product> {
        let copy: Product = Object.assign({}, product);
        copy.dateAdded = this.dateUtils
            .convertLocalDateToServer(product.dateAdded);
        copy.dateModified = this.dateUtils
            .convertLocalDateToServer(product.dateModified);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Product> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.dateAdded = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.dateAdded);
            jsonResponse.dateModified = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.dateModified);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].dateAdded = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].dateAdded);
            jsonResponse[i].dateModified = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].dateModified);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
