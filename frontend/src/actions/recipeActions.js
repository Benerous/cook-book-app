import { 
    RECIPE_LIST_REQUEST, 
    RECIPE_LIST_SUCCESS, 
    RECIPE_LIST_FAIL,
    RECIPE_DETAILS_REQUEST, 
    RECIPE_DETAILS_SUCCESS, 
    RECIPE_DETAILS_FAIL,
    RECIPE_SAVE_REQUEST,
    RECIPE_SAVE_SUCCESS,
    RECIPE_SAVE_FAIL,
    RECIPE_DELETE_REQUEST,
    RECIPE_DELETE_SUCCESS,
    RECIPE_DELETE_FAIL,
    RECIPE_UPDATE_REQUEST,
    RECIPE_UPDATE_SUCCESS,
    RECIPE_UPDATE_FAIL,
} from "../constants/recipeConstants";
import Cookie from 'js-cookie'
import Axios from "axios";

const listRecipes = (searchKeyword = '', parentId = '') => async (dispatch) => {
    try {
        dispatch({ type: RECIPE_LIST_REQUEST });
        const { data } = await Axios.get(`/api/recipes?searchKeyword=${searchKeyword}&parentId=${parentId}`);
        dispatch({ type: RECIPE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RECIPE_LIST_FAIL, payload: error.message });
    }
}

const detailsRecipe = (recipeId) => async (dispatch) => {
    try {
        dispatch({ type: RECIPE_DETAILS_REQUEST, payload: recipeId });
        const { data } = await Axios.get(`/api/recipes/${recipeId}`);
        dispatch({ type: RECIPE_DETAILS_SUCCESS, payload: data });
        Cookie.set('recipeInfo', JSON.stringify(data), { sameSite: 'strict' });
    } catch (error) {
        dispatch({ type: RECIPE_DETAILS_FAIL, payload: error.message});
    }
}

const saveRecipe = (recipe) => async (dispatch) => {
    try {
        dispatch({ type: RECIPE_SAVE_REQUEST, payload: recipe });
        const { data } = await Axios.post(`/api/recipes/new`, recipe);
        dispatch({ type: RECIPE_SAVE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RECIPE_SAVE_FAIL, payload: error.message });
    }
}

const saveChildRecipe = (recipe, parentId) => async (dispatch) => {
    try {
        dispatch({ type: RECIPE_SAVE_REQUEST, payload: recipe });
        const { data } = await Axios.post(`/api/recipes/child?parentId=${parentId}`, recipe);
        dispatch({ type: RECIPE_SAVE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RECIPE_SAVE_FAIL, payload: error.message });
    }
}

const updateRecipe = ({ recipeId, title, ingredients, method, image, description }) => async (dispatch) => {
    dispatch({ type: RECIPE_UPDATE_REQUEST, payload: { recipeId, title, ingredients, method, image, description }});
    try {
        const { data } = await Axios.put(`/api/recipes/edit/${recipeId}`, { title, ingredients, method, image, description });
        dispatch({ type: RECIPE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RECIPE_UPDATE_FAIL, payload: error.message});
    }
}

const deleteRecipe = (recipeId) => async (dispatch) => {
    try {
        dispatch({ type: RECIPE_DELETE_REQUEST, payload: recipeId });
        const { data } = await Axios.delete(`/api/recipes/${recipeId}`);
        dispatch({ type: RECIPE_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: RECIPE_DELETE_FAIL, payload: error.message });
    }
}

export { listRecipes, detailsRecipe, saveRecipe, deleteRecipe, updateRecipe, saveChildRecipe };