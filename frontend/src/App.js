import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import MainScreen from './screens/MainScreen';
import RecipeScreen from './screens/RecipeScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import EditRecipeScreen from './screens/EditRecipeScreen';
import AddChildRecipeScreen from './screens/AddChildRecipeScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top row justify-content-center">
            <Link to="/" className="navbar-brand font-weight-bold text-orange mx-0">COOK BOOK <i className="fa fa-book w3-xlarge"></i></Link>
        </nav>
        <main className="pt-2 pb-5">
          <div className="content">
            <Route path="/" exact={true} component={MainScreen} />
            <Route path="/recipe/:id" component={RecipeScreen} />
            <Route path="/new" component={AddRecipeScreen} />
            <Route path="/edit/:id" component={EditRecipeScreen} />
            <Route path="/child" component={AddChildRecipeScreen} />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
