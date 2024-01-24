import styles from './header.module.css';
import sunIcon from '../../assets/images/icon-sun.svg';
import moonIcon from '../../assets/images/icon-moon.svg';

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: (arg: boolean) => void;
};

function Header({ darkMode, setDarkMode }: HeaderProps) {
  const backgroundImage = darkMode
    ? `${styles.header} ${styles.dark}`
    : `${styles.header} ${styles.light}`;

  return (
    <header className={backgroundImage}>
      <h1>TODO</h1>
      <button onClick={() => setDarkMode(!darkMode)}>
        <img src={darkMode ? sunIcon : moonIcon} alt="Toggle Theme Button" />
      </button>
    </header>
  );
}

export default Header;
