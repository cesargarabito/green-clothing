import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";



export const fetchCategoryStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategorySuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoryFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoryStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategorySuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoryFailed(error));

    }

    
}