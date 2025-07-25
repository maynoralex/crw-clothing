import { CategoryContainer, Title } from './category.styles';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/category/category.selector';
import ProductCard from '../../components/product-card/product-card.component'
import { useParams } from 'react-router';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
            {
                products &&
                    products.map((product) => 
                    <ProductCard key={product.id} product={product} /> )
            }
            </CategoryContainer>
        </>
     );


};

export default Category;