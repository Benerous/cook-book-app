import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listRecipes } from '../actions/recipeActions';

function MainScreen(props) {

    ////////// React Hooks //////////

    const [searchKeyword, setSearchKeyword] = useState('');

    const recipeList = useSelector(state => state.recipeList);
    const { recipes, loading, error } = recipeList;

    const recipeSave = useSelector(state => state.recipeSave);
    const { success: successSave, error: errorSave } = recipeSave;

    const recipeDelete = useSelector(state => state.recipeDelete);
    const { success: successDelete, error: errorDelete } = recipeDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listRecipes());
        setSearchKeyword('');
        if (successSave || successDelete) {
            delete recipeSave.success;
            delete recipeDelete.success;
        }
        return () => {
            //
        }
    }, [props.match.params])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listRecipes(searchKeyword));
    };

    ////////// Content cutter //////////

    const ellipsify = (string) => {
        return string.length > 300 ? string.substring(0, 300) + '...' : string;
    }

    return loading ? <div className="text-center py-4"><div className=" text-orange lds-dual-ring"></div></div>
    : error ? <div className="text-center text-danger py-4"><i className="fa fa-times w3-xlarge" /> Error while processing</div>
    : (
        <div className="container">
            {successSave ? <div className="popup-message fixed-top bg-success py-3">Recipe Created</div>
            : errorSave ? <div className="popup-message fixed-top bg-danger py-3">Error while creating</div>
            : successDelete ?  <div className="popup-message fixed-top bg-success py-3">Recipe Deleted</div>
            : errorDelete && <div className="popup-message fixed-top bg-danger py-3">Error while deleting</div>
            }
            <form className="row justify-content-center pt-4 py-lg-5" onSubmit={submitHandler}>
                <input className="col-6 col-lg-4 border-0" type="text" name="searchKeyword" id="searchKeyword" defaultValue={searchKeyword} 
                onClick={(e) => {e.target.value = ""; setSearchKeyword(e.target.value)}} 
                onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search"/>
                <button className="btn btn-outline-light border-0 text-dark col-1" type="submit"><i className="fa fa-search w3-large"></i></button>
            </form>
            <ul className="recipes list-unstyled">
                {
                    recipes.map((recipe, index) =>
                        <li key={recipe._id} className={`fade-in p-3 ${index !== recipes.length - 1 ? 'border-bottom' : ''}`}>
                            <div className="recipe row">
                                <div className="col-6 col-lg-4 text-center align-self-center">
                                    <Link to={`/recipe/${recipe._id}`}>
                                        <img className="recipe-image rounded" src={recipe.image} alt="food img" />
                                    </Link>
                                </div>
                                <div className="col-6 col-lg-8 row">
                                    <div className="row col-12 px-0 text-center text-lg-left">
                                        <div className="title text-orange col-12 col-lg-6">
                                            <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
                                        </div>
                                        <div className="recipe-date col-12 col-lg-6">
                                            <h6 className="col-12">Created at:</h6>
                                            <h6 className="col-12"><b>{recipe.createdAt.split('T')[0]}</b></h6>
                                        </div>
                                    </div>
                                    <div className="recipe-description col-12 px-0 py-2">{ellipsify(recipe.description)}</div>
                                </div>
                            </div>
                        </li>)
                }
                <li className="text-center">
                    <Link className="" to="/new"> 
                        <button className="btn btn-outline bg-white w-100 py-2 fixed-bottom text-orange">
                            <h6>Add recipe <i className="fa fa-plus w3-large"></i></h6>
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MainScreen;