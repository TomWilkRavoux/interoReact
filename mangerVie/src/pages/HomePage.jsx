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

        <div className="bg-gray-900 text-white min-h-screen">
            <br/><br/>
            <div className="p-6">
                    <section className="mb-12">
                        <h1 className="text-4xl font-bold text-center mb-6 text-blue-400"> Recettes populaires</h1>
                        <div  className="grid grid-cols-3 gap-6">
                            {recette.map((meal) => (
                                <div key={meal.idMeal} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
                                    <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover"/>
                                    <div className="p-4 text-center">
                                        <h2 className="text-lg font-semibold text-blue-300">{meal.strMeal}</h2>
                                        <p className="text-gray-400">Catégorie : {meal.strCategory}</p>
                                        <p className="text-gray-400">Origine : {meal.strArea}</p>
                                        <a href={`/recipe/${meal.idMeal}`}  className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">Voir les détails</a>
                                    </div>
                                </div>
                            ))}
                        </div> 
                    </section>               
                <br/><br/><br/>
                <section className="mb-12">
                    <h2  className="text-4xl font-bold text-center mb-6 text-blue-400">Catégories</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div key={category.idCategory}  className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
                                <img src={category.strCategoryThumb} alt={category.strCategory}  className="w-full h-48 object-cover" />
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-blue-300">{category.strCategory}</h3>
                                    <Link to={`/category/${category.strCategory}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">Voir les recettes</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <br/><br/><br/>
                <section className="mb-12">
                    <h2 className="text-4xl font-bold text-center mb-6 text-blue-400">Liste des Ingrédients</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {ingredients.map((ingredient) => (
                            <div key={ingredient.idIngredient}  className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-blue-300 mb-2">{ingredient.strIngredient}</h3>
                                    {ingredient.strDescription && (
                                        <p className="text-gray-400 text-sm mb-4">{ingredient.strDescription.substring(0, 100)}...</p>
                                    )}
                                    <Link
                                        to={`/ingredient/${ingredient.strIngredient}`}
                                        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                                    >
                                        Voir les recettes
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>    
            <br />
        </div>

    );
}
