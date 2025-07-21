import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from './category-preview.styles';

import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router';



const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <Title to={title}>
                {title.toUpperCase()}
            </Title>
            <Preview>
                {products.filter((_, idx) => idx < 4)
                    .map((product) => {
                        return <ProductCard key={product.id} product={product}/>
                    })
                }
            </Preview>
        </CategoryPreviewContainer>
    );
}

export default CategoryPreview;
