import React from 'react';
import { ToastContainer, toast  } from 'react-toastify';
import Searchbar  from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImg } from 'services/api';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';



class App extends React.Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    search: '',
    page: 1,
    totalImages: 0,
  };


  onSubmitForm = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({ search: searchQuery, page: 1, images: [], totalImages: 0});
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page, } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { search, page } = this.state;
    
    this.setState({ isLoading: true, error: null });

    try {
      const images = await fetchImg(search, page);
    
      
      if (images.totalHits === 0) {
        this.setState({ error: 'No images' });
        toast.error(
          'Nothing was found according to your request! Please enter another request!'
        );
        return;
      }
      


      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        totalImages: images.totalHits,
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

    const {images, isLoading, totalImages} = this.state
    return (
      <div>
        <Searchbar onSubmit={this.onSubmitForm} />
        {images.length > 0 && (
          <ImageGallery onOpenModal={this.onOpenModal} images={images} />
        )}
        {!isLoading && images.length !== totalImages && (
          <LoadMoreButton loadMore={this.loadMore} />
        )}
        {isLoading && <Loader />}
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