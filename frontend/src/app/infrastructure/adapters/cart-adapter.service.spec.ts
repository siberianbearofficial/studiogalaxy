import { TestBed } from '@angular/core/testing';

import { CartAdapterService } from './cart-adapter.service';

describe('CartAdapterService', () => {
    let service: CartAdapterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartAdapterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
