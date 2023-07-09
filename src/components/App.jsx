import React from 'react';
import { ToastContainer, toast  } from 'react-toastify';

import { ColorRing } from 'react-loader-spinner';
  
import Searchbar  from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImg } from 'services/api';
import LoadMoreButton from './Button/Button';



class App extends React.Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    search: '',
    page: 1,
  };


  onSubmitForm = searchQuery => {
    this.setState({
      search: searchQuery,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { search, page } = this.state;

    try {
      const images = await fetchImg(search, page);
    
      
      if (images.totalHits === 0) {
        this.setState({ error: 'No images' });
        toast.error(
          'Nothing was found according to your request! Please enter another request!'
        );
        return;
      }
      this.setState({ isLoading: true });
      
      this.setState(prevState => ({
        images: [...prevState.images, ...images]
      }));
    } catch (error) {
      this.setState({ error: error.messege });
      toast.error(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        
      };
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmitForm} />
        {this.state.images.length > 0 && (
          <ImageGallery
            onOpenModal={this.onOpenModal}
            images={this.state.images}
          />
        )}
        {this.state.images.length > 0 && <LoadMoreButton loadMore = {this.loadMore} />}
        {this.state.isLoading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}

export default App;