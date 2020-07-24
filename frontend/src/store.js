import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { recipeListReducer, recipeDetailsReducer, recipeSaveReducer, recipeDeleteReducer, recipeUpdateReducer } from './reducers/recipeReducers';

const recipe = Cookie.getJSON("recipeInfo") || {};

const initialState = { recipeDetails: { recipe } };
const reducer = combineReducers({
    recipeSave: recipeSaveReducer,
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    recipeDelete: recipeDeleteReducer,
    recipeUpdate: recipeUpdateReducer,
});

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnchancer(applyMiddleware(thunk))
);
export default store;