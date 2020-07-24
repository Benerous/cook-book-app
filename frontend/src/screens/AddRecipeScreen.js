import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveRecipe } from '../actions/recipeActions';

function AddRecipeScreen(props) {

    ////////// React Hooks //////////

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([{ ingredient: "", quantity: "" }]);
    const [method, setMethod] = useState([{ step: 1, directions: "" }]);

    const recipeSave = useSelector(state => state.recipeSave);
    const { loading: loadingSave, error: errorSave } = recipeSave;

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            //
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveRecipe({ title, image, ingredients, method, description }));
        props.history.push('/');
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
                <Link to={`/`}><i className="text-orange fa fa-angle-left w3-xxlarge"></i></Link>
            </div>
            <form onSubmit={submitHandler} className="container justify-content-center">
                <ul className="container list-unstyled row m-0">
                    <li className="col-12 py-2">
                        <h4 className="text-center text-orange">ADD NEW RECIPE</h4>
                    </li>
                    <li className="col-12 py-2 border-bottom">
                        <div className="row">
                            <h5 className="col-12" htmlFor="title">TITLE</h5>
                            <input className="title col-12 border-0" type="text" name="title" id="title" placeholder="Write a title" onChange={e => setTitle(e.target.value)} required/>
                        </div>
                    </li>
                    <li className="col-12 py-2 border-bottom">
                        <div className="row">
                            <h5 className="col-12" htmlFor="ingredients">INGREDIENTS</h5>
                            {ingredients.map((item, index) => 
                                <div key={index} className="col-12 row">
                                    <input className="col-5 border-0" name="ingredient" placeholder="Ingredient" value={item.ingredient} onChange={(e) => handleIngredientInputChange(e, index)} required/>
                                    <input className="col-5 border-0" name="quantity" placeholder="Quantity" value={item.quantity} onChange={(e) => handleIngredientInputChange(e, index)} required/>
                                    <div className="col-1 text-center">
                                        {ingredients.length !== 1 && <button className="btn btn-outline-light text-dark border-0" onClick={() => handleIngredientRemoveClick(index)}><i className="text-orange fa fa-times medium"></i></button>}
                                    </div>
                                    <div className="col-12 text-center py-2">
                                        {ingredients.length - 1 === index && <button className="btn btn-outline-light text-dark rounded-circle border-orange text-orange" onClick={handleIngredientAddClick}><i className="fa fa-plus w3-medium"></i></button>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </li>
                    <li className="col-12 py-2 border-bottom">
                        <div className="row">
                            <h5 className="col-12" htmlFor="method">METHOD</h5>
                            {method.map((step, index) => 
                                <div key={index} className="col-12 row align-items-center">
                                    <h6 className="col-1 text-orange">{index + 1}</h6>
                                    <textarea className="col-9 border-0" name="directions" placeholder="Directions" value={step.directions} onChange={(e) => handleStepInputChange(e, index)} required/>
                                    <div className="col-1">
                                        {method.length !== 1 && <button className="btn btn-outline-light text-dark border-0" onClick={() => handleStepRemoveClick(index)}><i className="text-orange fa fa-times medium"></i></button>}
                                    </div>
                                    <div className="col-12 text-center py-2">
                                        {method.length - 1 === index && <button className="btn btn-outline-light text-dark rounded-circle border-orange text-orange" onClick={() => handleStepAddClick(index + 1)}><i className="fa fa-plus w3-medium"></i></button>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </li>
                    <li className="col-12 py-2 border-bottom">
                        <div className="row">
                            <h5 className="col-12" htmlFor="image">IMAGE</h5>
                            <input type="text" className="col-12 border-0" placeholder="Image path" name="image" id="image" onClick={(e) => e.target.value = ""} onChange={e => setImage(e.target.value)} required/>
                        </div>
                    </li>
                    <li className="col-12 py-2">
                        <div className="row">
                            <h5 className="col-12" htmlFor="description">DESCRIPTION</h5>
                            <textarea className="col-12 border-0" placeholder="Desciption" type="text" name="description" id="description" onChange={e => setDescription(e.target.value)} required/>
                        </div>
                    </li>
                    <li className="col-12 py-2 text-center">
                        <button type="submit" className="btn btn-outline bg-white border-orange text-orange">ADD RECIPE</button>
                    </li>
                </ul>
            </form>
            {loadingSave && <div className="text-center py-4"><div className="lds-dual-ring"></div></div>}
            {errorSave && <div className="text-center text-danger py-4"><i className="fa fa-times w3-xlarge" /> Error while processing</div>}
        </div>
    )
}

export default AddRecipeScreen;
