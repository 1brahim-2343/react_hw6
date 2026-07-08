import './App.css';
import styles from './shared/style.module.css'
import Header from './components/Header';
import Body from './components/Body';

function App() {
  return (
    <section className={styles.app}>
      <Header/>
      <Body/>
    </section>
  );
}

export default App;
