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
    RECIPE_UPDATE_FAIL
} from "../constants/recipeConstants";

function recipeListReducer (state = { recipes: [] }, action) {
    switch (action.type) {
        case RECIPE_LIST_REQUEST:
            return { loading: true };
        case RECIPE_LIST_SUCCESS:
            return { loading: false, recipes: action.payload };
        case RECIPE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function recipeDetailsReducer (state = { recipe: {} }, action) {
    switch (action.type) {
        case RECIPE_DETAILS_REQUEST:
            return { loading: true };
        case RECIPE_DETAILS_SUCCESS:
            return { loading: false, recipe: action.payload };
        case RECIPE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function recipeSaveReducer (state = { recipe: {} }, action) {
    switch (action.type) {
        case RECIPE_SAVE_REQUEST:
            return { loading: true };
        case RECIPE_SAVE_SUCCESS:
            return { loading: false, success: true, recipe: action.payload };
        case RECIPE_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function recipeUpdateReducer (state = {}, action) {
    switch (action.type) {
        case RECIPE_UPDATE_REQUEST:
            return { loading: true };
        case RECIPE_UPDATE_SUCCESS:
            return { loading: false, success: true, recipeInfo: action.payload };
        case RECIPE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
}

function recipeDeleteReducer (state = { recipe: {} }, action) {
    switch (action.type) {
        case RECIPE_DELETE_REQUEST:
            return { loading: true };
        case RECIPE_DELETE_SUCCESS:
            return { loading: false, success: true, recipe: action.payload };
        case RECIPE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { recipeListReducer, recipeDetailsReducer, recipeSaveReducer, recipeDeleteReducer, recipeUpdateReducer };