import { PhotoCarouselImage } from '../../core/domain/entities/photo-carousel-image';

export const getImageById = (images: PhotoCarouselImage[], id: string): PhotoCarouselImage | null =>
    images.find((image) => image.id === id) || null;
