import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdditionalService } from '../../../core/domain/entities/additional-service';
import { ADDITIONAL_SERVICE_LIST } from '../../../infrastructure/constants/additional-services-constants';
import { Equipment } from '../../../core/domain/entities/equipment';
import { EQUIPMENT_LIST } from '../../../infrastructure/constants/equipment-constants';
import { Certificate } from '../../../core/domain/entities/certificate';
import { CERTIFICATE_LIST } from '../../../infrastructure/constants/certificate-constants';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
    contacts = {
        tel: '+7 995 117-76-12',
        email: 'support@studiogalaxy.ru',
    };

    protected readonly ADDITIONAL_SERVICE_LIST: AdditionalService[] = ADDITIONAL_SERVICE_LIST;
    protected readonly EQUIPMENT_LIST: Equipment[] = EQUIPMENT_LIST;
    protected readonly CERTIFICATE_LIST: Certificate[] = CERTIFICATE_LIST;
}
