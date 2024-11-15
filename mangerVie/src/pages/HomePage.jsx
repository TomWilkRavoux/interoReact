import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../composents/header';
import Footer from '../composents/footer';

export default function Home() {
    const [recette, setRecette] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")          // Appel de l'API pour récupérer les 6 premières recettes
            .then(response => response.json())
            .then(data => {
            setRecette(data.meals.slice(0, 6));                                 // Limite à 6 recettes seulement
        })
            .catch(error => console.error("Erreur lors de la récupération des recettes :", error));
    }, []);



    useEffect(() => {                                                                 // Récupérer les catégories 
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then(response => response.json())
            .then(data => {
            setCategories(data.categories.slice(0, 6));
        })
        .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
    }, []);



    useEffect(() => {                                                             // Récupérer les 6 plats
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        .then(response => response.json())
        .then(data => setIngredients(data.meals.slice(0, 6)))                   
        .catch(error => console.error("Erreur lors de la récupération des ingrédients :", error));
    }, []);


    return (

        <div>
            <Header/>
            <br/><br/>
            <div>
                <h1 className="text-3xl font-bold text-center mb-6"> Recettes populaires</h1>
                <div className="grid grid-cols-3 gap-6 ">
                    {recette.map((meal) => (
                        <div key={meal.idMeal} className="recipe-card category-card border p-4 rounded-lg shadow-lg text-center">
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
                            <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                            <p className="text-gray-600">Catégorie : {meal.strCategory}</p>
                            <p className="text-gray-600">Origine : {meal.strArea}</p>
                            <a href={`/recipe/${meal.idMeal}`} className="text-blue-500 font-bold mt-2 inline-block">Voir les détails</a>
                        </div>
                    ))}
                </div>            
            </div>
            <br/><br/><br/>
            <div>
                <h2 className="text-2xl font-bold text-center mb-6">Catégories</h2>
                <div className="grid grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div key={category.idCategory} className="category-card border p-4 rounded-lg shadow-lg text-center">
                            <img src={category.strCategoryThumb} alt={category.strCategory} className="category-image w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-semibold">{category.strCategory}</h3>
                            <Link to={`/category/${category.strCategory}`} className="text-blue-500 font-bold mt-2 inline-block">Voir les recettes</Link>
                        </div>
                    ))}
                </div>
            </div>
            <br/><br/><br/>
            <div>
                <h2 className="text-2xl font-bold text-center mb-6">Liste des Ingrédients</h2>
                <div className="grid grid-cols-3 gap-6">
                    {ingredients.map((ingredient) => (
                        <div key={ingredient.idIngredient} className="ingredient-card border p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">{ingredient.strIngredient}</h3>
                        {ingredient.strDescription && (
                            <p className="text-white text-sm">{ingredient.strDescription.substring(0, 100)}...</p>
                        )}
                        <Link
                            to={`/ingredient/${ingredient.strIngredient}`}
                            className="text-blue-500 font-bold mt-2 inline-block"
                        >
                            Voir les recettes
                        </Link>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <Footer/>
        </div>

    );
}
