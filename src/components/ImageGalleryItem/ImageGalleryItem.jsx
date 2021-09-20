import {
  CurrentImageGalleryItem,
  ImageGalleryItemImage,
} from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ id, src, alt, onClick }) {
  return (
    <CurrentImageGalleryItem>
      <ImageGalleryItemImage key={id} src={src} alt={alt} onClick={onClick} />
    </CurrentImageGalleryItem>
  );
}
