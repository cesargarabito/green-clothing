import './directory-item.styles.scss'
import { useNavigate } from 'react-router';
import { FC } from 'react';
import { DirectoryCategory } from '../categories-item/categories-item.component';

type DirectoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
return (
    <div className="directory-item-container" onClick={onNavigateHandler}>
        <div className='background-image' style={{ backgroundImage: `url(${imageUrl})`,}} />
        <div className="body">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>

      </div>
)
}

export default DirectoryItem