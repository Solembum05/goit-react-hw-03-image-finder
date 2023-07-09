import React from 'react';
  import { toast } from 'react-toastify';
import css from './Searchbar.module.css'


export default class Searchbar extends React.Component {
  state = {
    search: '',
  };

  handleValue = event => {
    this.setState(prevState => ({
      search: event.target.value,
    }));
  };

  handleSabmit = event => {
    event.preventDefault();
    if (this.state.search.trim() === '') {
      toast.warn('Please enter a request!', {
        autoClose: 1000,
        hideProgressBar: true,
        theme: 'colored',
      });
      return
    };
    
    this.props.onSubmit(this.state.search.trim());
    this.setState({
      search: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSabmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleValue}
            value={this.state.search}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}








