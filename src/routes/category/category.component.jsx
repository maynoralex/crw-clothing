import { CategoryContainer, Title } from './category.styles';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsCategoriesLoading } from '../../store/category/category.selector';
import ProductCard from '../../components/product-card/product-card.component'
import { useParams } from 'react-router';
import Spinner from '../../components/spinner/spinner.component'


const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading ? 
                    (<Spinner />) : (
                    <CategoryContainer>
                    {
                        products &&
                            products.map((product) => 
                            <ProductCard key={product.id} product={product} /> )
                    }
                    </CategoryContainer> )
            }
            
        </>
     );


};

export default Category;