import { Link } from 'react-router-dom';
import styles from './styles.module.css';
const { category, categoryImg, categoryTitle } = styles;
import { ICategory } from '@types';
const Category = ({ id, title, prefix, img }: ICategory) => {
  return (
    <div className={category} key={id}>
      <Link to={`/categories/products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
