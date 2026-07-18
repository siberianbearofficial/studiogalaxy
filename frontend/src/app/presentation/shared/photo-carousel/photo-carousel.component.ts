import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { PhotoCarouselImage } from '../../../core/domain/entities/photo-carousel-image';
import { PhotoCarouselService } from '../../../core/interactors/photo-carousel.service';

@Component({
    selector: 'app-photo-carousel',
    standalone: true,
    imports: [AsyncPipe, NgClass],
    templateUrl: './photo-carousel.component.html',
    styleUrl: './photo-carousel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCarouselComponent {
    private readonly photoCarouselService = inject(PhotoCarouselService);

    setSelectedImageId(id: string): void {
        this.photoCarouselService.setSelectedImageId(id);
    }

    nextImage(): void {
        this.photoCarouselService.nextImage();
    }

    previousImage(): void {
        this.photoCarouselService.previousImage();
    }

    protected readonly images$: Observable<PhotoCarouselImage[]> = this.photoCarouselService.images$;
    protected readonly selectedImageId$: Observable<string | null> = this.photoCarouselService.selectedImageId$;
    protected readonly selectedImage$: Observable<PhotoCarouselImage | null> = this.photoCarouselService.selectedImage$;
}
