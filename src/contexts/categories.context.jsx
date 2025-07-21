import { createContext, useState, useEffect } from "react";
import SHOP_DATA from '../shop-data'
import { getCollectionAndDocuments } from "../utils/firebase/firebase";


// eslint-disable-next-line react-refresh/only-export-components
export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCollectionAndDocuments('categories');
            
            setCategoriesMap(categoriesMap);
        }

        getCategoriesMap();

    },[]);

    const [ categoriesMap, setCategoriesMap ] = useState({});
    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value = {value}>{children}</CategoriesContext.Provider>
    )

}