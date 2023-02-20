import { useEffect, useState } from 'react';
import { fetchImages } from 'api';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from 'GlobalStyles';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ModalImage } from 'components/Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';
import { AppStyles } from './AppStyles';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [page, setPage] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function foo() {
      try {
        setIsLoading(true);
        const responce = await fetchImages(query, page);
        if (responce.totalHits === 0) {
          toast.error(
            `Sorry, there are no images matching your ${query}. Please try again.`
          );
        }
        const data = responce.hits.map(
          ({ id, largeImageURL, tags, webformatURL }) => {
            return {
              id,
              largeImageURL,
              tags,
              webformatURL,
            };
          }
        );
        setPhotos(prevPhotos => [...prevPhotos, ...data]);
        setIsLoading(false);
      } catch (error) {
        toast.error('Oops! Something went wrong! Please try again.');
      }
    }
    foo();
  }, [page, query]);

  const loadMore = () => setPage(prevPage => prevPage + 1);
  const searchPhoto = ({ searchQuery }) => {
    setPage(1);
    setPhotos([]);
    setQuery(searchQuery);
  };

  const selectImage = imgUrl => setSelectedImage(imgUrl);

  const resetImage = () => setSelectedImage(null);

  return (
    <AppStyles>
      <GlobalStyle />
      <Searchbar onSubmit={searchPhoto} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} onSelect={selectImage} />
      )}
      {photos.length > 11 && !isLoading && <Button onClick={loadMore} />}
      {isLoading && <Loader />}
      <Toaster position="center" />
      <ModalImage selectImage={selectedImage} resetImage={resetImage} />
    </AppStyles>
  );
};
