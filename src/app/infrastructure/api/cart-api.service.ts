import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from '../models/order-model';
import { Observable } from 'rxjs';
import { PostOrdersResponseModel } from '../models/response-model';

const API_URL = 'https://api.studiogalaxy.ru/api/v2/orders';

@Injectable({
    providedIn: 'root',
})
export class CartApiService {
    private readonly http: HttpClient = inject(HttpClient);

    postOrders(order: OrderModel): Observable<PostOrdersResponseModel> {
        return this.http.post<PostOrdersResponseModel>(API_URL, order);
    }
}
