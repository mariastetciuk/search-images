import { useState, useEffect } from 'react';
import { fetchImgs } from '../API/PixabayAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const handleSearch = query => {
    if (searchQuery === query) {
      return alert(
        `You are watching "${query}" category. Enter a different category`
      );
    }

    setSearchQuery(() => query);
    setGallery(() => []);
    setPage(() => 1);
  };

  const handleClickButton = () => {
    setPage(prevState => prevState + 1);
    setShowBtn(() => false);
  };

  useEffect(() => {
    if (searchQuery === '') return;

    async function featch() {
      try {
        setIsLoader(() => true);
        const { data } = await fetchImgs(page, searchQuery);
        setGallery(prevState => [...prevState, ...data.hits]);
        if (data.hits.length === 0) {
          return Notify.failure('Sorry, but nothing found');
        }

        if (
          (data.total > data.hits.length && data.total - page * 12 >= 0) ||
          (page === 1 && searchQuery !== '')
        ) {
          setShowBtn(() => true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(() => false);
      }
    }
    featch();
  }, [searchQuery, page]);

  return (
    <div className={css.container}>
      <Searchbar handleSearch={handleSearch} />

      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} alt={searchQuery} />
      )}

      {isLoader && <Loader />}

      {showBtn && <Button onClick={handleClickButton} />}
    </div>
  );
};
