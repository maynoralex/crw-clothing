import { createSelector } from 'reselect'
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

const selectCategoryReducer = (state): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer], //input selector or slice of the reducer
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) : CategoryMap => {
        return categories.reduce((acc, category)=>{
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc; 
        },{} as CategoryMap);
    }
);

export const selectIsCategoriesLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.isLoading;
    }
);

