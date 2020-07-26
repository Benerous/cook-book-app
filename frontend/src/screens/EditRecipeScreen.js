import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateRecipe } from '../actions/recipeActions';

function EditRecipeScreen(props) {

    ////////// React Hooks //////////

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [method, setMethod] = useState([]);

    const recipeDetails = useSelector(state => state.recipeDetails);
    const { recipe: recipeInfo } = recipeDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (recipeInfo) {
            setTitle(recipeInfo.title);
            setIngredients(recipeInfo.ingredients);
            setMethod(recipeInfo.method);
            setImage(recipeInfo.image);
            setDescription(recipeInfo.description);
        }
        return () => {
            //
        };
    }, []);

    const submitHandler = async (e) => {
        window.scrollTo(0, 0)
        e.preventDefault();
        await dispatch(updateRecipe({ recipeId: recipeInfo._id, title, image, ingredients, method, description}));
        props.history.push('/recipe/' + recipeInfo._id);
    };

    ////////// Ingredients Input List Handlers //////////

    const handleIngredientInputChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...ingredients];
        list[index][name] = value;
        setIngredients(list);
    };

    const handleIngredientRemoveClick = (index) => {
        const list = [...ingredients];
        list.splice(index, 1);
        setIngredients(list);
    };

    const handleIngredientAddClick = () => {
        setIngredients([...ingredients, { ingredient: "", quantity: "" }]);
    };

    ////////// Method Steps Input List Handlers //////////

    const handleStepInputChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...method];
        list[index][name] = value;
        setMethod(list);
    };

    const handleStepRemoveClick = (index) => {
        const list = [...method];
        list.splice(index, 1);
        setMethod(list);
    };

    const handleStepAddClick = (index) => {
        setMethod([...method, { step: index + 1, directions: "" }]);
    };

    return (
        <div className="container">
            <div className="pt-4">
                <Link to={(props.match.params.id) ? `/recipe/${props.match.params.id}` : "/"}><i className="fa fa-angle-left w3-xxlarge"></i></Link>
            </div>
            <form onSubmit={submitHandler} className="container justify-content-center">
                <ul className="container list-unstyled row m-0">
                    <li className="col-12 py-2">
                        <h4 className="text-center text-orange font-weight-bold">EDIT RECIPE</h4>
                    </li>
                    <li className="col-12 py-2 border-bottom">
                        <div className="row">
                            <h5 className="col-12 text-orange font-weight-bold" htmlFor="title">TITLE</h5>
                            <input className="title col-12 border-0" type="text" name="title" id="title" placeholder="Write a title" onChange={e => setTitle(e.target.value)} defaultValue={title} required/>
                        </div>
                    </li>
                    <li className="col-12 py-2 border-bottom">
                        <div className="row">
                            <h5 className="col-12 text-orange" htmlFor="ingredients">INGREDIENTS</h5>
                            {ingredients !== undefined && ingredients.map((item, index) => 
                                <div key={index} className="col-12 row">
                                    <input className="col-5 border-0" name="ingredient" placeholder="Ingredient" value={item.ingredient} onChange={(e) => handleIngredientInputChange(e, index)} required/>
                                    <input className="col-5 border-0" name="quantity" placeholder="Quantity" value={item.quantity} onChange={(e) => handleIngredientInputChange(e, index)} required/>
                                    <div className="col-1 text-center">
                                        {ingredients.length !== 1 && <span className="btn btn-outline-light text-dark border-0" onClick={() => handleIngredientRemoveClick(index)}><i className="fa fa-times medium"></i></span>}
                                    </div>
                                    <div className="col-12 text-center py-2">
                                        {ingredients.length - 1 === index && <span className="btn btn-outline-light text-dark rounded-circle border-orange" onClick={handleIngredientAddClick}><i className="fa fa-plus w3-medium"></i></span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </li>
                    <li className="col-12 py-2 border-bottom">
                        <div className="row">
                            <h5 className="col-12 text-orange" htmlFor="method">METHOD</h5>
                            {method !== undefined && method.map((step, index) => 
                                <div key={index} className="col-12 row align-items-center">
                                    <h6 className="col-1">{index + 1}</h6>
                                    <textarea className="col-9 border-0" name="directions" placeholder="Directions" value={step.directions} onChange={(e) => handleStepInputChange(e, index)} required/>
                                    <div className="col-1">
                                        {method.length !== 1 && <span className="btn btn-outline-light text-dark border-0" onClick={() => handleStepRemoveClick(index)}><i className="fa fa-times medium"></i></span>}
                                    </div>
                                    <div className="col-12 text-center py-2">
                                        {method.length - 1 === index && <span className="btn btn-outline-light text-dark rounded-circle border-orange" onClick={() => handleStepAddClick(index + 1)}><i className="fa fa-plus w3-medium"></i></span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </li>
                    <li className="col-12 py-2 border-bottom">
                        <div className="row">
                            <h5 className="col-12 text-orange" htmlFor="image">IMAGE</h5>
                            <input className="col-12 border-0" type="text" placeholder="Image path" name="image" id="image" onClick={(e) => e.target.value = ""} onChange={e => setImage(e.target.value)} defaultValue={image} required/>
                        </div>
                    </li>
                    <li className="col-12 py-2">
                        <div className="row">
                            <h5 className="col-12 text-orange" htmlFor="description">DESCRIPTION</h5>
                            <textarea className="col-12 border-0" placeholder="Desciption" type="text" name="description" id="description" onChange={e => setDescription(e.target.value)} defaultValue={description} required/>
                        </div>
                    </li>
                    <button type="submit" className="btn btn-outline bg-white col-12 text-center font-weight-bold fixed-bottom shadow-lg text-orange font-weight-bold py-3 w-100">EDIT RECIPE</button>
                </ul>
            </form>
        </div>
    )
}

export default EditRecipeScreen;
