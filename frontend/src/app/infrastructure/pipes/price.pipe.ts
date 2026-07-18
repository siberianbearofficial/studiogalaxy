import { Pipe, PipeTransform } from '@angular/core';
import { Price } from '../../core/domain/entities/price';

@Pipe({
    name: 'price',
    standalone: true,
})
export class PricePipe implements PipeTransform {
    transform(value: Price | null): string {
        if (!value) {
            return '';
        }

        if (value.pennies > 0) {
            return `${value.rubles}.${value.pennies} р.`;
        }

        return `${value.rubles} р.`;
    }
}
