import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { Dispatch } from 'redux'
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { getCollectionAndDocuments } from '../../utils/firebase/firebase'

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => 
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, 
        categoriesArray
    ));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

    
export const fetchCategoriesAsync = () => async (dispatch:Dispatch): Promise<void> => {
    dispatch(fetchCategoriesStart());
    
    try{
        const categoriesArray = await getCollectionAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
        
    } catch (error) {
        if(error instanceof Error)
            dispatch(fetchCategoriesFailed(error))
    }
}
