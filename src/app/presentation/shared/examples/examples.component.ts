import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Example } from '../../../core/domain/entities/example';
import { EXAMPLE_LIST } from '../../../infrastructure/constants/examples-constants';

@Component({
    selector: 'app-examples',
    standalone: true,
    imports: [],
    templateUrl: './examples.component.html',
    styleUrl: './examples.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesComponent {
    protected readonly EXAMPLE_LIST: Example[] = EXAMPLE_LIST;
}
