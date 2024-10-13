import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdditionalService } from '../../../core/domain/entities/additional-service';
import { ADDITIONAL_SERVICE_LIST } from '../../../infrastructure/constants/additional-services-constants';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
    protected readonly ADDITIONAL_SERVICE_LIST: AdditionalService[] = ADDITIONAL_SERVICE_LIST;
}
