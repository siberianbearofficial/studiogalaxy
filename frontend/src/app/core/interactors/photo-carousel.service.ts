import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, shareReplay, tap } from 'rxjs';
import { PhotoCarouselImage } from '../domain/entities/photo-carousel-image';
import { PHOTO_CAROUSEL_IMAGE_LIST } from '../../infrastructure/constants/photo-carousel-constants';
import { getImageById } from '../../infrastructure/helpers/photo-carousel-helpers';

@Injectable({
    providedIn: 'root',
})
export class PhotoCarouselService {
    private readonly images$$: BehaviorSubject<PhotoCarouselImage[]> = new BehaviorSubject<PhotoCarouselImage[]>(
        PHOTO_CAROUSEL_IMAGE_LIST,
    );
    readonly images$: Observable<PhotoCarouselImage[]> = this.images$$.pipe(
        tap((images) => {
            if (!this.selectedImageId$$.value && images[0]) {
                this.selectedImageId$$.next(images[0].id);
            }
        }),
        shareReplay(1),
    );

    private readonly selectedImageId$$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    readonly selectedImageId$: Observable<string | null> = this.selectedImageId$$.pipe(
        distinctUntilChanged(),
        shareReplay(1),
    );
    readonly selectedImage$: Observable<PhotoCarouselImage | null> = this.selectedImageId$.pipe(
        map((id) => (id ? getImageById(this.images$$.value, id) : null)),
    );

    setSelectedImageId(id: string): void {
        this.selectedImageId$$.next(id);
    }

    nextImage(): void {
        const images = this.getImages();
        const selectedImageIndex = this.getSelectedImageIndex();
        const nextImageIndex = selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
        const nextImage = images[nextImageIndex] || null;

        if (nextImage) {
            this.setSelectedImageId(nextImage.id);
        }
    }

    previousImage(): void {
        const images = this.getImages();
        const selectedImageIndex = this.getSelectedImageIndex();
        const previousImageIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
        const previousImage = images[previousImageIndex] || null;

        if (previousImage) {
            this.setSelectedImageId(previousImage.id);
        }
    }

    private getSelectedImageIndex(): number {
        const images = this.getImages();
        const selectedImageId = this.selectedImageId$$.value;
        const selectedImage = selectedImageId ? getImageById(images, selectedImageId) : null;

        return selectedImage ? images.indexOf(selectedImage) : -1;
    }

    private getImages(): PhotoCarouselImage[] {
        return this.images$$.value;
    }
}
