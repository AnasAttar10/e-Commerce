import { Badge } from 'react-bootstrap';
import styles from './styles.module.css';
import Mainnavbar from '../Navbar/Mainnavbar';
import HeaderLeftBar from './HeaderLeftBar/HeaderLeftBar';

const { headerContainer, headerLogo } = styles;
const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge>eCom</Badge>
        </h1>
        <HeaderLeftBar />
      </div>
      <Mainnavbar />
    </header>
  );
};

export default Header;
