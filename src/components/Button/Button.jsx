import React from 'react';
// import PropTypes from 'prop-types';
import css from './Button.module.css';


const LoadMoreButton = ({loadMore}) => { 
  return (
    <button type = 'button' className={css.Button} onClick={loadMore}>Load More</button>
  )
}

export default LoadMoreButton;