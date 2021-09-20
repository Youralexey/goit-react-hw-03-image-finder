import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { CurrentImageGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, onSelect }) {
    return (
        <CurrentImageGallery>
            {images && images.map(image => {
                const { id, webformatURL, tags} = image;
                return < ImageGalleryItem key={id} src={webformatURL} alt={tags} onClick={() => onSelect(image)} />
            })}
            
        </CurrentImageGallery>
    );
};


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    })),
    onSelect: PropTypes.func.isRequired,
    
}