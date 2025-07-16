import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json'

// eslint-disable-next-line react-refresh/only-export-components
export const ProductsContext = createContext({
    products: []
});

export const ProductsProvider = ({ children }) => {
    const [ products ] = useState(PRODUCTS);
    const value = { products };
    return (
        <ProductsContext.Provider value = {value}>{children}</ProductsContext.Provider>
    )

}