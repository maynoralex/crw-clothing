import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router'
import './shop.styles.scss'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { getCollectionAndDocuments } from '../../utils/firebase/firebase'
import { setCategories } from '../../store/category/category.reducer'


const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
            const getCategoriesMap = async () => {
                const categoriesArray = await getCollectionAndDocuments('categories');
                dispatch(setCategories(categoriesArray));
            }
    
            getCategoriesMap();
    
        },[]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" element={<Category />}/>
        </Routes>
    )
}

export default Shop;