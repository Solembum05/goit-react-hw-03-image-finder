import React from 'react';
// import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeEscape);
    document.body.classList.toggle('overflow');
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeEscape);
    document.body.classList.toggle('overflow');
  }

  closeEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  closeOverlay = evt => {
    if (evt.target.nodeName === 'DIV') {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.data;
    return (
      <div className={css.Overlay} onClick={this.closeOverlay}>
        <div className={css.Modal} >
          <img className={css.largeImg} src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;