import { useNavigate } from 'react-router';
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles'

const DirectoryItem = ({ category }) => {
    const {title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage $imageurl = {imageUrl}
            />
            <Body>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </Body>
          </DirectoryItemContainer>
    )
}

export default DirectoryItem;