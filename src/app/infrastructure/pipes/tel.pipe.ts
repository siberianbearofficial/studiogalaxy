import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tel',
    standalone: true,
})
export class TelPipe implements PipeTransform {
    transform(value: string): string {
        const region = value.slice(0, 2);
        const firstTriple = value.slice(2, 5);
        const secondTriple = value.slice(5, 8);
        const firstCouple = value.slice(8, 10);
        const secondCouple = value.slice(10, 12);

        return `${region} (${firstTriple}) ${secondTriple}-${firstCouple}-${secondCouple}`;
    }
}
