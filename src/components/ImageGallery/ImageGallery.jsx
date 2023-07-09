import React from 'react';
// import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ largeImageURL, webformatURL, id, tags}) => (
        <ImageGalleryItem
          
          key={id}
          tags={tags}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
      ))}
    </ul>
  );
};


export default ImageGallery;
