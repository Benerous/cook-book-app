import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listRecipes, detailsRecipe, deleteRecipe } from '../actions/recipeActions';
import { Link } from 'react-router-dom';

function RecipeScreen(props) {

    const recipeDetails = useSelector(state => state.recipeDetails);
    const { recipe, loading, error } = recipeDetails;

    const recipeUpdate = useSelector(state => state.recipeUpdate);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = recipeUpdate;

    const recipeList = useSelector(state => state.recipeList);
    const { recipes, loading: loadingList } = recipeList;

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(detailsRecipe(props.match.params.id));
        dispatch(listRecipes('', props.match.params.id));
        return () => {
            if (successUpdate) {
                delete recipeUpdate.success;
            }
        }
    }, [props.match.params])

    const deleteHandler = async () => {
        const answer = window.confirm(`Are you sure you want to delete ${recipe.title} ?`);
        if (answer) {
            await dispatch(deleteRecipe(recipe._id));
            props.history.push('/');
        }
    }

    return loading || loadingUpdate || loadingList ? <div className="text-center py-4"><div className="lds-dual-ring"></div></div>
    : error ? <div className="text-center text-danger py-4"><i className="fa fa-times w3-xlarge" /> Error while processing</div>
    : (
        <div className="container">
            {
                successUpdate ? <div className="popup-message fixed-top bg-success py-3">Recipe Updated</div>
                : errorUpdate && <div className="popup-message fixed-top bg-danger py-3">Error while updating</div>
            }
            <div className="pt-4">
        <Link to={(recipe.parentRecipe) ? `/recipe/${recipe.parentRecipe}` : "/"}>
            {
                recipe.parentRecipe ? <i className="font-weight-bold text-orange fa fa-angle-left w3-large"> Previous</i>
                : <i className="text-orange fa fa-angle-left w3-xxlarge"></i>
            }
        </Link>
            </div>
            <div className="recipe-details row justify-content-center py-4 border-bottom fade-in">
                <div className="col-12 col-lg-6 text-center py-lg-5">
                    <img className="recipe-details-image rounded" src={recipe.image} alt="cook_book"></img>
                </div>
                <div className="col-12 col-lg-6 row justify-content-center">
                    <div className="row col-12 text-center px-0">
                        <h3 className="col-6 py-2 align-self-center text-orange font-weight-bold">{recipe.title}</h3>
                        <div className="col-6 row align-items-center">
                            <div className="col-12 ">
                                <h6 className="col-12 align-self-center"><b>Created at:</b></h6>
                                <h6 className="col-12">
                                    {
                                        recipe.createdAt !== undefined && recipe.createdAt.split('T')[0]
                                    }
                                </h6>
                            </div>
                            
                            <div className="col-12 ">
                                <h6 className="col-12 align-self-center"><b>Updated at:</b></h6>
                                <h6 className="col-12">
                                    {
                                        recipe.updatedAt !== undefined && recipe.updatedAt.split('T')[0]
                                    }
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <p className="py-2">{recipe.description}</p>
                    </div>
                    <div className="col-12">
                        <h5 className="text-orange">Ingredients</h5>
                        <ul>
                            {
                                recipe.ingredients !== undefined && recipe.ingredients.map((item, index) =>
                                    <li className="p-1 text-orange" key={index}><span className="text-dark">{item.ingredient} - <b>{item.quantity}</b></span></li>)
                            }
                        </ul>
                    </div>
                    <div className="col-12">
                        <h5 className="text-orange">Method</h5>
                        <ol className="font-weight-bold">
                            {
                                recipe.method !== undefined && recipe.method.map((step, index) =>
                                    <li key={index} className="p-2 text-orange"><span className="font-weight-light text-dark">{step.directions}</span></li>)
                            }
                        </ol>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="col-12 text-center">
                    <h4 className="pb-3 text-orange">Alternative recipes</h4>
                </div>
                <ul className="list-unstyled row justify-content-center">
                    {
                        recipes !== undefined && recipes.filter(item => item.parentRecipe === recipe._id).map(childRecipe => 
                            <li key={childRecipe._id} className="col-6 col-lg-4 row p-2">
                                <Link className="col-12 text-center" to={`/recipe/${childRecipe._id}`}>
                                        <img className="recipe-image rounded" src={childRecipe.image} alt="food img" />
                                </Link>
                                <Link className="col-12 text-center" to={`/recipe/${childRecipe._id}`}><h6>{childRecipe.title}</h6></Link>
                            </li>
                        )
                    }
                    <li className="col-6 col-lg-4 row px-0 py-lg-3 align-self-center justify-content-center">
                        <Link className="" to={`/child`}>
                            <button className="btn btn-outline bg-white"><i className="fa fa-plus w3-xxlarge light text-orange"></i></button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="text-center fixed-bottom row justify-content-center bg-white shadow-lg">
                <button onClick={deleteHandler} className="btn btn-outline bg-white col-6 text-orange font-weight-bold">
                    <h6 className="font-weight-bold">Delete <i className="fa fa-trash w3-large"></i></h6>
                </button>
                <Link className="btn btn-outline bg-white col-6 link-unstyled text-orange font-weight-bold" to={`/edit/${recipe._id}`} >
                    <h6 className="font-weight-bold">Edit <i className="fa fa-pencil w3-large"></i></h6>
                </Link>
            </div>
        </div>
    );
};

export default RecipeScreen;