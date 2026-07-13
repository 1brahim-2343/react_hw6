import './App.css';
import styles from './shared/style.module.css'
import Header from './components/Header';
import Body from './components/Body';
import { useState } from 'react';
import MoviesProvider from './Context/MoviesContext';

function App() {
  const [isNewMoviePopUp, setIsNewMoviePopUp] = useState(false);

  const handleNewMoviePopUp = () => {
    setIsNewMoviePopUp(!isNewMoviePopUp);
    console.log("hi")
  }
  return (
    <section className={styles.app}>
      <Header handleNewMoviePopUp={handleNewMoviePopUp} />
      <MoviesProvider>
        <Body isNewMoviePopUp={isNewMoviePopUp} setIsNewMoviePopUp={setIsNewMoviePopUp} />
      </MoviesProvider>
    </section>
  );
}

export default App;
