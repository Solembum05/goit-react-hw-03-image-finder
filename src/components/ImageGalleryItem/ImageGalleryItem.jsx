import PropTypes from 'prop-types';
import React from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal'


class ImageGalleryItem extends React.Component {
  state = {
    isOpen: false,
    data: {},
  };

  onOpenModal = () => {
    const { tags, largeImageURL } = this.props;
    const data = { tags, largeImageURL };
    this.setState({ isOpen: true, data });
  };

  onCloseModal = () => {
    this.setState({isOpen: false});
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.setState(prevState => ({ isOpen: true }));
    }
  }
  render() {
    const {webformatURL, tags} = this.props
    return (
      <div>
        <li
          className={css.ImageGalleryItem}
          onClick={() => {
            this.onOpenModal();
          }}
        >
          <img
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
          />
          {this.state.isOpen === true && (
            <Modal
              data={this.state.data}
              onCloseModal={this.onCloseModal} />
            )}
        </li>
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
