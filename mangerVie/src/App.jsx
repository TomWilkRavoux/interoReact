import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import './index.css';
import HomePage from './pages/HomePage.jsx';
import RecipeDetails from './composents/recetteDetails.jsx';
import CategoryRecipes from './composents/categorieDetails.jsx';
import IngredientRecipes from './composents/ingredientDetails.jsx';
import CategorieList from './composents/categorieList.jsx';
import RandomMeal from './composents/randomMeal.jsx';
import SearchResults from './composents/resultatRecherche.jsx';
import Header from './composents/header.jsx';
import Footer from './composents/footer.jsx';


function App() {

  return (
    <>

        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="/categories" element={<CategorieList />} />
          <Route path="/random" element={<RandomMeal />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/category/:category" element={<CategoryRecipes />} />
          <Route path="/ingredient/:ingredient" element={<IngredientRecipes />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
